import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, View, Text, Button, Alert, TextInput, TouchableOpacity, Image } from 'react-native';
import { signOut, updatePassword } from 'firebase/auth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, firestore } from '../utils/firebase'; // Adjust the import path as needed
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const Profile = () => {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
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

  const handleUpdatePassword = async () => {
    const user = auth.currentUser;
    if (user) {
      try {
        await updatePassword(user, newPassword);
        Alert.alert('Success', 'Password updated successfully.');
      } catch (error) {
        Alert.alert('Error', error.message);
      }
    }
  };

  const handleUpdateProfile = async () => {
    const user = auth.currentUser;
    if (user) {
      try {
        await updateDoc(doc(firestore, 'Users', user.uid), {
          address,
          profilePic,
        });
        Alert.alert('Success', 'Profile updated successfully.');
      } catch (error) {
        Alert.alert('Error', 'Unable to update profile.');
      }
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const { uri } = result;
      const user = auth.currentUser;
      const storage = getStorage();
      const storageRef = ref(storage, `profile_pics/${user.uid}`);
      const img = await fetch(uri);
      const bytes = await img.blob();

      await uploadBytes(storageRef, bytes);
      const downloadURL = await getDownloadURL(storageRef);

      setProfilePic(downloadURL);
    }
  };

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
    <SafeAreaView style={styles.container}>
      <View style={styles.profileContainer}>
        <Text style={styles.label}>Name:</Text>
        <Text style={styles.value}>{userName}</Text>
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>{userEmail}</Text>
        <Text style={styles.label}>Address:</Text>
        <TextInput
          style={styles.input}
          value={address}
          onChangeText={setAddress}
        />
        <Button title="Pick an image from camera roll" onPress={pickImage} />
        {profilePic && <Image source={{ uri: profilePic }} style={styles.image} />}
        <TextInput
          style={styles.input}
          placeholder="New Password"
          secureTextEntry
          value={newPassword}
          onChangeText={setNewPassword}
        />
        <Button title="Update Password" onPress={handleUpdatePassword} />
        <Button title="Update Profile" onPress={handleUpdateProfile} />
        <Button title="Sign Out" onPress={() => signOut(auth)} />
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
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 20,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: 10,
    marginBottom: 20,
  },
});

export default Profile;
