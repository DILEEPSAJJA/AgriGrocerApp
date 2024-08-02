import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { auth, firestore, createUserWithEmailAndPassword, doc, setDoc } from '../utils/firebase'; 
import { Picker } from '@react-native-picker/picker'; // Import Picker from @react-native-picker/picker
import Toast from 'react-native-toast-message';

const Register = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [role, setRole] = useState('customer'); 
  
  const showToast = () => {
    Toast.show({
      type: 'success',
      position: 'top',
      text1: 'Registration Successful',
      text2: 'You have successfully registered!',
    });
  };

  const handleRegister = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      // Determine the collection based on the selected role
      let collectionName;
      switch (role) {
        case 'farmer':
          collectionName = 'farmers';
          break;
        case 'organization':
          collectionName = 'organizations';
          break;
        case 'customer':
        default:
          collectionName = 'customers';
          break;
      }
  
      // Save user data to the selected collection
      await setDoc(doc(firestore, collectionName, user.uid), {
        name,
        email,
        phoneNumber,
        role,
      });
  
      showToast(); // Show success toast
      navigation.navigate('Login'); // Navigate to the login screen after registration
    } catch (error) {
      Alert.alert('Registration Failed', error.message);
    }
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        keyboardType="phone-pad"
      />
      <View style={styles.pickerContainer}>
        <Text style={styles.pickerLabel}>Select Role:</Text>
        <Picker
          selectedValue={role}
          style={styles.picker}
          onValueChange={(itemValue) => setRole(itemValue)}
        >
          <Picker.Item label="Customer" value="customer" />
          <Picker.Item label="Farmer" value="farmer" />
          <Picker.Item label="Organization" value="organization" />
        </Picker>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.loginLink}>Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  pickerContainer: {
    marginBottom: 20,
  },
  pickerLabel: {
    fontSize: 16,
    marginBottom: 5,
  },
  picker: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  loginLink: {
    color: '#0066cc',
    marginTop: 15,
    textAlign: 'center',
  },
});

export default Register;
