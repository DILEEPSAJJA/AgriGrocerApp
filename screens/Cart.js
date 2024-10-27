<<<<<<< HEAD
import React from "react";
=======
import React, { useEffect, useState } from 'react';
>>>>>>> parent of a174bc7 (Feat: Customer Module Completed.)
import {
  View,
  Text,
  Image,
  StyleSheet,
<<<<<<< HEAD
  SafeAreaView,
  ScrollView,
  TouchableHighlight,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import CartContext from "../context/cartContext";
import { sizes, colors } from "../constants/Theme";
import { items } from "../data";
import { RectButton, BorderlessButton } from "react-native-gesture-handler";

export default class Cart extends React.Component {
  static navigationOptions = {
    headerStyle: { backgroundColor: "#FF4500", height: 60 },
    title: "Cart",
    headerTintColor: "white",
  };

  goToItem = (_id, _quantity) => {
    let _items = [];
    _items = items.filter(item => item.id === _id);
    _items[0].quantity = _quantity;
    this.props.navigation.navigate("ItemDetails", {
      item: _items[0],
      msg: "Update",
    });
  };

  render() {
    const { navigation } = this.props;
    return (
      <CartContext.Consumer>
        {cart => {
          return (
            <SafeAreaView style={{ flex: 1, backgroundColor: colors.gray }}>
              {(!cart.cartItems || cart.cartItems.length === 0) ? (
                <View style={styles.emptyCartContainer}>
                  <Text style={styles.emptyCartText}>
                    No items in the cart
                  </Text>
                </View>
              ) : (
                <ScrollView>
                  {cart.cartItems && cart.cartItems.map(item => {
                    return (
                      <View key={item.id} style={styles.cartItems}>
                        <Image style={styles.image} source={item.image} />
                        <View style={{ flex: 1 }}>
                          <Text style={styles.title}>
                            {item.name.slice(0, 10)}...
                          </Text>
                          <Text style={styles.text}>
                            Quantity - {item.quantity}
                          </Text>
                        </View>
                        <TouchableHighlight
                          style={{ ...styles.button }}
                          onPress={() => this.goToItem(item.id, item.quantity)}
                        >
                          <BorderlessButton>
                            <Icon
                              name="ios-eye"
                              size={30}
                              style={{
                                marginRight: 10,
                                textAlign: "right",
                              }}
                            />
                          </BorderlessButton>
                        </TouchableHighlight>
                        <TouchableHighlight
                          style={{ ...styles.button }}
                          onPress={() => cart.removeItemFromCart(item.id)}
                        >
                          <BorderlessButton>
                            <Icon
                              name="ios-trash"
                              size={30}
                              style={{
                                marginRight: 10,
                                textAlign: "right",
                              }}
                            />
                          </BorderlessButton>
                        </TouchableHighlight>
                      </View>
                    );
                  })}
                </ScrollView>
              )}
              {cart.cartItems && cart.cartItems.length > 0 && (
                <View
                  style={{
                    borderTopWidth: 1,
                    paddingTop: 10,
                    borderTopColor: "#BBBBBB",
                    paddingHorizontal: 20,
                    paddingBottom: 10,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "bold",
                    }}
                  >
                    Sub Total: $
                    {cart.cartItems.reduce((count, curItem) => {
                      return count + (curItem.quantity || 0);
                    }, 0)}
                  </Text>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "bold",
                    }}
                  >
                    Convenience Fee: $20
                  </Text>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "bold",
                    }}
                  >
                    Total: $
                    {cart.cartItems.reduce((count, curItem) => {
                      return count + curItem.price * curItem.quantity;
                    }, 20)}
                  </Text>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "bold",
                    }}
                  >
                    Total Quantity:{" "}
                    {cart.cartItems.reduce((count, curItem) => {
                      return count + (curItem.quantity || 0);
                    }, 0)}
                  </Text>
                </View>
              )}
            </SafeAreaView>
          );
        }}
      </CartContext.Consumer>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    paddingHorizontal: sizes.padding,
=======
} from 'react-native';
import { firestore } from '../utils/firebase'; // Adjust the path if necessary
import { collection, onSnapshot } from 'firebase/firestore';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(firestore, 'Cart'), (cartSnapshot) => {
      const cartList = cartSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCartItems(cartList);
      setLoading(false); // Stop loading once data is fetched
    }, (error) => {
      console.error("Error fetching cart items:", error);
      setLoading(false); // Stop loading on error
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#FF4500" />;
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={{ flex: 1, padding: 16 }}>
        {cartItems.length === 0 ? (
          <Text style={styles.emptyText}>Your cart is empty!</Text>
        ) : (
          <FlatList
            data={cartItems}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <View style={styles.itemContainer}>
                <Text style={styles.itemText}>Name: {item.name}</Text>
                <Text style={styles.itemText}>Price: ₹{item.price}</Text>
                <Text style={styles.itemText}>Quantity: {item.quantity}</Text>
              </View>
            )}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    padding: 16,
    marginVertical: 8,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
>>>>>>> parent of a174bc7 (Feat: Customer Module Completed.)
  },
  text: {
    paddingHorizontal: sizes.padding,
  },
<<<<<<< HEAD
  image: {
    width: 80,
    height: 80,
  },
  cartItems: {
    flex: 1,
    flexDirection: "row",
    paddingHorizontal: 20,
    marginTop: 20,
  },
  emptyCartContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyCartText: {
    fontSize: sizes.title,
    fontWeight: "bold",
    textAlign: "center",
  },
});
=======
  emptyText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default Cart;



// import React from "react";
// import {
//   View,
//   Text,
//   Image,
//   StyleSheet,
//   SafeAreaView,
//   ScrollView,
//   TouchableHighlight,
// } from "react-native";
// import Icon from "react-native-vector-icons/Ionicons";
// import CartContext from "../context/cartContext";
// import { sizes, colors } from "../constants/Theme";
// import { items } from "../data";
// import { RectButton, BorderlessButton } from "react-native-gesture-handler";

// export default class Cart extends React.Component {
//   static navigationOptions = {
//     headerStyle: { backgroundColor: "#FF4500", height: 60 },
//     title: "Cart",
//     headerTintColor: "white",
//   };

//   goToItem = (_id, _quantity) => {
//     let _items = [];
//     _items = items.filter(item => item.id === _id);
//     _items[0].quantity = _quantity;
//     this.props.navigation.navigate("ItemDetails", {
//       item: _items[0],
//       msg: "Update",
//     });
//   };

//   render() {
//     const { navigation } = this.props;
//     return (
//       <CartContext.Consumer>
//         {cart => {
//           return (
//             <SafeAreaView style={{ flex: 1, backgroundColor: colors.gray }}>
//               {(!cart.cartItems || cart.cartItems.length === 0) ? (
//                 <View style={styles.emptyCartContainer}>
//                   <Text style={styles.emptyCartText}>
//                     No items in the cart
//                   </Text>
//                 </View>
//               ) : (
//                 <ScrollView>
//                   {cart.cartItems && cart.cartItems.map(item => {
//                     return (
//                       <View key={item.id} style={styles.cartItems}>
//                         <Image style={styles.image} source={item.image} />
//                         <View style={{ flex: 1 }}>
//                           <Text style={styles.title}>
//                             {item.name.slice(0, 10)}...
//                           </Text>
//                           <Text style={styles.text}>
//                             Quantity - {item.quantity}
//                           </Text>
//                         </View>
//                         <TouchableHighlight
//                           style={{ ...styles.button }}
//                           onPress={() => this.goToItem(item.id, item.quantity)}
//                         >
//                           <BorderlessButton>
//                             <Icon
//                               name="ios-eye"
//                               size={30}
//                               style={{
//                                 marginRight: 10,
//                                 textAlign: "right",
//                               }}
//                             />
//                           </BorderlessButton>
//                         </TouchableHighlight>
//                         <TouchableHighlight
//                           style={{ ...styles.button }}
//                           onPress={() => cart.removeItemFromCart(item.id)}
//                         >
//                           <BorderlessButton>
//                             <Icon
//                               name="ios-trash"
//                               size={30}
//                               style={{
//                                 marginRight: 10,
//                                 textAlign: "right",
//                               }}
//                             />
//                           </BorderlessButton>
//                         </TouchableHighlight>
//                       </View>
//                     );
//                   })}
//                 </ScrollView>
//               )}
//               {cart.cartItems && cart.cartItems.length > 0 && (
//                 <View
//                   style={{
//                     borderTopWidth: 1,
//                     paddingTop: 10,
//                     borderTopColor: "#BBBBBB",
//                     paddingHorizontal: 20,
//                     paddingBottom: 10,
//                   }}
//                 >
//                   <Text
//                     style={{
//                       fontSize: 18,
//                       fontWeight: "bold",
//                     }}
//                   >
//                     Sub Total: $
//                     {cart.cartItems.reduce((count, curItem) => {
//                       return count + (curItem.quantity || 0);
//                     }, 0)}
//                   </Text>
//                   <Text
//                     style={{
//                       fontSize: 18,
//                       fontWeight: "bold",
//                     }}
//                   >
//                     Convenience Fee: $20
//                   </Text>
//                   <Text
//                     style={{
//                       fontSize: 18,
//                       fontWeight: "bold",
//                     }}
//                   >
//                     Total: $
//                     {cart.cartItems.reduce((count, curItem) => {
//                       return count + curItem.price * curItem.quantity;
//                     }, 20)}
//                   </Text>
//                   <Text
//                     style={{
//                       fontSize: 18,
//                       fontWeight: "bold",
//                     }}
//                   >
//                     Total Quantity:{" "}
//                     {cart.cartItems.reduce((count, curItem) => {
//                       return count + (curItem.quantity || 0);
//                     }, 0)}
//                   </Text>
//                 </View>
//               )}
//             </SafeAreaView>
//           );
//         }}
//       </CartContext.Consumer>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   title: {
//     fontSize: 20,
//     paddingHorizontal: sizes.padding,
//   },
//   text: {
//     paddingHorizontal: sizes.padding,
//   },
//   image: {
//     width: 80,
//     height: 80,
//   },
//   cartItems: {
//     flex: 1,
//     flexDirection: "row",
//     paddingHorizontal: 20,
//     marginTop: 20,
//   },
//   emptyCartContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   emptyCartText: {
//     fontSize: sizes.title,
//     fontWeight: "bold",
//     textAlign: "center",
//   },
// });


>>>>>>> parent of a174bc7 (Feat: Customer Module Completed.)
