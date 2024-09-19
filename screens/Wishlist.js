import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image } from "react-native";
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

    // Cleanup on unmount
    return () => unsubscribe();
  }, []);

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <FlatList
        data={wishlistItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 10 }}>
            <Image source={item.imgSrc} style={{ width: 100, height: 100 }} />
            <Text>{item.name}</Text>
            <Text>${item.price}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default Wishlist;
