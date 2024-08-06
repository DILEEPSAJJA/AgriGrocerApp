// // screens/LoginScreen.js
// import React, { useState } from 'react';
// import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator, Modal } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import { auth, firestore } from '../utils/firebase';
// import { signInWithEmailAndPassword } from 'firebase/auth';
// import { doc, getDoc } from 'firebase/firestore';

// const LoginScreen = () => {
//   const navigation = useNavigation();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleLogin = async () => {
//     setLoading(true);
//     try {
//       // Sign in user with email and password
//       const userCredential = await signInWithEmailAndPassword(auth, email, password);
//       const user = userCredential.user;

//       // Fetch user data from Firestore
//       const userDoc = await getDoc(doc(firestore, 'Users', user.uid));
//       const userData = userDoc.data();

//       // Navigate to the appropriate dashboard based on user roleFarmerDashboard
//       switch (userData.role) {
//         case 'customer': 
//           navigation.navigate('CustomerDashboard');
//           break;
//         case 'farmer':
//           navigation.navigate('FarmerDashboard');
//           break;
//         case 'organization':
//           navigation.navigate('OrganizationDashboard');
//           break;
//         default:
//           Alert.alert('Error', 'Unknown role');
//       }
      
//       setLoading(false);
//     } catch (error) {
//       setLoading(false);
//       console.error('Login failed: ', error);
//       Alert.alert('Login Failed', error.message);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Modal visible={loading} transparent={true} animationType="fade">
//         <View style={styles.loadingContainer}>
//           <ActivityIndicator size="large" color="#0000ff" />
//         </View>
//       </Modal>
//       <Text style={styles.title}>Login</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Email"
//         value={email}
//         onChangeText={setEmail}
//         keyboardType="email-address"
//         autoCapitalize="none"
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Password"
//         value={password}
//         onChangeText={setPassword}
//         secureTextEntry
//       />
//       <TouchableOpacity style={styles.button} onPress={handleLogin}>
//         <Text style={styles.buttonText}>Login</Text>
//       </TouchableOpacity>
//       <TouchableOpacity onPress={() => navigation.navigate('Register')}>
//         <Text style={styles.registerLink}>Don't have an account? Register</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     padding: 20,
//   },
//   title: {
//     fontSize: 32,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     textAlign: 'center',
//   },
//   input: {
//     height: 40,
//     borderColor: '#ccc',
//     borderWidth: 1,
//     borderRadius: 5,
//     marginBottom: 15,
//     paddingHorizontal: 10,
//   },
//   button: {
//     backgroundColor: '#4CAF50',
//     padding: 10,
//     borderRadius: 5,
//     alignItems: 'center',
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 16,
//   },
//   registerLink: {
//     color: '#0066cc',
//     marginTop: 15,
//     textAlign: 'center',
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//   },
// });

// export default LoginScreen;

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { auth, firestore } from '../utils/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      // Sign in user with email and password
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Fetch user data from Firestore
      const userDoc = await getDoc(doc(firestore, 'Users', user.uid));
      const userData = userDoc.data();

      if (!userData) {
        throw new Error('No user data found');
      }

      // Navigate to the appropriate dashboard based on user role
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
    }
  };

  return (
    <View style={styles.container}>
      <Modal visible={loading} transparent={true} animationType="fade">
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      </Modal>
      <Text style={styles.title}>Login</Text>
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
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.registerLink}>Don't have an account? Register</Text>
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
  registerLink: {
    color: '#0066cc',
    marginTop: 15,
    textAlign: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});

export default LoginScreen;

