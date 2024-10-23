import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, View, Text, FlatList, Image } from 'react-native';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { auth, firestore } from '../utils/firebase'; // Adjust the import path as needed

const MyOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const ordersCollection = collection(firestore, 'Orders');
          const q = query(ordersCollection, where('userId', '==', user.uid));
          const ordersSnapshot = await getDocs(q);
          const ordersList = ordersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setOrders(ordersList);
        }
      } catch (error) {
        console.error('Error fetching orders: ', error);
      }
    };

    fetchOrders();
  }, []);

  const renderOrderItem = ({ item }) => (
    <View style={styles.orderItem}>
      <Image source={{ uri: item.productImage }} style={styles.orderImage} />
      <View style={styles.orderDetails}>
        <Text style={styles.orderTitle}>{item.productName}</Text>
        <Text style={styles.orderStatus}>Status: {item.status}</Text>
        <Text style={styles.orderDate}>Date: {new Date(item.orderDate.seconds * 1000).toLocaleDateString()}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={orders}
        renderItem={renderOrderItem}
        keyExtractor={(item) => item.id}
        style={styles.ordersList}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f8f8f8',
  },
  ordersList: {
    marginTop: 10,
  },
  orderItem: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
    elevation: 3,
    flexDirection: 'row',
  },
  orderImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 10,
  },
  orderDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  orderTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  orderStatus: {
    fontSize: 14,
    color: '#666',
  },
  orderDate: {
    fontSize: 14,
    color: '#666',
  },
});

export default MyOrders;
