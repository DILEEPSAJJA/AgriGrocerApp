import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, View, Text, TextInput, Button, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // To use the trash icon
import { auth, firestore } from '../utils/firebase'; // Import Firebase utilities
import { doc, getDoc, updateDoc } from 'firebase/firestore'; // Firestore methods

const FarmerHome = () => {
  const [farmerName, setFarmerName] = useState('');
  const [farmerEmail, setFarmerEmail] = useState('');
  const [farmerPhone, setFarmerPhone] = useState('');
  const [farmerAddress, setFarmerAddress] = useState('');
  const [itemName, setItemName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [items, setItems] = useState([]);

  // User info fetched from Firestore
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const userDoc = await getDoc(doc(firestore, 'Users', user.uid));
          const userData = userDoc.data();
          if (userData) {
            // Set state with user data
            setUserName(userData.name || 'Unknown');
            setUserEmail(userData.email || 'Unknown');
            setPhoneNumber(userData.phoneNumber || '');
            setAddress(userData.address || '');

            // Populate the farmer details form with user data
            setFarmerName(userData.name || '');
            setFarmerEmail(userData.email || '');
            setFarmerPhone(userData.phoneNumber || '');
            setFarmerAddress(userData.address || '');
          }
        }
      } catch (error) {
        Alert.alert('Error', 'Unable to fetch user data.');
      }
    };

    fetchUserData();
  }, []);

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

  const handleItemsSubmit = () => {
    if (items.length > 0) {
      Alert.alert('Items Submitted', 'Items list has been submitted successfully!');
      setItems([]); // Clear the items list
    } else {
      Alert.alert('No Items', 'Please add some items before submitting.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        
        {/* Display User Information */}
        <View style={styles.userInfoContainer}>
          <Text style={styles.userInfoText}>Name: {userName}</Text>
          <Text style={styles.userInfoText}>Email: {userEmail}</Text>
          <Text style={styles.userInfoText}>Phone: {phoneNumber}</Text>
          <Text style={styles.userInfoText}>Address: {address}</Text>
        </View>

        {/* Farmer's Details Form */}
        <View style={styles.form}>
          <Text style={styles.formTitle}>Update Farmer's Details</Text>

          {/* Farmer Name */}
          <TextInput
            style={styles.input}
            placeholder="Farmer's Name"
            value={farmerName}
            onChangeText={setFarmerName}
          />

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
              placeholder="Quantity"
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
                  <Text>{item.itemName} - {item.quantity}</Text>
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
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  scrollViewContent: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  userInfoContainer: {
    width: '90%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 20,
    elevation: 3,
  },
  userInfoText: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: 'bold',
    color: '#333',
  },
  form: {
    width: '90%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 3,
    alignItems: 'center',
    marginBottom: 20,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  itemList: {
    marginTop: 20,
    width: '100%',
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
  },
  updateButton: {
    backgroundColor: '#8fbc8f',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginTop: 10,
  },
  updateButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: '#d3d3d3',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginTop: 20,
  },
  submitButtonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default FarmerHome;
