import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Payment = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Payment Page</Text>
      {/* Add your payment logic here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default Payment;
