import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, View, Text, Alert, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native';
import { signOut, updatePassword } from 'firebase/auth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, firestore } from '../utils/firebase'; // Adjust the import path as needed
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const Profile = () => {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(true);
  const [newPassword, setNewPassword] = useState('');
  const [profilePic, setProfilePic] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const userDoc = await getDoc(doc(firestore, 'Users', user.uid));
          const userData = userDoc.data();
          if (userData) {
            setUserName(userData.name || 'Unknown');
            setUserEmail(userData.email || 'Unknown');
            setPhoneNumber(userData.phoneNumber || '');
            setAddress(userData.address || '');
            setProfilePic(userData.profilePic || null);
          }
        }
      } catch (error) {
        Alert.alert('Error', 'Unable to fetch user data.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleUpdateProfile = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        await updateDoc(doc(firestore, 'Users', user.uid), {
          name: userName,
          phoneNumber: phoneNumber,
          address: address,
        });
        Alert.alert('Success', 'Profile updated successfully.');
      }
    } catch (error) {
      Alert.alert('Error', 'Unable to update profile.');
    }
  };

  const handleUpdatePassword = async () => {
    try {
      await updatePassword(auth.currentUser, newPassword);
      Alert.alert('Success', 'Password updated successfully.');
      setNewPassword('');
    } catch (error) {
      Alert.alert('Error', 'Unable to update password.');
    }
  };

  const pickImage = async () => {
    let options = ['Camera', 'Gallery'];
    Alert.alert(
      'Select Image Source',
      '',
      [
        {
          text: options[0],
          onPress: () => pickFromCamera(),
        },
        {
          text: options[1],
          onPress: () => pickFromGallery(),
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ],
      { cancelable: true }
    );
  };

  // const pickFromGallery = async () => {
  //   const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
  //   if (!permissionResult.granted) {
  //     Alert.alert('Permission denied', 'You need to allow access to the gallery.');
  //     return;
  //   }

  //   const result = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.Images,
  //     allowsEditing: true,
  //     aspect: [4, 3],
  //     quality: 1,
  //   });

  //   if (!result.canceled) {
  //     uploadImage(result.uri);
  //   }
  // };

  // const pickFromCamera = async () => {
  //   const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
  //   if (!permissionResult.granted) {
  //     Alert.alert('Permission denied', 'You need to allow access to the camera.');
  //     return;
  //   }

  //   const result = await ImagePicker.launchCameraAsync({
  //     allowsEditing: true,
  //     aspect: [4, 3],
  //     quality: 1,
  //   });

  //   if (!result.canceled) {
  //     uploadImage(result.uri);
  //   }
  // };

  const pickFromGallery = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert('Permission denied', 'You need to allow access to the gallery.');
      return;
    }
  
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
  
    if (!result.canceled) {
      uploadImage(result.uri);
    }
  };
  
  const pickFromCamera = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert('Permission denied', 'You need to allow access to the camera.');
      return;
    }
  
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
  
    if (!result.canceled) {
      uploadImage(result.uri);
    }
  };
  
  const uploadImage = async (uri) => {
    const user = auth.currentUser;
    if (!user) {
      Alert.alert('Error', 'User not authenticated.');
      return;
    }
  
    const storage = getStorage();
    const storageRef = ref(storage, `profile_pics/${user.uid}`);
    
    try {
      // Convert image to blob
      const response = await fetch(uri);
      const blob = await response.blob();
      
      // Upload image to Firebase Storage
      await uploadBytes(storageRef, blob);
      const downloadURL = await getDownloadURL(storageRef);
      
      // Update the user's profile in Firestore with the new image URL
      await updateDoc(doc(firestore, 'Users', user.uid), {
        profilePic: downloadURL,
      });
      
      // Update local state
      setProfilePic(downloadURL);
      
      Alert.alert('Success', 'Profile picture updated successfully.');
    } catch (error) {
      Alert.alert('Error', 'Unable to update profile picture.');
      console.error(error);
    }
  };
  
  

  // const uploadImage = async (uri) => {
  //   const user = auth.currentUser;
  //   const storage = getStorage();
  //   const storageRef = ref(storage, `profile_pics/${user.uid}`);
  //   const img = await fetch(uri);
  //   const bytes = await img.blob();

  //   try {
  //     await uploadBytes(storageRef, bytes);
  //     const downloadURL = await getDownloadURL(storageRef);
  //     setProfilePic(downloadURL);

  //     // Update the user's profile in Firestore with the new image URL
  //     await updateDoc(doc(firestore, 'Users', user.uid), {
  //       profilePic: downloadURL,
  //     });

  //     Alert.alert('Success', 'Profile picture updated successfully.');
  //   } catch (error) {
  //     Alert.alert('Error', 'Unable to update profile picture.');
  //   }
  // };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.profileContainer}>
          <Text>Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>

          </TouchableOpacity>
        </View>

        <View style={styles.imageContainer}>
          <Image
            source={profilePic ? { uri: profilePic } : { uri: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png' }}
            style={styles.profileImage}
          />
        </View>

        {/* <TouchableOpacity style={styles.editButton} onPress={pickImage}>
          <Text style={styles.editButtonText}>Edit Profile Photo</Text>
        </TouchableOpacity> */}
        <TouchableOpacity style={styles.editButton} onPress={pickImage}>
          <Text style={styles.editButtonText}>Edit Profile Photo</Text>
        </TouchableOpacity>


        {/* Profile Update Form */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Full Name</Text>
          <TextInput
            style={styles.input}
            value={userName}
            onChangeText={setUserName}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Phone Number</Text>
          <TextInput
            style={styles.input}
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            placeholder="Phone Number"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={userEmail}
            onChangeText={setUserEmail}
            editable={false}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Address</Text>
          <TextInput
            style={[styles.input, { height: 80 }]}
            value={address}
            onChangeText={setAddress}
            multiline
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleUpdateProfile}>
          <Text style={styles.buttonText}>Update Profile</Text>
        </TouchableOpacity>

        {/* Password Change Section */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>New Password</Text>
          <TextInput
            style={styles.input}
            value={newPassword}
            onChangeText={setNewPassword}
            secureTextEntry
            placeholder="Enter new password"
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleUpdatePassword}>
          <Text style={styles.buttonText}>Change Password</Text>
        </TouchableOpacity>

      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
  },
  icon: {
    padding: 8,
    borderRadius: 16,
    backgroundColor: '#f0f2f5',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111518',
  },
  imageContainer: {
    alignItems: 'center',
    marginVertical: 16,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  editButton: {
    backgroundColor: '#f0f2f5',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
    alignSelf: 'center',
    marginVertical: 8,
  },
  editButtonText: {
    color: '#111518',
    fontWeight: 'bold',
  },
  inputContainer: {
    marginVertical: 8,
  },
  label: {
    color: '#111518',
    fontWeight: '500',
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#dbe1e6',
    borderRadius: 10,
    padding: 12,
    backgroundColor: '#f9f9f9',
  },
  button: {
    backgroundColor: '#000',
    paddingVertical: 12,
    borderRadius: 10,
    marginVertical: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Profile;
