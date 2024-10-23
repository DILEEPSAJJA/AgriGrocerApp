import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'; // Corrected import
import AntDesign from 'react-native-vector-icons/AntDesign'; // Corrected import
import FarmerHome from './FarmerHome';
import WareHouse from './WareHouse';
import Schemes from './Schemes';
import Profile from './Profile';
import Logout from './Logout'; 
import CustomDrawerContent from './CustomDrawerContent'; 

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
          drawerIcon: ({ color }) => (
            <MaterialCommunityIcons name="home-outline" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="WareHouse"
        component={WareHouse}
        options={{
          drawerIcon: ({ color }) => (
            <MaterialCommunityIcons name="warehouse" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Schemes"
        component={Schemes}
        options={{
          drawerIcon: ({ color }) => (
            <AntDesign name="idcard" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={Profile}
        options={{
          drawerIcon: ({ color }) => (
            <MaterialCommunityIcons name="account-outline" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Logout"
        component={Logout}
        options={{
          drawerIcon: ({ color }) => (
            <MaterialCommunityIcons name="logout" size={22} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default FarmerDashboard;
