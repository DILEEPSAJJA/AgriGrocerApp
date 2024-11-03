import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FarmerHome from './FarmerHome'; // Example screen
import WareHouse from './WareHouse';
import Profile from './Profile';
import Schemes from './Schemes';
import Logout from './Logout'; // Assume you have this screen
import CustomDrawerContent from './CustomDrawerContent'; // Adjust the import path as needed

const Drawer = createDrawerNavigator();

const FarmerDashboard = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
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
        name="FarmerHome"
        component={FarmerHome}
        options={{
          drawerIcon: ({ color }) => <Icon name="home-outline" size={22} color={color} />,
        }}
      />
      <Drawer.Screen
        name="WareHouse"
        component={WareHouse}
        options={{
          drawerIcon: ({ color }) => <Icon name="warehouse" size={22} color={color} />,
        }}
      />
       <Drawer.Screen
        name="Schemes"
        component={Schemes}
        options={{
          drawerIcon: ({ color }) => <Icon name="sitemap" size={22} color={color} />,
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

export default FarmerDashboard;
