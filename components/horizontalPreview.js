import React from 'react';
import { ScrollView, View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const HorizontalPreview = ({ title, products }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {products.map((product) => (
          <TouchableOpacity key={product.id} style={styles.productContainer}>
            <Image source={{ uri: product.image }} style={styles.image} />
            <Text style={styles.productTitle}>{product.title}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  productContainer: {
    marginRight: 15,
    width: 120,
  },
  image: {
    width: '100%',
    height: 100,
    borderRadius: 10,
  },
  productTitle: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default HorizontalPreview;
