import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Payment = ({ route }) => {
  const { totalAmount } = route.params; 

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Payment Page</Text>
      <Text style={styles.amountText}>Total Amount: ₹{totalAmount}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f8f8f8",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  amountText: {
    fontSize: 20,
  },
});

export default Payment;
