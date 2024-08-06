import React from 'react';
import { SafeAreaView, StyleSheet, Button, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { signOut } from 'firebase/auth';
import { auth } from '../utils/firebase'; // Adjust the import path as needed

const Logout = () => {
  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      // Show a success message or navigate to the login screen
      navigation.navigate('Login');
    } catch (error) {
      Alert.alert('Error', 'There was an issue logging out. Please try again.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Button title="Logout" onPress={handleLogout} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Logout;
