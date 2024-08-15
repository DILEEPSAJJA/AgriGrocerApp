import React, { useState, useEffect, useCallback } from 'react';
import { SafeAreaView, StyleSheet, View, Text, Image, Button, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { collection, getDocs, getFirestore, query, where } from "firebase/firestore";
import AsyncStorage from '@react-native-async-storage/async-storage';
import app from '../utils/firebase';

const FarmerHome = () => {
  const navigation = useNavigation();
  const [profileImageUrl, setProfileImageUrl] = useState(null);
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchUserImage = useCallback(async (userName) => {
    try {
      const db = getFirestore(app);
      const profilesRef = collection(db, "Users");
      const q = query(profilesRef, where("name", "==", userName));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0];
        const data = doc.data();
        setProfileImageUrl(
          data.profileImage || // Use profile image from Firestore
          "https://cdn.usegalileo.ai/stability/40da8e6a-16f8-4274-80c2-9c349493caaa.png" // Default image URL
        );
      } else {
        setProfileImageUrl(
          "https://cdn.usegalileo.ai/stability/40da8e6a-16f8-4274-80c2-9c349493caaa.png" // Default image if no match found
        );
      }
    } catch (error) {
      console.error("Error fetching user image:", error);
      setProfileImageUrl(
        "https://cdn.usegalileo.ai/stability/40da8e6a-16f8-4274-80c2-9c349493caaa.png" // Default image in case of error
      );
    }
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const name = await AsyncStorage.getItem("name");
        if (name !== null) {
          setUserName(name);
          fetchUserImage(name);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [fetchUserImage]);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.profile}>
          <Image
            style={styles.profileImage}
            source={{
              uri:
                profileImageUrl ||
                "https://cdn.usegalileo.ai/stability/40da8e6a-16f8-4274-80c2-9c349493caaa.png",
            }}
          />
          <View style={styles.profileText}>
            <Text style={styles.title}>Welcome, {userName || "Farmer"}!</Text>
          </View>
        </View>
        <Button title="Go to Profile" onPress={() => navigation.navigate('Profile')} />
        {/* Add more buttons or components based on your app's features */}
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
  content: {
    width: '80%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 3,
    alignItems: 'center',
  },
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderColor: "#ccc",
    borderWidth: 2,
  },
  profileText: {
    marginLeft: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default FarmerHome;
