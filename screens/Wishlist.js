import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image, StyleSheet } from "react-native";
import firestore from "@react-native-firebase/firestore";

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection("wishlist")
      .onSnapshot((querySnapshot) => {
        const items = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setWishlistItems(items);
      });

    return () => unsubscribe(); // Cleanup listener on unmount
  }, []);

  const renderWishlistItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.imgSrc }} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>${item.price}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={wishlistItems}
        keyExtractor={(item) => item.id}
        renderItem={renderWishlistItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f8f8f8',
  },
  itemContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginVertical: 5,
    elevation: 3,
  },
  itemImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 10,
  },
  itemDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemPrice: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
});

export default Wishlist;
