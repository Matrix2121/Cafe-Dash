import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, View } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import HasRoles from '@/app/utilComponents/HasRoles';
import { useAuth } from '@/app/context/AuthContext';
import { RootStackParamList } from '@/app/navigation/Navigation';
import { RouteProp } from '@react-navigation/native';
import CommonHeader from '@/app/components/headers/commonHeader/CommonHeader';
import useUser from '@/app/hooks/useUser';
import styles from "@/app/screens/users/edit/UserEdit.style";
import { UserUpdate } from '@/app/types/items';
import { ScrollView } from 'react-native-gesture-handler';

type UpdateUserRouteProp = RouteProp<RootStackParamList, 'useredit'>;

interface IProps {
    route: UpdateUserRouteProp;
}

const UserEdit = ({ route }: IProps) => {
  const { user: currentUser } = useAuth();
  const { userId } = route.params;

  const { user, updateUser, loading, error } = useUser(userId);

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [apiError, setApiError] = useState('');

  const availableRoles = ['admin', 'owner', 'employee'];

  useEffect(() => {
    if (user) {
      setUsername(user.username);
      setEmail(user.email);
      setSelectedRoles(user.roles.map((r) => r.roleName));
    }
  }, [user]);

  const toggleRoleSelection = (role: string) => {
    if (selectedRoles.includes(role)) {
      setSelectedRoles(selectedRoles.filter((r) => r !== role));
    } else {
      setSelectedRoles([...selectedRoles, role]);
    }
  };

  const handleSubmit = async () => {
    setFormErrors({});
    setApiError('');
  
    const errors: { [key: string]: string } = {};
  
    if (!username.trim()) {
      errors.username = 'Username is required.';
    } else if (username.length < 6) {
      errors.username = 'Username must be at least 6 characters.';
    }
  
    if (!email.trim()) {
      errors.email = 'Email is required.';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        errors.email = 'Enter a valid email address.';
      }
    }
  
    const isAdmin = currentUser?.roles.some((r) => r.authority === 'admin');
    if (isAdmin && selectedRoles.length === 0) {
      errors.roles = 'Please select at least one role.';
    }
  
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
  
    const updatedUser: UserUpdate = {
      id: userId,
      username,
      email,
      roles: selectedRoles,
    };
  
    try {
      await updateUser(updatedUser, userId);
      alert('User updated successfully');
    } catch (err: any) {
      setApiError(err.message);
    }
  };
  

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <CommonHeader title="Edit User" />
  
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.editContainer}>
          <Text style={styles.title}>
            <Text style={styles.highlight}>Update User</Text>
          </Text>
  
          {loading && <Text>Loading...</Text>}
          {error && <Text style={styles.errorText}>{error}</Text>}
          {apiError && <Text style={styles.errorText}>{apiError}</Text>}
  
          <TextInput
            label="Username"
            value={username}
            onChangeText={(text) => {
              setUsername(text);
              setFormErrors((prev) => ({ ...prev, username: '' }));
            }}
            style={styles.input}
            mode="outlined"
          />
          {formErrors.username && (
            <Text style={styles.errorText}>{formErrors.username}</Text>
          )}
  
          <TextInput
            label="Email"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              setFormErrors((prev) => ({ ...prev, email: '' }));
            }}
            style={styles.input}
            mode="outlined"
          />
          {formErrors.email && (
            <Text style={styles.errorText}>{formErrors.email}</Text>
          )}
  
          <HasRoles roles={['admin']}>
            <View style={styles.selectRolesContainer}>
              <Text style={styles.selectRolesLabel}>Edit Roles:</Text>
              <View style={styles.roleButtonContainer}>
                {availableRoles.map((role) => {
                  const isSelected = selectedRoles.includes(role);
                  return (
                    <Button
                      key={role}
                      mode={isSelected ? 'contained' : 'outlined'}
                      onPress={() => toggleRoleSelection(role)}
                      style={[
                        styles.roleButton,
                        isSelected && styles.selectedRoleButton,
                      ]}
                      labelStyle={[
                        styles.roleButtonText,
                        isSelected && styles.selectedRoleButtonText,
                      ]}
                    >
                      {role}
                    </Button>
                  );
                })}
              </View>
              {formErrors.roles && (
                <Text style={styles.errorText}>{formErrors.roles}</Text>
              )}
            </View>
          </HasRoles>
  
          <Button
            mode="contained"
            onPress={handleSubmit}
            style={styles.editButton}
            loading={loading}
            disabled={loading}
          >
            {loading ? 'Updating...' : 'Update User'}
          </Button>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default UserEdit;
