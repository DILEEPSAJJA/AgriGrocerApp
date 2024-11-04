import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { WebView } from 'react-native-webview';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';

const Payment = ({ route }) => {
  const { totalAmount } = route.params || { totalAmount: 5000 };
  const [paymentUrl, setPaymentUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    initializePayment();
  }, []);

  const initializePayment = () => {
    const razorpayKey = 'rzp_test_4mTemu0SvyMbaX'; // Replace with your Razorpay key
    const amountInPaise = totalAmount * 100;
    const checkoutUrl = `https://api.razorpay.com/v1/checkout/embedded?key_id=${razorpayKey}&amount=${amountInPaise}&name=AgriGrocer&description=Payment for order&prefill[email]=user@example.com&prefill[contact]=9191919191`;

    setPaymentUrl(checkoutUrl);
    setLoading(false);
  };

  const handlePaymentSuccess = () => {
    Toast.show({
      type: 'success',
      text1: 'Order Placed',
      text2: 'Thank you for your payment!',
    });
    navigation.navigate('MyOrders'); // Navigate to MyOrders.js
  };

  const handlePaymentFailure = () => {
    Alert.alert('Payment Failed', 'Please try again.');
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#FF4500" style={styles.loader} />;
  }

  return (
    <View style={styles.container}>
      {paymentUrl ? (
        <WebView
          source={{ uri: paymentUrl }}
          onNavigationStateChange={(navState) => {
            if (navState.url.includes('success')) {
              handlePaymentSuccess();
            } else if (navState.url.includes('failure')) {
              handlePaymentFailure();
            }
          }}
          style={styles.webview}
        />
      ) : (
        <Text style={styles.errorText}>Error loading payment page.</Text>
      )}
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
  },
  webview: {
    flex: 1,
  },
  errorText: {
    textAlign: 'center',
    fontSize: 18,
    color: 'red',
    marginTop: 20,
  },
});

export default Payment;
