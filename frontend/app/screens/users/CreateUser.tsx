import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View
} from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import HasRoles from '@/app/utilComponents/HasRoles';
import { useAuth } from '@/app/context/AuthContext';
import api from '@/app/services/apiClient';
import styles from './CreateUser.style';
import CryptoJS from 'crypto-js';

interface NewUser {
  username: string;
  email: string;
  passwordHash: string;
  roleNames: string[];
}

const CreateUser: React.FC = () => {
  const { user } = useAuth();
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const availableRoles: string[] = ['admin', 'owner', 'employee'];

  const toggleRoleSelection = (role: string): void => {
    if (selectedRoles.includes(role)) {
      setSelectedRoles(selectedRoles.filter(r => r !== role));
    } else {
      setSelectedRoles([...selectedRoles, role]);
    }
  };

  const handleSubmit = async (): Promise<void> => {
    setLoading(true);
    setError('');

    let roleNames: string[] = [];
    if (user && user.roles.some(r => r.authority === 'admin')) {
      roleNames = selectedRoles;
    } else if (user && user.roles.some(r => r.authority === 'owner')) {
      roleNames = ['employee'];
    }
    const passwordHash = CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);
    const newUser: NewUser = { username, email, passwordHash, roleNames };

    try {
      const response = await api.post('/users', newUser);
      if (response.status !== 201) {
        throw new Error(response.data?.message || 'Error creating user');
      }
      setUsername('');
      setEmail('');
      setPassword('');
      setSelectedRoles([]);
      alert('User created successfully');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.registerContainer}>
          <Text style={styles.title}>
            <Text style={styles.highlight}>Create New </Text>User
          </Text>
          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <TextInput
            label="Username"
            value={username}
            onChangeText={setUsername}
            style={styles.input}
            mode="outlined"
          />
          <TextInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            style={styles.input}
            mode="outlined"
          />
          <TextInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={styles.input}
            mode="outlined"
          />
          <HasRoles roles={['admin']}>
            <View style={styles.selectRolesContainer}>
              <Text style={styles.selectRolesLabel}>Select Roles:</Text>
              <View style={styles.roleButtonContainer}>
                {availableRoles.map(role => {
                  const isSelected = selectedRoles.includes(role);
                  return (
                    <Button
                      key={role}
                      mode={isSelected ? 'contained' : 'outlined'}
                      onPress={() => toggleRoleSelection(role)}
                      style={[
                        styles.roleButton,
                        isSelected && styles.selectedRoleButton
                      ]}
                      labelStyle={[
                        styles.roleButtonText,
                        isSelected && styles.selectedRoleButtonText
                      ]}
                    >
                      {role}
                    </Button>
                  );
                })}
              </View>
            </View>
          </HasRoles>

          <Button
            mode="contained"
            onPress={handleSubmit}
            style={styles.registerButton}
            loading={loading}
            disabled={loading}
          >
            {loading ? 'Creating User...' : 'Create User'}
          </Button>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default CreateUser;
