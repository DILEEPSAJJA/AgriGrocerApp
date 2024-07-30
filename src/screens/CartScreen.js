import React from 'react';
import { View, Text, Button } from 'react-native';

const Cart = ({ route, navigation }) => {
  const { product } = route.params;

  return (
    <View>
      <Text>Cart Items</Text>
      <Text>{product.name}</Text>
      <Text>{product.price}</Text>
      <Button title="Proceed to Checkout" onPress={() => navigation.navigate('Checkout')} />
    </View>
  );
};

export default Cart;
