import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import SplashScreenComponent from './screens/SplashScreenComponent';
import FarmerDashboard from './screens/FarmerDashboard';
import OrganisationDashboard from './screens/OrganizationDashboard';
import CustomerDashboard from './screens/CustomerDashboard';
import { auth, firestore } from './utils/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import Toast from 'react-native-toast-message';

const Stack = createStackNavigator();

const App = () => {
  const [initialRoute, setInitialRoute] = useState('Splash');

  useEffect(() => {
    const checkUser = async () => {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          const userDoc = await firestore.doc(`Users/${user.uid}`).get();
          if (userDoc.exists) {
            const userData = userDoc.data();
            await AsyncStorage.setItem('userRole', userData.role);

            switch (userData.role) {
              case 'customer':
                setInitialRoute('CustomerDashboard');
                break;
              case 'farmer':
                setInitialRoute('FarmerDashboard');
                break;
              case 'organization':
                setInitialRoute('OrganisationDashboard');
                break;
              default:
                setInitialRoute('Login');
            }
          } else {
            setInitialRoute('Login');
          }
        } else {
          setInitialRoute('Login');
        }
      });
    };
    checkUser();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={initialRoute}
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Splash" component={SplashScreenComponent} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="FarmerDashboard" component={FarmerDashboard} />
        <Stack.Screen name="OrganizationDashboard" component={OrganisationDashboard} />
        <Stack.Screen name="CustomerDashboard" component={CustomerDashboard} />
      </Stack.Navigator>
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </NavigationContainer>
  );
};

export default App;
