// import React from 'react';
// import { SafeAreaView, StyleSheet, View, Text, FlatList, Image } from 'react-native';

// const offers = [
//   {
//     id: '1',
//     title: 'Fresh Fruits Offer',
//     description: 'Get fresh fruits at a discounted price!',
//     image: require('../assets/images/offer1.jpeg'),
//   },
//   {
//     id: '2',
//     title: 'Vegetables Discount',
//     description: 'Organic vegetables at special prices!',
//     image: require('../assets/images/offer2.jpeg'),
//   },
// ];

// const Offers = () => {
//   const renderOfferItem = ({ item }) => (
//     <View style={styles.offerItem}>
//       <Image source={item.image} style={styles.offerImage} />
//       <Text style={styles.offerTitle}>{item.title}</Text>
//       <Text style={styles.offerDescription}>{item.description}</Text>
//     </View>
//   );

//   return (
//     <SafeAreaView style={styles.container}>
//       <FlatList
//         data={offers}
//         renderItem={renderOfferItem}
//         keyExtractor={(item) => item.id}
//         style={styles.offersList}
//       />
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 10,
//     backgroundColor: '#f8f8f8',
//   },
//   offersList: {
//     marginTop: 10,
//   },
//   offerItem: {
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     padding: 10,
//     marginVertical: 5,
//     elevation: 3,
//   },
//   offerImage: {
//     width: '100%',
//     height: 150,
//     borderRadius: 10,
//     marginBottom: 10,
//     resizeMode: 'cover',
//   },
//   offerTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 5,
//   },
//   offerDescription: {
//     fontSize: 14,
//     color: '#666',
//   },
// });

// export default Offers;

import React from 'react';
import { SafeAreaView, StyleSheet, View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook

const offers = [
  {
    id: '1',
    title: 'Fresh Fruits Offer',
    description: 'Get fresh fruits at a discounted price!',
    image: require('../assets/images/offer1.jpeg'),
  },
  {
    id: '2',
    title: 'Vegetables Discount',
    description: 'Organic vegetables at special prices!',
    image: require('../assets/images/offer2.jpeg'),
  },
];

const Offers = () => {
  const navigation = useNavigation(); // Initialize navigation

  const renderOfferItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('CustomerHome')} // Navigate to CustomerHome on press
    >
      <View style={styles.offerItem}>
        <Image source={item.image} style={styles.offerImage} />
        <Text style={styles.offerTitle}>{item.title}</Text>
        <Text style={styles.offerDescription}>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={offers}
        renderItem={renderOfferItem}
        keyExtractor={(item) => item.id}
        style={styles.offersList}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f8f8f8',
  },
  offersList: {
    marginTop: 10,
  },
  offerItem: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
    elevation: 3,
  },
  offerImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
    resizeMode: 'cover',
  },
  offerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  offerDescription: {
    fontSize: 14,
    color: '#666',
  },
});

export default Offers;
