import React from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';

const Banner = ({ width, height, image, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.banner, { width: width || 'auto', height: height || 'auto' }]}>
      <Image source={{ uri: image }} style={styles.image} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  banner: {
    padding: 10,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 14,
  },
});

export default Banner;
