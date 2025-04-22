import React, { useState } from "react";
import {Alert, ImageBackground, KeyboardAvoidingView, Platform, ScrollView, View} from "react-native";
import { TextInput, Button, Text } from "react-native-paper";
import customAPI from "@/app/services/apiClient";
import { CreateCafeteriaDTO } from "@/app/types/items";
import styles from "@/app/screens/cafes/CafeCreateScreen/CreateCafe.style";

const CreateCafeteria = () => {
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [location, setLocation] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [openingHour, setOpeningHour] = useState("");
  const [closingHour, setClosingHour] = useState("");

  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  const handleCreateCafeteria = async () => {
    setFormErrors({});
    setApiError("");

    const errors: { [key: string]: string } = {};

    if (!name) errors.name = "Name is required.";
    if (!brand) errors.brand = "Brand is required.";
    if (!location) errors.location = "Location is required.";
    if (!phoneNumber) errors.phoneNumber = "Phone number is required.";
    if (!imageUrl) errors.imageUrl = "Image URL is required.";
    if (!openingHour) errors.openingHour = "Opening hour is required.";
    if (!closingHour) errors.closingHour = "Closing hour is required.";

    const timeRegex = /^(0?[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
    if (openingHour && !timeRegex.test(openingHour)) {
      errors.openingHour = "Enter a valid time in HH:mm format.";
    }
    if (closingHour && !timeRegex.test(closingHour)) {
      errors.closingHour = "Enter a valid time in HH:mm format.";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    const newCafeteria: CreateCafeteriaDTO = {
      name,
      brand,
      location,
      phoneNumber,
      openingHour,
      closingHour,
      imageUrl,
    };

    setLoading(true);
    try {
      const response = await customAPI.post("/api/cafeterias", newCafeteria);
      if (response.status !== 201) {
        throw new Error(response.data?.message || "Error creating cafeteria");
      }
      setName("");
      setBrand("");
      setLocation("");
      setPhoneNumber("");
      setImageUrl("");
      setOpeningHour("");
      setClosingHour("");
      Alert.alert("Cafeteria created successfully");
    } catch (err: any) {
      setApiError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground
      source={{ uri: "https://iili.io/3IoPfjI.jpg" }}
      style={styles.backgroundImage}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.formContainer}>
            <Text style={styles.title}>Create Cafeteria</Text>
            {apiError ? <Text style={styles.errorText}>{apiError}</Text> : null}

            <TextInput
              label="Name"
              value={name}
              onChangeText={(text) => {
                setName(text);
                setFormErrors((prev) => ({ ...prev, name: "" }));
              }}
              mode="outlined"
              style={styles.input}
            />
            {formErrors.name && (
              <Text style={styles.errorText}>{formErrors.name}</Text>
            )}

            <TextInput
              label="Brand"
              value={brand}
              onChangeText={(text) => {
                setBrand(text);
                setFormErrors((prev) => ({ ...prev, brand: "" }));
              }}
              mode="outlined"
              style={styles.input}
            />
            {formErrors.brand && (
              <Text style={styles.errorText}>{formErrors.brand}</Text>
            )}

            <TextInput
              label="Location"
              value={location}
              onChangeText={(text) => {
                setLocation(text);
                setFormErrors((prev) => ({ ...prev, location: "" }));
              }}
              mode="outlined"
              style={styles.input}
            />
            {formErrors.location && (
              <Text style={styles.errorText}>{formErrors.location}</Text>
            )}

            <TextInput
              label="Phone Number"
              value={phoneNumber}
              onChangeText={(text) => {
                setPhoneNumber(text);
                setFormErrors((prev) => ({ ...prev, phoneNumber: "" }));
              }}
              keyboardType="phone-pad"
              mode="outlined"
              style={styles.input}
            />
            {formErrors.phoneNumber && (
              <Text style={styles.errorText}>{formErrors.phoneNumber}</Text>
            )}

            <TextInput
              label="Image URL"
              value={imageUrl}
              onChangeText={(text) => {
                setImageUrl(text);
                setFormErrors((prev) => ({ ...prev, imageUrl: "" }));
              }}
              mode="outlined"
              style={styles.input}
            />
            {formErrors.imageUrl && (
              <Text style={styles.errorText}>{formErrors.imageUrl}</Text>
            )}

            <TextInput
              label="Opening Hour"
              value={openingHour}
              onChangeText={(text) => {
                setOpeningHour(text);
                setFormErrors((prev) => ({ ...prev, openingHour: "" }));
              }}
              mode="outlined"
              style={styles.input}
              placeholder="e.g. 09:00"
            />
            {formErrors.openingHour && (
              <Text style={styles.errorText}>{formErrors.openingHour}</Text>
            )}

            <TextInput
              label="Closing Hour"
              value={closingHour}
              onChangeText={(text) => {
                setClosingHour(text);
                setFormErrors((prev) => ({ ...prev, closingHour: "" }));
              }}
              mode="outlined"
              style={styles.input}
              placeholder="e.g. 17:00"
            />
            {formErrors.closingHour && (
              <Text style={styles.errorText}>{formErrors.closingHour}</Text>
            )}

            <Button
              mode="contained"
              onPress={handleCreateCafeteria}
              loading={loading}
              disabled={loading}
              style={styles.createButton}
            >
              {loading ? "Creating..." : "Create"}
            </Button>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

export default CreateCafeteria;
