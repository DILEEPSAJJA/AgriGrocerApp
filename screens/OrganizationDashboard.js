import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Toast from 'react-native-toast-message';
import OrgHome from './OrgHome';
import WareHouse from './WareHouse';
import Profile from './Profile';
import Report from './Report';
import Logout from './Logout';

const Drawer = createDrawerNavigator();

const OrganisationDashboard = () => {
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
        name="OrgHome"
        component={OrgHome}
        options={{
          drawerIcon: ({ color }) => <Icon name="home-outline" size={22} color={color} />,
        }}
      />
      <Drawer.Screen
        name="Report"
        component={Report}
        options={{
          drawerIcon: ({ color }) => <Icon name="Report" size={22} color={color} />,
        }}
      />
      <Drawer.Screen
        name="WareHouse"
        component={WareHouse}
        options={{
          drawerIcon: ({ color }) => <Icon name="WareHouse" size={22} color={color} />,
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

export default OrganisationDashboard;
