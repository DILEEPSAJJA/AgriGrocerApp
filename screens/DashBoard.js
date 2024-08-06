import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
//import { useTranslation } from 'react-i18next';
import CustomDrawerContent from './CustomDrawerContent';
//import Home from './Home';
//import Logout from './Logout';
import FarmerDashboard from './FarmerDashboard';
import OrganisationDashboard from './OrganizationDashboard';
import CustomerDashboard from './CustomerDashboard';

const Drawer = createDrawerNavigator();

const Dashboard = () => {
  const { t } = useTranslation();

  return (
    <SafeAreaView style={styles.safeArea}>
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
        {/* Common Screen */}
        <Drawer.Screen
          name={t('Home')}
          component={Home}
          options={{
            drawerIcon: ({ color }) => <Icon name="home-outline" size={22} color={color} />,
          }}
        />
        <Drawer.Screen
          name={t('Logout')}
          component={Logout}
          options={{
            drawerIcon: ({ color }) => <Icon name="logout" size={22} color={color} />,
          }}
        />

        {/* Conditional Screens based on User Role */}
        <Drawer.Screen
          name={t('FarmerDashboard')}
          component={FarmerDashboard}
          options={{
            drawerIcon: ({ color }) => <Icon name="tractor" size={22} color={color} />,
            // Assuming this screen should only be visible for 'farmer' role
            drawerItemStyle: { display: userRole === 'farmer' ? 'flex' : 'none' },
          }}
        />
        <Drawer.Screen
          name={t('OrganisationDashboard')}
          component={OrganisationDashboard}
          options={{
            drawerIcon: ({ color }) => <Icon name="domain" size={22} color={color} />,
            // Assuming this screen should only be visible for 'organization' role
            drawerItemStyle: { display: userRole === 'organization' ? 'flex' : 'none' },
          }}
        />
        <Drawer.Screen
          name={t('CustomerDashboard')}
          component={CustomerDashboard}
          options={{
            drawerIcon: ({ color }) => <Icon name="account-group" size={22} color={color} />,
            // Assuming this screen should only be visible for 'customer' role
            drawerItemStyle: { display: userRole === 'customer' ? 'flex' : 'none' },
          }}
        />
      </Drawer.Navigator>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});

export default Dashboard;
