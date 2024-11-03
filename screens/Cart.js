import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { firestore, auth } from '../utils/firebase';
import { collection, onSnapshot, doc, deleteDoc, addDoc } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(firestore, 'Cart'),
      (cartSnapshot) => {
        const cartList = cartSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCartItems(cartList);
        calculateCartDetails(cartList); // Calculate cart details
        setLoading(false); // Stop loading once data is fetched
      },
      (error) => {
        console.error('Error fetching cart items:', error);
        setLoading(false); // Stop loading on error
      }
    );

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  // Function to calculate total amount, total quantity, and total items
  const calculateCartDetails = (items) => {
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const quantity = items.reduce((sum, item) => sum + item.quantity, 0);
    const itemCount = items.length;

    setTotalAmount(total);
    setTotalQuantity(quantity);
    setTotalItems(itemCount);
  };

  const handleRemoveItem = async (id) => {
    try {
      await deleteDoc(doc(firestore, 'Cart', id));
    } catch (error) {
      console.error('Error removing item: ', error);
      Alert.alert('Error', 'Failed to remove item. Please try again.');
    }
  };

  const handleProceed = async () => {
    const user = auth.currentUser;
    if (!user) {
      Alert.alert('Error', 'You must be logged in to place an order.');
      return;
    }

    try {
      const orderData = {
        userId: user.uid,
        orderDate: new Date(),
        items: cartItems,
        totalAmount,
        totalQuantity,
        status: 'Pending',
      };

      const orderDocRef = await addDoc(collection(firestore, 'Orders'), orderData);
      console.log('Order successfully added with ID:', orderDocRef.id);

      // Remove items from Cart after placing order
      const deletePromises = cartItems.map((item) =>
        deleteDoc(doc(firestore, 'Cart', item.id))
      );
      await Promise.all(deletePromises);

      // Navigate to Payment page with totalAmount
      navigation.navigate('Payment', { totalAmount });
    } catch (error) {
      console.error('Error placing order:', error);
      Alert.alert('Error', 'Failed to place order. Please try again.');
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#FF4500" />;
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={{ flex: 1, padding: 16 }}>
        {cartItems.length === 0 ? (
          <Text style={styles.emptyText}>Your cart is empty!</Text>
        ) : (
          <>
            <FlatList
              data={cartItems}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={styles.itemContainer}>
                  <Text style={styles.itemText}>Name: {item.name}</Text>
                  <Text style={styles.itemText}>Price: ₹{item.price}</Text>
                  <Text style={styles.itemText}>Quantity: {item.quantity}</Text>
                  <TouchableOpacity
                    style={styles.removeButton}
                    onPress={() => handleRemoveItem(item.id)}
                  >
                    <Text style={styles.removeButtonText}>Remove</Text>
                  </TouchableOpacity>
                </View>
              )}
            />

            <View style={styles.summaryContainer}>
              <Text style={styles.summaryText}>Total Items: {totalItems}</Text>
              <Text style={styles.summaryText}>Total Quantity: {totalQuantity}</Text>
              <Text style={styles.summaryText}>Total Amount: ₹{totalAmount}</Text>
            </View>

            <TouchableOpacity style={styles.proceedButton} onPress={handleProceed}>
              <Text style={styles.proceedButtonText}>Proceed</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    padding: 16,
    marginVertical: 8,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
  },
  itemText: {
    fontSize: 16,
  },
  removeButton: {
    marginTop: 10,
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  removeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  emptyText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
  summaryContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  summaryText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  proceedButton: {
    backgroundColor: '#28a745',
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
  },
  proceedButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Cart;