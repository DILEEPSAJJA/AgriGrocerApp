import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator, Modal, ImageBackground, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { auth, firestore } from '../utils/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import Toast from 'react-native-toast-message';

const { height: screenHeight } = Dimensions.get('window');

const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isLoginSuccess, setIsLoginSuccess] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const userDoc = await getDoc(doc(firestore, 'Users', user.uid));
      const userData = userDoc.data();

      if (!userData) {
        throw new Error('No user data found');
      }

      Toast.show({
        type: 'success',
        position: 'bottom',
        text1: 'Login Successful',
        text2: 'You have successfully logged in.',
      });

      switch (userData.role) {
        case 'customer': 
          navigation.navigate('CustomerDashboard');
          break;
        case 'farmer':
          navigation.navigate('FarmerDashboard');
          break;
        case 'organization':
          navigation.navigate('OrganizationDashboard');
          break;
        default:
          Alert.alert('Error', 'Unknown role');
      }
      
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error('Login failed: ', error);
      Alert.alert('Login Failed', error.message || 'An unknown error occurred');

      Toast.show({
        type: 'error',
        position: 'bottom',
        text1: 'Login Failed',
        text2: error.message || 'An unknown error occurred',
      });
    }
  };

  useEffect(() => {
    if (isLoginSuccess) {
      Toast.show({
        type: 'success',
        position: 'bottom',
        text1: 'Login Successful',
        text2: 'You have successfully logged in.',
      });

      setIsLoginSuccess(false);
    }
  }, [isLoginSuccess]);

  return (
    <View style={styles.container}>
      <View style={styles.backgroundImageContainer}>
        <ImageBackground 
          source={require('../assets/bg.jpeg')} 
          style={styles.backgroundImage}
        />
      </View>
      <View style={styles.loginContainer}>
        <Modal visible={loading} transparent={true} animationType="fade">
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        </Modal>
        <Text style={styles.title}>Log in to your account</Text>
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
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.buttonLogin} onPress={handleLogin}>
            <Text style={styles.buttonLoginText}>Log In</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonRegister} onPress={() => navigation.navigate('Register')}>
            <Text style={styles.buttonRegisterText}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    
      <Toast />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImageContainer: {
    height: screenHeight / 3, // 1/4 of the screen height
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    width: '100%',
  },
  loginContainer: {
    flex: 3, 
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
    alignItems: 'center',
    elevation: 5, 
    shadowColor: '#000', // optional, for shadow effect on iOS
    shadowOffset: { width: 0, height: 2 }, // optional, for shadow effect on iOS
    shadowOpacity: 0.1, // optional, for shadow effect on iOS
    shadowRadius: 4, // optional, for shadow effect on iOS
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#111518',
    textAlign: 'center',
    paddingBottom: 15,
    paddingTop: 20,
  },
  input: {
    height: 56,
    top: 20,
    borderColor: '#f0f2f5',
    borderWidth: 1,
    borderRadius: 12,
    backgroundColor: '#f0f2f5',
    marginBottom: 15,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#111518',
    width: '100%',
  },
  buttonContainer: {
    top: 40,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  buttonLogin: {
    top: 40,
    backgroundColor: '#2094f3',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 12,
    marginBottom: 10,
    width: '100%',
    alignItems: 'center',
  },
  buttonLoginText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonRegister: {
    top: 40,
    backgroundColor: '#f0f2f5',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
  },
  buttonRegisterText: {
    color: '#111518',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});

export default LoginScreen;
