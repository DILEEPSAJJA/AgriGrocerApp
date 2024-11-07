import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomerHome from './CustomerHome'; // Example screen
import Myorders from './Myorders';
import Offers from './Offers';
import Profile from './Profile';
import Logout from './Logout';
import Cart from './Cart'; 

const Drawer = createDrawerNavigator();

const CustomerDashboard = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerStyle: {
          backgroundColor: '#e6e6e6',
          width: 250,
        },
        drawerLabelStyle: {
          fontSize: 18,
        },
        drawerActiveTintColor: '#fff',
        drawerInactiveTintColor: '#000',
        drawerActiveBackgroundColor: '#000',
        drawerInactiveBackgroundColor: '#e6e6e6',
      }}
    >
      <Drawer.Screen
        name="CustomerHome"
        component={CustomerHome}
        options={{
          drawerIcon: ({ color }) => <Icon name="home-outline" size={22} color={color} />,
        }}
      />
      <Drawer.Screen
        name="Offers"
        component={Offers}
        options={{
          drawerIcon: ({ color }) => <Icon name="tag-outline" size={22} color={color} />,
        }}
      />
      <Drawer.Screen
        name="My Orders"
        component={Myorders}
        options={{
          drawerIcon: ({ color }) => <Icon name="package-variant-closed" size={22} color={color} />,
        }}
      />
      <Drawer.Screen
        name="Cart"
        component={Cart}
        options={{
          drawerIcon: ({ color }) => <Icon name="cart-outline" size={22} color={color} />,
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={Profile}
        options={{
          drawerIcon: ({ color }) => <Icon name="account-outline" size={22} color={color} />,
        }}
      />
      <Drawer.Screen
        name="Logout"
        component={Logout}
        options={{
          drawerIcon: ({ color }) => <Icon name="logout" size={22} color={color} />,
        }}
      />
    </Drawer.Navigator>
  );
};

export default CustomerDashboard;
