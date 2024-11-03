
// import React from 'react';
// import { StyleSheet, Text , View,Button, Alert } from 'react-native';
// import RazorpayCheckout from 'react-native-razorpay';

// export default function App(){
//     const handlePayment = () => {
//         const options = {
//             description: "sample payment",
//             currency: "INR",
//             key: "",
//             name: "AgriGrocer",
//             prefill: {
//                 email: "user@example.com",
//                 contact: "7981305975",
//                 name: "Dileep Sajja",
//             },
//             theme: { color: "black" },
//         };

//         RazorpayCheckout.open(options)
//             .then((data) => {
//                 Alert.alert(`Success: ${data.razorpay_payment_id}`);
//             })
//             .catch((error) => {
//                 Alert.alert(`Error: ${error.code} / ${error.description}`);
//             });
//     };

// }