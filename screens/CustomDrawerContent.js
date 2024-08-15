// import React, { useEffect, useState } from 'react';
// import {
//   SafeAreaView,
//   StyleSheet,
//   TouchableOpacity,
//   View,
//   Text,
//   Image,
//   ScrollView,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import { createDrawerNavigator, DrawerItemList } from '@react-navigation/drawer';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// //import { useTranslation } from 'react-i18next';
// // import Home from './Home';
// // import Logout from './Logout';
// import FarmerDashboard from './FarmerDashboard';
// import OrganisationDashboard from './OrganizationDashboard';
// import CustomerDashboard from './CustomerDashboard';

// const Drawer = createDrawerNavigator();

// const CustomDrawerContent = (props) => {
//   const [userName, setUserName] = useState('');
//   const [userPhoneNumber, setUserPhoneNumber] = useState('');
//   const [userRole, setUserRole] = useState(''); // Added userRole state
//   const { t } = useTranslation();

//   useEffect(() => {
//     const fetchUserData = async () => {
//       const name = await AsyncStorage.getItem('name');
//       const phoneNumber = await AsyncStorage.getItem('phoneNumber');
//       const role = await AsyncStorage.getItem('role'); // Fetch user role
//       setUserName(name || t('guest'));
//       setUserPhoneNumber(phoneNumber || t('unknown'));
//       setUserRole(role || ''); // Set user role
//     };

//     fetchUserData();
//   }, []);

//   const navigation = useNavigation();

//   const handleProfileNavigation = () => {
//     navigation.navigate('ProfileScreen');
//   };

//   return (
//     <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
//       <View style={styles.drawerContent}>
//         <View style={styles.drawerHeader}>
//           {/* <Image source={require('../assets/drawer.png')} style={styles.logo} /> */}
//           <Text style={styles.appName}>HelpEZ</Text>
//         </View>
//         <ScrollView style={styles.scrollView}>
//           <DrawerItemList {...props} />
//         </ScrollView>
//         <View style={styles.spacer} />
//         <TouchableOpacity onPress={handleProfileNavigation} style={styles.userInfo}>
//           {/* <Image source={require('../assets/avatar.png')} style={styles.avatar} /> */}
//           <View>
//             <Text style={styles.userName}>{userName}</Text>
//             <Text style={styles.userPhoneNumber}>{userPhoneNumber}</Text>
//           </View>
//         </TouchableOpacity>
//       </View>
//     </ScrollView>
//   );
// };

// export default CustomDrawerContent;

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { getDoc, doc } from 'firebase/firestore';
import { auth, firestore } from '../utils/firebase'; // Adjust the import path as needed

const CustomDrawerContent = (props) => {
  const [userName, setUserName] = useState('');
  const [userProfilePic, setUserProfilePic] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const userDoc = await getDoc(doc(firestore, 'Users', user.uid));
          const userData = userDoc.data();
          if (userData) {
            setUserName(userData.name || 'Unknown');
            setUserProfilePic(userData.profilePic || ''); // Assuming 'profilePic' field contains the URL
          }
        }
      } catch (error) {
        console.error('Error fetching user data: ', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.userInfoSection}>
        {userProfilePic ? (
          <Image source={{ uri: userProfilePic }} style={styles.profilePic} />
        ) : (
          <View style={styles.profilePicPlaceholder} />
        )}
        <Text style={styles.userName}>{userName}</Text>
      </View>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  userInfoSection: {
    padding: 20,
    backgroundColor: '#e6e6e6',
    alignItems: 'center',
  },
  profilePic: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  profilePicPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#ccc',
    marginBottom: 10,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CustomDrawerContent;
