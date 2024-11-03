import React, { useEffect } from 'react';
import { View, ActivityIndicator, Alert, StyleSheet } from 'react-native';
import RazorpayCheckout from 'react-native-razorpay';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';

const Payment = ({ route }) => {
  const { totalAmount } = route.params || { totalAmount: 5000 };
  const navigation = useNavigation();

  useEffect(() => {
    initializePayment();
  }, []);

  const initializePayment = () => {
    const amountInPaise = totalAmount * 100;
    const options = {
      description: 'Payment for order',
      image: 'https://your-logo-url.com/logo.png', // Optional
      currency: 'INR',
      key: 'rzp_test_GcZZFDPP0jHtC4', // Replace with your Razorpay key
      amount: amountInPaise, 
      name: 'AgriGrocer',
      prefill: {
        email: 'user@example.com',
        contact: '9191919191',
      },
      theme: { color: '#FF4500' },
    };

    console.log('Initializing payment with options:', options);

    RazorpayCheckout.open(options)
      .then((data) => {
        console.log('Payment Success:', data);
        handlePaymentSuccess();
      })
      .catch((error) => {
        console.log('Payment Error:', error);
        handlePaymentFailure(error);
      });
  };

  const handlePaymentSuccess = () => {
    Toast.show({
      type: 'success',
      text1: 'Order Placed',
      text2: 'Thank you for your payment!',
    });
    navigation.navigate('MyOrders'); // Navigate to MyOrders.js after successful payment
  };

  const handlePaymentFailure = (error) => {
    Alert.alert('Payment Failed', error.description || 'An error occurred. Please try again.');
  };

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#FF4500" style={styles.loader} />
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#f8f8f8',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default Payment;


// import React, { useEffect } from 'react';
// import { View, Text, StyleSheet, ActivityIndicator, Alert } from 'react-native';
// import RazorpayCheckout from 'react-native-razorpay';
// import { useNavigation } from '@react-navigation/native';
// import Toast from 'react-native-toast-message';

// const Payment = ({ route }) => {
//   const { totalAmount } = route.params || { totalAmount: 5000 };
//   const navigation = useNavigation();

//   useEffect(() => {
//     initializePayment();
//   }, []);

//   const initializePayment = () => {
//     const razorpayOptions = {
//       description: 'Payment for order',
//       image: 'https://your-logo-url.com/logo.png',
//       currency: 'INR',
//       key: 'rzp_test_GcZZFDPP0jHtC4', // Replace with your Razorpay key
//       amount: totalAmount * 100, // Amount in paise
//       name: 'AgriGrocer',
//       prefill: {
//         email: 'user@example.com',
//         contact: '9191919191',
//       },
//       theme: { color: '#FF4500' },
//     };

//     RazorpayCheckout.open(razorpayOptions)
//       .then((data) => {
//         // Handle payment success
//         Toast.show({
//           type: 'success',
//           text1: 'Order Placed',
//           text2: 'Thank you for your payment!',
//         });
//         navigation.navigate('MyOrders'); // Navigate to MyOrders.js after successful payment
//       })
//       .catch((error) => {
//         // Handle payment failure
//         Alert.alert('Payment Failed', error.description || 'Please try again.');
//       });
//   };

//   return (
//     <View style={styles.container}>
//       <ActivityIndicator size="large" color="#FF4500" style={styles.loader} />
//       <Toast ref={(ref) => Toast.setRef(ref)} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     backgroundColor: '#f8f8f8',
//   },
//   loader: {
//     flex: 1,
//     justifyContent: 'center',
//   },
// });

// export default Payment;
