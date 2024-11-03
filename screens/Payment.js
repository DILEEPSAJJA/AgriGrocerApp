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
    const razorpayKey = 'rzp_test_GcZZFDPP0jHtC4'; // Replace with your Razorpay key
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
    navigation.navigate('MyOrders');
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
              Alert.alert('Payment Failed', 'Please try again.');
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



// import React from 'react';
// import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
// import RazorpayCheckout from 'react-native-razorpay';

// const Payment = () => {
//   const handlePayment = () => {
//     const options = {
//       description: 'Payment for your order',
//       image: 'https://your-logo-url.com/logo.png',
//       currency: 'INR',
//       key: 'rzp_test_GcZZFDPP0jHtC4', 
//       amount: '5000', 
//       name: 'AgriGrocer',
//       prefill: {
//         email: 'user@example.com',
//         contact: '9191919191',
//         name: 'John Doe',
//       },
//       theme: { color: '#F37254' },
//     };

//     RazorpayCheckout.open(options)
//       .then((data) => {
//         Alert.alert('Success', `Payment successful: ${data.razorpay_payment_id}`);
//       })
//       .catch((error) => {
//         Alert.alert('Error', `Payment failed: ${error.description}`);
//       });
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Payment Page</Text>
//       <TouchableOpacity onPress={handlePayment} style={styles.button}>
//         <Text style={styles.buttonText}>Pay Now</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//     backgroundColor: '#f8f8f8',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   button: {
//     backgroundColor: '#F37254',
//     paddingVertical: 15,
//     paddingHorizontal: 30,
//     borderRadius: 5,
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 18,
//   },
// });

// export default Payment;


// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
// import { WebView } from 'react-native-webview';

// const Payment = ({ route }) => {
//   const { totalAmount } = route.params;
//   const [paymentUrl, setPaymentUrl] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     createPaymentLink();
//   }, []);

//   const createPaymentLink = async () => {
//     try {
//       const response = await fetch('https://localhost:3000/create-payment-link', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ amount: totalAmount * 100 }), // amount in paise
//       });
//       const data = await response.json();
//       setPaymentUrl(data.url);
//       setLoading(false);
//     } catch (error) {
//       console.error('Error creating payment link:', error);
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return <ActivityIndicator size="large" color="#FF4500" style={styles.loader} />;
//   }

//   return (
//     <View style={styles.container}>
//       {paymentUrl ? (
//         <WebView
//           source={{ uri: paymentUrl }}
//           onNavigationStateChange={(navState) => {
//             if (navState.url.includes('payment-success')) {
//               alert('Payment Successful!');
//             } else if (navState.url.includes('payment-failure')) {
//               alert('Payment Failed. Please try again.');
//             }
//           }}
//           style={styles.webview}
//         />
//       ) : (
//         <Text style={styles.errorText}>Error loading payment page.</Text>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f8f8f8',
//   },
//   loader: {
//     flex: 1,
//     justifyContent: 'center',
//   },
//   webview: {
//     flex: 1,
//   },
//   errorText: {
//     textAlign: 'center',
//     fontSize: 18,
//     color: 'red',
//     marginTop: 20,
//   },
// });

// export default Payment;



// import React from "react";
// import { View, Text, StyleSheet } from "react-native";

// const Payment = ({ route }) => {
//   const { totalAmount } = route.params; 

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Payment Page</Text>
//       <Text style={styles.amountText}>Total Amount: ₹{totalAmount}</Text>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     padding: 20,
//     backgroundColor: "#f8f8f8",
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "bold",
//     marginBottom: 20,
//   },
//   amountText: {
//     fontSize: 20,
//   },
// });

// export default Payment;
