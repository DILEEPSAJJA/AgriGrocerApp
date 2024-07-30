import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import ProductDetails from './src/screens/ProductDetailsScreen';
import Cart from './src/screens/CartScreen';
import Checkout from './src/screens/Checkout';
import SubsidySchemes from './src/screens/SubsidySchemes';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="ProductDetails" component={ProductDetails} />
        <Stack.Screen name="Cart" component={Cart} />
        <Stack.Screen name="Checkout" component={Checkout} />
        <Stack.Screen name="SubsidySchemes" component={SubsidySchemes} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
