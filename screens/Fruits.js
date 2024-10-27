import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { firestore } from '../utils/firebase'; // Adjust the path if necessary
import { collection, getDocs, doc, updateDoc, addDoc } from 'firebase/firestore';
import { colors } from '../constants/Theme'; // Adjust imports as necessary

const Fruits = () => {
  const navigation = useNavigation();
  const [fruits, setFruits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFruits = async () => {
      try {
        const fruitsCollection = collection(firestore, 'Fruits');
        const fruitsSnapshot = await getDocs(fruitsCollection);
        const fruitsList = fruitsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          quantity: 0, // Initialize quantity to 0
        }));
        setFruits(fruitsList);
      } catch (error) {
        console.error("Error fetching fruits:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFruits();
  }, []);

  const handleQuantityChange = async (id, currentQuantity, change) => {
    const newQuantity = currentQuantity + change;

    if (newQuantity > 10) {
      alert("You can't have more than 10 fruits");
      return;
    }

    if (newQuantity >= 0 && newQuantity <= 10) {
      try {
        const fruitRef = doc(firestore, 'Fruits', id);
        await updateDoc(fruitRef, {
          quantity: newQuantity,
        });
        setFruits(prevFruits =>
          prevFruits.map(fruit =>
            fruit.id === id ? { ...fruit, quantity: newQuantity } : fruit
          )
        );
      } catch (error) {
        console.error("Error updating quantity:", error);
      }
    }
  };

  const toggleWishlist = async (id, isWishlist) => {
    // Logic to toggle wishlist state (add/remove)
  };

  const addToCart = async (item) => {
    try {
      await addDoc(collection(firestore, 'Cart'), {
        name: item.Name,
        price: item.price,
        quantity: item.quantity || 0,
      });
      alert(`${item.Name} added to cart!`);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#FF4500" />;
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.gray }}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Fruits List</Text>
      </View>
      <View style={{ flex: 1 }}>
        <FlatList
          data={fruits}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <Text style={styles.itemText}>Name: {item.Name}</Text>
              <Text style={styles.itemText}>Price: ₹{item.price}</Text>
              <Text style={styles.itemText}>Quantity: {item.Qty}</Text>

              <View style={styles.quantityContainer}>
                <TouchableOpacity
                  style={styles.quantityButton}
                  onPress={() => handleQuantityChange(item.id, item.quantity || 0, -1)} 
                  disabled={(item.quantity || 0) === 0}
                >
                  <Text style={styles.quantityButtonText}>-</Text>
                </TouchableOpacity>

                <Text style={styles.quantityText}>{item.quantity || 0}</Text>

                <TouchableOpacity
                  style={styles.quantityButton}
                  onPress={() => handleQuantityChange(item.id, item.quantity || 0, 1)} 
                  disabled={(item.quantity || 0) >= 10}
                >
                  <Text style={styles.quantityButtonText}>+</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={[styles.wishlistButton, item.isWishlist ? styles.wishlistAdded : styles.wishlistNotAdded]}
                onPress={() => toggleWishlist(item.id, item.isWishlist)}
              >
                <Text style={styles.wishlistButtonText}>
                  {item.isWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.addToCartButton}
                onPress={() => addToCart(item)}
              >
                <Text style={styles.addToCartButtonText}>Add to Cart</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 60,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  headerTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "700",
  },
  itemContainer: {
    padding: 16,
    marginVertical: 8,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  itemText: {
    fontSize: 16,
    marginBottom: 8,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  quantityButton: {
    padding: 8,
    backgroundColor: 'black',
    borderRadius: 5,
    marginHorizontal: 5,
  },
  quantityButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  quantityText: {
    fontSize: 16,
  },
  wishlistButton: {
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  wishlistAdded: {
    backgroundColor: "black",
  },
  wishlistNotAdded: {
    backgroundColor: "#ddd",
  },
  wishlistButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  addToCartButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#FF4500",
    alignItems: "center",
    marginTop: 10,
  },
  addToCartButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default Fruits;
