import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './screens/LoginScreen';
import HomeScreen from './screens/Home';
import Register from './screens/Register';
import FarmerHome from './screens/FarmerHome';
import OrganizationHome from './screens/OrganizationHome';
import SplashScreenComponent from './screens/SplashScreenComponent'; // Import SplashScreenComponent
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

const Stack = createStackNavigator();

const App = () => {
  const [initialRoute, setInitialRoute] = useState('Splash'); // State for initial route

  useEffect(() => {
    const checkUserRole = async () => {
      // Check if user is logged in and fetch role
      const role = await AsyncStorage.getItem('role');
      if (role) {
        setInitialRoute(role.charAt(0).toUpperCase() + role.slice(1) + 'Home'); // Set home screen based on role
      } else {
        setInitialRoute('Login'); // Default to Login if no role found
      }
    };

    checkUserRole();
  }, []);

  const showToast = () => {
    Toast.show({
      type: 'success',
      position: 'top',
      text1: 'Success',
      text2: 'You have successfully logged in!',
    });
  };

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={initialRoute}
        screenOptions={{ headerShown: false }} // Hide headers for simplicity
      >
        <Stack.Screen name="Splash" component={SplashScreenComponent} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="FarmerHome" component={FarmerHome} />
        <Stack.Screen name="OrganizationHome" component={OrganizationHome} />
      </Stack.Navigator>
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </NavigationContainer>
  );
};

export default App;
