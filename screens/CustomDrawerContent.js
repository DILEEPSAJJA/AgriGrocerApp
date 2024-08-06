import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Image,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { createDrawerNavigator, DrawerItemList } from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';
//import { useTranslation } from 'react-i18next';
// import Home from './Home';
// import Logout from './Logout';
import FarmerDashboard from './FarmerDashboard';
import OrganisationDashboard from './OrganizationDashboard';
import CustomerDashboard from './CustomerDashboard';

const Drawer = createDrawerNavigator();

const CustomDrawerContent = (props) => {
  const [userName, setUserName] = useState('');
  const [userPhoneNumber, setUserPhoneNumber] = useState('');
  const [userRole, setUserRole] = useState(''); // Added userRole state
  const { t } = useTranslation();

  useEffect(() => {
    const fetchUserData = async () => {
      const name = await AsyncStorage.getItem('name');
      const phoneNumber = await AsyncStorage.getItem('phoneNumber');
      const role = await AsyncStorage.getItem('role'); // Fetch user role
      setUserName(name || t('guest'));
      setUserPhoneNumber(phoneNumber || t('unknown'));
      setUserRole(role || ''); // Set user role
    };

    fetchUserData();
  }, []);

  const navigation = useNavigation();

  const handleProfileNavigation = () => {
    navigation.navigate('ProfileScreen');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.drawerContent}>
        <View style={styles.drawerHeader}>
          {/* <Image source={require('../assets/drawer.png')} style={styles.logo} /> */}
          <Text style={styles.appName}>HelpEZ</Text>
        </View>
        <ScrollView style={styles.scrollView}>
          <DrawerItemList {...props} />
        </ScrollView>
        <View style={styles.spacer} />
        <TouchableOpacity onPress={handleProfileNavigation} style={styles.userInfo}>
          {/* <Image source={require('../assets/avatar.png')} style={styles.avatar} /> */}
          <View>
            <Text style={styles.userName}>{userName}</Text>
            <Text style={styles.userPhoneNumber}>{userPhoneNumber}</Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default CustomDrawerContent;
