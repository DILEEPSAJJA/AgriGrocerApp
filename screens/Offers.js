import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, View, Text, FlatList, Image } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '../utils/firebase'; // Adjust the import path as needed

const Offers = () => {
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const offersCollection = collection(firestore, 'Offers');
        const offersSnapshot = await getDocs(offersCollection);
        const offersList = offersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setOffers(offersList);
      } catch (error) {
        console.error('Error fetching offers: ', error);
      }
    };

    fetchOffers();
  }, []);

  const renderOfferItem = ({ item }) => (
    <View style={styles.offerItem}>
      <Image source={{ uri: item.image }} style={styles.offerImage} />
      <Text style={styles.offerTitle}>{item.title}</Text>
      <Text style={styles.offerDescription}>{item.description}</Text>
    </View>
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
