// import React, { useEffect, useState } from 'react';
// import {
//   SafeAreaView,
//   View,
//   Text,
//   FlatList,
//   ActivityIndicator,
//   StyleSheet,
//   TouchableOpacity,
// } from 'react-native';
// import { firestore } from '../utils/firebase'; // Adjust the path if necessary
// import { collection, onSnapshot, doc, deleteDoc } from 'firebase/firestore';

// const Cart = () => {
//   const [cartItems, setCartItems] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const unsubscribe = onSnapshot(
//       collection(firestore, 'Cart'),
//       (cartSnapshot) => {
//         const cartList = cartSnapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         }));
//         setCartItems(cartList);
//         setLoading(false); // Stop loading once data is fetched
//       },
//       (error) => {
//         console.error('Error fetching cart items:', error);
//         setLoading(false); // Stop loading on error
//       }
//     );

//     // Cleanup subscription on unmount
//     return () => unsubscribe();
//   }, []);

//   const handleRemoveItem = async (id) => {
//     try {
//       await deleteDoc(doc(firestore, 'Cart', id));
//     } catch (error) {
//       console.error('Error removing item: ', error);
//     }
//   };

//   if (loading) {
//     return <ActivityIndicator size="large" color="#FF4500" />;
//   }

//   return (
//     <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
//       <View style={{ flex: 1, padding: 16 }}>
//         {cartItems.length === 0 ? (
//           <Text style={styles.emptyText}>Your cart is empty!</Text>
//         ) : (
//           <FlatList
//             data={cartItems}
//             keyExtractor={(item) => item.id}
//             renderItem={({ item }) => (
//               <View style={styles.itemContainer}>
//                 <Text style={styles.itemText}>Name: {item.name}</Text>
//                 <Text style={styles.itemText}>Price: ₹{item.price}</Text>
//                 <Text style={styles.itemText}>Quantity: {item.quantity}</Text>
//                 <TouchableOpacity
//                   style={styles.removeButton}
//                   onPress={() => handleRemoveItem(item.id)}
//                 >
//                   <Text style={styles.removeButtonText}>Remove</Text>
//                 </TouchableOpacity>
//               </View>
//             )}
//           />
//         )}
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   itemContainer: {
//     padding: 16,
//     marginVertical: 8,
//     backgroundColor: '#f9f9f9',
//     borderRadius: 8,
//   },
//   itemText: {
//     fontSize: 16,
//   },
//   removeButton: {
//     marginTop: 10,
//     backgroundColor: '#FF4500',
//     padding: 10,
//     borderRadius: 5,
//     alignItems: 'center',
//   },
//   removeButtonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   emptyText: {
//     fontSize: 18,
//     textAlign: 'center',
//     marginTop: 20,
//   },
// });

// export default Cart;


// import React, { useEffect, useState } from 'react';
// import {
//   SafeAreaView,
//   View,
//   Text,
//   FlatList,
//   ActivityIndicator,
//   StyleSheet,
//   TouchableOpacity,
// } from 'react-native';
// import { firestore } from '../utils/firebase'; // Adjust the path if necessary
// import { collection, onSnapshot, doc, deleteDoc } from 'firebase/firestore';

// const Cart = () => {
//   const [cartItems, setCartItems] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const unsubscribe = onSnapshot(
//       collection(firestore, 'Cart'),
//       (cartSnapshot) => {
//         const cartList = cartSnapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         }));
//         setCartItems(cartList);
//         setLoading(false); // Stop loading once data is fetched
//       },
//       (error) => {
//         console.error('Error fetching cart items:', error);
//         setLoading(false); // Stop loading on error
//       }
//     );

//     // Cleanup subscription on unmount
//     return () => unsubscribe();
//   }, []);

//   const handleRemoveItem = async (id) => {
//     try {
//       await deleteDoc(doc(firestore, 'Cart', id));
//     } catch (error) {
//       console.error('Error removing item: ', error);
//     }
//   };

//   // Calculate total number of items, total quantity, and total amount
//   const totalItems = cartItems.length;
//   const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
//   const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

//   if (loading) {
//     return <ActivityIndicator size="large" color="#FF4500" />;
//   }

//   return (
//     <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
//       <View style={{ flex: 1, padding: 16 }}>
//         {cartItems.length === 0 ? (
//           <Text style={styles.emptyText}>Your cart is empty!</Text>
//         ) : (
//           <>
//             <FlatList
//               data={cartItems}
//               keyExtractor={(item) => item.id}
//               renderItem={({ item }) => (
//                 <View style={styles.itemContainer}>
//                   <Text style={styles.itemText}>Name: {item.name}</Text>
//                   <Text style={styles.itemText}>Price: ₹{item.price}</Text>
//                   <Text style={styles.itemText}>Quantity: {item.quantity}</Text>
//                   <TouchableOpacity
//                     style={styles.removeButton}
//                     onPress={() => handleRemoveItem(item.id)}
//                   >
//                     <Text style={styles.removeButtonText}>Remove</Text>
//                   </TouchableOpacity>
//                 </View>
//               )}
//             />

//             {/* Display total items, quantity, and amount */}
//             <View style={styles.summaryContainer}>
//               <Text style={styles.summaryText}>Total Items: {totalItems}</Text>
//               <Text style={styles.summaryText}>Total Quantity: {totalQuantity}</Text>
//               <Text style={styles.summaryText}>Total Amount: ₹{totalAmount.toFixed(2)}</Text>
//             </View>

//             {/* "Proceed" Button */}
//             <TouchableOpacity style={styles.proceedButton} onPress={() => alert('Proceed to checkout')}>
//               <Text style={styles.proceedButtonText}>Proceed</Text>
//             </TouchableOpacity>
//           </>
//         )}
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   itemContainer: {
//     padding: 16,
//     marginVertical: 8,
//     backgroundColor: '#f9f9f9',
//     borderRadius: 8,
//   },
//   itemText: {
//     fontSize: 16,
//   },
//   removeButton: {
//     marginTop: 10,
//     backgroundColor: 'black',
//     padding: 10,
//     borderRadius: 5,
//     alignItems: 'center',
//   },
//   removeButtonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   emptyText: {
//     fontSize: 18,
//     textAlign: 'center',
//     marginTop: 20,
//   },
//   summaryContainer: {
//     padding: 16,
//     backgroundColor: '#f0f0f0',
//     borderRadius: 8,
//     marginTop: 16,
//   },
//   summaryText: {
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   proceedButton: {
//     backgroundColor: 'black',
//     padding: 15,
//     borderRadius: 5,
//     alignItems: 'center',
//     marginVertical: 20,
//   },
//   proceedButtonText: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
// });

// export default Cart;


// import React, { useEffect, useState } from 'react';
// import {
//   SafeAreaView,
//   View,
//   Text,
//   FlatList,
//   ActivityIndicator,
//   StyleSheet,
//   TouchableOpacity,
// } from 'react-native';
// import { firestore } from '../utils/firebase'; // Adjust the path if necessary
// import { collection, onSnapshot, doc, deleteDoc } from 'firebase/firestore';

// const Cart = ({ navigation }) => {
//   const [cartItems, setCartItems] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const unsubscribe = onSnapshot(
//       collection(firestore, 'Cart'),
//       (cartSnapshot) => {
//         const cartList = cartSnapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         }));
//         setCartItems(cartList);
//         setLoading(false); // Stop loading once data is fetched
//       },
//       (error) => {
//         console.error('Error fetching cart items:', error);
//         setLoading(false); // Stop loading on error
//       }
//     );

//     // Cleanup subscription on unmount
//     return () => unsubscribe();
//   }, []);

//   const handleRemoveItem = async (id) => {
//     try {
//       await deleteDoc(doc(firestore, 'Cart', id));
//     } catch (error) {
//       console.error('Error removing item: ', error);
//     }
//   };

//   // Calculate total number of items, total quantity, and total amount
//   const totalItems = cartItems.length;
//   const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
//   const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

//   if (loading) {
//     return <ActivityIndicator size="large" color="#FF4500" />;
//   }

//   return (
//     <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
//       <View style={{ flex: 1, padding: 16 }}>
//         {cartItems.length === 0 ? (
//           <Text style={styles.emptyText}>Your cart is empty!</Text>
//         ) : (
//           <>
//             <FlatList
//               data={cartItems}
//               keyExtractor={(item) => item.id}
//               renderItem={({ item }) => (
//                 <View style={styles.itemContainer}>
//                   <Text style={styles.itemText}>Name: {item.name}</Text>
//                   <Text style={styles.itemText}>Price: ₹{item.price}</Text>
//                   <Text style={styles.itemText}>Quantity: {item.quantity}</Text>
//                   <TouchableOpacity
//                     style={styles.removeButton}
//                     onPress={() => handleRemoveItem(item.id)}
//                   >
//                     <Text style={styles.removeButtonText}>Remove</Text>
//                   </TouchableOpacity>
//                 </View>
//               )}
//             />

//             {/* Display total items, quantity, and amount */}
//             <View style={styles.summaryContainer}>
//               <Text style={styles.summaryText}>Total Items: {totalItems}</Text>
//               <Text style={styles.summaryText}>Total Quantity: {totalQuantity}</Text>
//               <Text style={styles.summaryText}>Total Amount: ₹{totalAmount.toFixed(2)}</Text>
//             </View>

//             {/* "Proceed" Button */}
//             <TouchableOpacity
//               style={styles.proceedButton}
//               onPress={() => navigation.navigate('Payment')} // Navigate to Payment.js
//             >
//               <Text style={styles.proceedButtonText}>Proceed</Text>
//             </TouchableOpacity>
//           </>
//         )}
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   itemContainer: {
//     padding: 16,
//     marginVertical: 8,
//     backgroundColor: '#f9f9f9',
//     borderRadius: 8,
//   },
//   itemText: {
//     fontSize: 16,
//   },
//   removeButton: {
//     marginTop: 10,
//     backgroundColor: 'black',
//     padding: 10,
//     borderRadius: 5,
//     alignItems: 'center',
//   },
//   removeButtonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   emptyText: {
//     fontSize: 18,
//     textAlign: 'center',
//     marginTop: 20,
//   },
//   summaryContainer: {
//     padding: 16,
//     backgroundColor: '#f0f0f0',
//     borderRadius: 8,
//     marginTop: 16,
//   },
//   summaryText: {
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   proceedButton: {
//     backgroundColor: 'black',
//     padding: 15,
//     borderRadius: 5,
//     alignItems: 'center',
//     marginVertical: 20,
//   },
//   proceedButtonText: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
// });

// export default Cart;


import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { firestore } from '../utils/firebase';
import { collection, onSnapshot, doc, deleteDoc } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native'; // For navigation

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalAmount, setTotalAmount] = useState(0); // To track the total amount
  const [totalQuantity, setTotalQuantity] = useState(0); // To track total quantity
  const [totalItems, setTotalItems] = useState(0); // To track total distinct items
  const navigation = useNavigation(); // Navigation hook

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
    }
  };

  const handleProceed = () => {
    navigation.navigate('Payment', { totalAmount }); // Navigate to Payment and pass totalAmount
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
