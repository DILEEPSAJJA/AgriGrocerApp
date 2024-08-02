import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, Button, TextInput, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTranslation } from "react-i18next";

const Profile = () => {
  const { t } = useTranslation();
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      const storedName = await AsyncStorage.getItem("name");
      const storedPhoneNumber = await AsyncStorage.getItem("phoneNumber");
      setName(storedName || "");
      setPhoneNumber(storedPhoneNumber || "");
    };

    fetchUserData();
  }, []);

  const handleSave = async () => {
    await AsyncStorage.setItem("name", name);
    await AsyncStorage.setItem("phoneNumber", phoneNumber);
    setIsEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  return (
    <View style={styles.container}>
      <Image source={require("../assets/avatar.png")} style={styles.avatar} />
      {isEditing ? (
        <>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder={t("Enter your name")}
          />
          <TextInput
            style={styles.input}
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            placeholder={t("Enter your phone number")}
            keyboardType="phone-pad"
          />
          <TouchableOpacity style={styles.button} onPress={handleSave}>
            <Text style={styles.buttonText}>{t("Save")}</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text style={styles.name}>{name || t("Guest")}</Text>
          <Text style={styles.phoneNumber}>{phoneNumber || t("Unknown")}</Text>
          <TouchableOpacity style={styles.button} onPress={handleEdit}>
            <Text style={styles.buttonText}>{t("Edit Profile")}</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  phoneNumber: {
    fontSize: 16,
    color: "gray",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default Profile;
