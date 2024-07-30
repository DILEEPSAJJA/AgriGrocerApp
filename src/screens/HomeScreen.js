import React from 'react';
import { View, Text, Button } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View>
      <Text>Home Screen</Text>
      <Button
        title="Go to Product Details"
        onPress={() => navigation.navigate('ProductDetails')}
      />
    </View>
  );
};

export default HomeScreen;
