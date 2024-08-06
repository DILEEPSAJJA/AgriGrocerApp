import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, View, Text, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { signOut } from 'firebase/auth';
import { auth } from '../utils/firebase'; // Adjust the import path as needed

const Profile = () => {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const name = await AsyncStorage.getItem('name');
        const email = await AsyncStorage.getItem('email');
        setUserName(name || 'Unknown');
        setUserEmail(email || 'Unknown');
      } catch (error) {
        Alert.alert('Error', 'Unable to fetch user data.');
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      // Navigate to the login screen
    } catch (error) {
      Alert.alert('Error', 'There was an issue logging out. Please try again.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profileContainer}>
        <Text style={styles.label}>Name:</Text>
        <Text style={styles.value}>{userName}</Text>
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>{userEmail}</Text>
        <Button title="Logout" onPress={handleLogout} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileContainer: {
    width: '80%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 3,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  value: {
    fontSize: 16,
    marginBottom: 20,
  },
});

export default Profile;
