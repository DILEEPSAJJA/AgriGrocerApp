<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, View, Text, TextInput, Button, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // To use the trash icon
import { auth, firestore } from '../utils/firebase'; // Import Firebase utilities
import { doc, getDoc, updateDoc, collection, addDoc, getDocs, deleteDoc } from 'firebase/firestore'; // Firestore methods 

const FarmerHome = () => {
  const [farmerName, setFarmerName] = useState('');
  const [farmerEmail, setFarmerEmail] = useState('');
  const [farmerPhone, setFarmerPhone] = useState('');
  const [farmerAddress, setFarmerAddress] = useState('');
  const [itemName, setItemName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [items, setItems] = useState([]);
  const [allItems, setAllItems] = useState([]); // State to hold all items from Firestore
=======
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
>>>>>>> parent of 05a304d (Updated by bhuvanesh Added farmer home page displays farmer details forms and add item functionalities alll the changed data will be reflected in database as well as screen)

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

<<<<<<< HEAD
  const addItem = () => {
    if (itemName && quantity) {
      setItems([...items, { itemName, quantity }]);
      setItemName('');
      setQuantity('');
    }
  };

  const removeItem = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
  };

  const handleFarmerUpdate = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        await updateDoc(doc(firestore, 'Users', user.uid), {
          name: farmerName,
          email: farmerEmail,
          phoneNumber: farmerPhone,
          address: farmerAddress,
        });

        // Update user info in the state after successful update
        setUserName(farmerName);
        setUserEmail(farmerEmail);
        setPhoneNumber(farmerPhone);
        setAddress(farmerAddress);

        Alert.alert('Success', 'Farmer details updated successfully!');
      }
    } catch (error) {
      Alert.alert('Error', 'Unable to update farmer details.');
    }
  };

  const handleItemsSubmit = async () => {
    if (items.length > 0) {
      try {
        const user = auth.currentUser;
        if (user) {
          // Save each item in Firestore
          const itemsCollection = collection(firestore, 'Items');
          await Promise.all(
            items.map(item => addDoc(itemsCollection, {
              farmerId: user.uid,
              itemName: item.itemName,
              quantity: item.quantity,
            }))
          );

          Alert.alert('Items Submitted', 'Items list has been submitted successfully!');
          setItems([]); // Clear the items list
        }
      } catch (error) {
        Alert.alert('Error', 'Unable to submit items.');
      }
    } else {
      Alert.alert('No Items', 'Please add some items before submitting.');
    }
  };
=======
  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
>>>>>>> parent of 05a304d (Updated by bhuvanesh Added farmer home page displays farmer details forms and add item functionalities alll the changed data will be reflected in database as well as screen)

  const fetchAllItems = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        const itemsCollection = collection(firestore, 'Items');
        const itemsSnapshot = await getDocs(itemsCollection);
        const fetchedItems = itemsSnapshot.docs
          .map(doc => ({ id: doc.id, ...doc.data() }))
          .filter(item => item.farmerId === user.uid); // Filter by farmer ID

        setAllItems(fetchedItems);
      }
    } catch (error) {
      Alert.alert('Error', 'Unable to fetch items.');
    }
  };

  const removeItemFromFirestore = async (itemId) => {
    try {
      await deleteDoc(doc(firestore, 'Items', itemId)); // Delete item from Firestore
      setAllItems(allItems.filter(item => item.id !== itemId)); // Update local state
      Alert.alert('Success', 'Item removed successfully!');
    } catch (error) {
      Alert.alert('Error', 'An error occurred while removing the item.');
    }
  };

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
<<<<<<< HEAD

          {/* Farmer Email */}
          <TextInput
            style={styles.input}
            placeholder="Farmer's Email"
            value={farmerEmail}
            onChangeText={setFarmerEmail}
          />

          {/* Farmer Phone Number */}
          <TextInput
            style={styles.input}
            placeholder="Farmer's Phone Number"
            keyboardType="phone-pad"
            value={farmerPhone}
            onChangeText={setFarmerPhone}
          />

          {/* Farmer Address */}
          <TextInput
            style={styles.input}
            placeholder="Farmer's Address"
            value={farmerAddress}
            onChangeText={setFarmerAddress}
          />

          {/* Update Farmer Details Button */}
          <TouchableOpacity style={styles.updateButton} onPress={handleFarmerUpdate}>
            <Text style={styles.updateButtonText}>Update Farmer Details</Text>
          </TouchableOpacity>
        </View>

        {/* Item Name and Quantity */}
        <View style={styles.form}>
          <Text style={styles.formTitle}>Add Items</Text>
          <View style={styles.row}>
            <TextInput
              style={[styles.input, { flex: 1 }]}
              placeholder="Item Name"
              value={itemName}
              onChangeText={setItemName}
            />
            <TextInput
              style={[styles.input, { flex: 1 }]}
              placeholder="Quantity (Kg)"
              keyboardType="numeric"
              value={quantity}
              onChangeText={setQuantity}
            />
          </View>
          <Button title="Add Item" onPress={addItem} />

          {/* Display Added Items */}
          {items.length > 0 && (
            <View style={styles.itemList}>
              {items.map((item, index) => (
                <View key={index} style={styles.itemContainer}>
                  <Text>{item.itemName} - {item.quantity} Kg</Text>
                  <TouchableOpacity onPress={() => removeItem(index)}>
                    <FontAwesome name="trash" size={24} color="red" />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}

          {/* Submit Items Button */}
          <TouchableOpacity style={styles.submitButton} onPress={handleItemsSubmit}>
            <Text style={styles.submitButtonText}>Submit Items</Text>
          </TouchableOpacity>

          {/* Display All Items Button */}
          <TouchableOpacity style={styles.displayButton} onPress={fetchAllItems}>
            <Text style={styles.displayButtonText}>Display All Items</Text>
          </TouchableOpacity>

          {/* Display All Items in a Table */}
          {allItems.length > 0 && (
            <View style={styles.table}>
              <Text style={styles.tableHeader}>All Items</Text>
              <View style={styles.tableRow}>
                <Text style={styles.tableCellBold}>Item</Text>
                <Text style={styles.tableCellBold}>Qty (Kg)</Text>
                <Text style={styles.tableCellBold}>Actions</Text>
              </View>
              {allItems.map(item => (
                <View key={item.id} style={styles.tableRow}>
                  <Text style={styles.tableCell}>{item.itemName}</Text>
                  <Text style={styles.tableCell}>{item.quantity}</Text>
                  <TouchableOpacity onPress={() => removeItemFromFirestore(item.id)}>
                    <FontAwesome name="trash" size={24} color="red" />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}
=======
          <View style={styles.profileText}>
            <Text style={styles.title}>Welcome, {userName || "Farmer"}!</Text>
          </View>
>>>>>>> parent of 05a304d (Updated by bhuvanesh Added farmer home page displays farmer details forms and add item functionalities alll the changed data will be reflected in database as well as screen)
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
  displayButton: {
    backgroundColor: '#add8e6',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginTop: 20,
  },
  displayButtonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },
  table: {
    marginTop: 20,
    width: '100%',
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 10,
  },
  tableHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  tableCell: {
    fontSize: 14,
    color: '#333',
  },
  tableCellBold: {
    fontSize: 14,
    color: '#333',
    fontWeight: 'bold', // Bold text for headers
  },
});

export default FarmerHome;
