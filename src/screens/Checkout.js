import React from 'react';
import { View, Text, Button } from 'react-native';

const Checkout = ({ navigation }) => {
  const { confirmPayment } = useStripe();

  const handlePayment = async () => {
    // Implement Stripe payment logic here
  };

  return (
    <View>
      <Text>Checkout</Text>
      <Button title="Pay Now" onPress={handlePayment} />
    </View>
  );
};

export default Checkout;
