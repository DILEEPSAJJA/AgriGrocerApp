import React, { useEffect, useState, useCallback } from 'react';
import { SafeAreaView, StyleSheet, View, Text, FlatList, Image, RefreshControl } from 'react-native';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { auth, firestore } from '../utils/firebase';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchOrders = useCallback(() => {
    const user = auth.currentUser;
    if (user) {
      const ordersCollection = collection(firestore, 'Orders');
      const q = query(ordersCollection, where('userId', '==', user.uid));
      
      // Set up a real-time listener to fetch data
      return onSnapshot(q, (snapshot) => {
        const ordersList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setOrders(ordersList);
      }, (error) => {
        console.error('Error fetching orders: ', error);
      });
    }
  }, []);

  useEffect(() => {
    const unsubscribe = fetchOrders();
    return unsubscribe; // Clean up the listener on component unmount
  }, [fetchOrders]);

  const onRefresh = async () => {
    setRefreshing(true);
    fetchOrders();
    setRefreshing(false);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered':
        return '#28a745'; // Green
      case 'Pending':
        return '#dc3545'; // Red
      case 'Packed at Nearby Warehouse':
        return '#ffc107'; // Yellow
      default:
        return '#666'; // Default color for other statuses
    }
  };

  const renderOrderItem = ({ item }) => (
    <View style={styles.orderItem}>
      {item.items.map((product, index) => (
        <View key={index} style={styles.productItem}>
          <Image source={{ uri: product.productImage }} style={styles.orderImage} />
          <View style={styles.orderDetails}>
            <Text style={styles.orderTitle}>Order Placed</Text>
          </View>
        </View>
      ))}
      <Text style={styles.orderTotal}>Order Total: ₹{item.totalAmount}</Text>
      <Text style={[styles.orderStatus, { color: getStatusColor(item.status) }]}>
        Status: {item.status}
      </Text>
      <Text style={styles.orderDate}>
        Date: {new Date(item.orderDate.seconds * 1000).toLocaleDateString()}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={orders}
        renderItem={renderOrderItem}
        keyExtractor={(item) => item.id}
        style={styles.ordersList}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
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
  },
  productItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  orderImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 10,
  },
  orderDetails: {
    flex: 1,
  },
  orderTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  orderTotal: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
  },
  orderStatus: {
    fontSize: 14,
    marginTop: 5,
  },
  orderDate: {
    fontSize: 12,
    color: '#666',
  },
});

export default MyOrders;
