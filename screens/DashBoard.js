import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Image,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { MaterialIcons } from "@expo/vector-icons";
import {
  createDrawerNavigator,
  DrawerItemList,
} from "@react-navigation/drawer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTranslation } from "react-i18next";
import Home from "./Home";
import Profile from "./Profile";
import Logout from "./Logout";
import { useNavigation } from "@react-navigation/native";

const Drawer = createDrawerNavigator();

const CustomDrawerContent = (props) => {
  const [userName, setUserName] = useState("");
  const [userPhoneNumber, setUserPhoneNumber] = useState("");
  const { t } = useTranslation();

  useEffect(() => {
    const fetchUserData = async () => {
      const name = await AsyncStorage.getItem("name");
      const phoneNumber = await AsyncStorage.getItem("phoneNumber");
      setUserName(name || t("guest"));
      setUserPhoneNumber(phoneNumber || t("unknown"));
    };

    fetchUserData();
  }, []);

  const navigation = useNavigation();

  const handleProfileNavigation = () => {
    navigation.navigate("Profile");
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.drawerContent}>
        <View style={styles.drawerHeader}>
          <Image source={require("../assets/drawer.png")} style={styles.logo} />
          <Text style={styles.appName}>Agri Grocer</Text>
        </View>
        <ScrollView style={styles.scrollView}>
          <DrawerItemList {...props} />
        </ScrollView>
        <View style={styles.spacer} />
        <TouchableOpacity
          onPress={handleProfileNavigation}
          style={styles.userInfo}
        >
          <Image
            source={require("../assets/avatar.png")}
            style={styles.avatar}
          />
          <View>
            <Text style={styles.userName}>{userName}</Text>
            <Text style={styles.userPhoneNumber}>{userPhoneNumber}</Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const MyApp = () => {
  const { t } = useTranslation();
  return (
    <SafeAreaView style={styles.safeArea}>
      <Drawer.Navigator
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{
          drawerStyle: {
            backgroundColor: "#e6e6e6",
            width: 250,
          },
          drawerLabelStyle: {
            fontSize: 18,
          },
          drawerActiveTintColor: "#fff",
          drawerInactiveTintColor: "#000",
          drawerActiveBackgroundColor: "#000",
          drawerInactiveBackgroundColor: "#e6e6e6",
        }}
      >
        <Drawer.Screen
          name={t("Home")}
          component={Home}
          options={{
            drawerIcon: ({ color }) => (
              <Icon name="home-outline" size={22} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name={t("Profile")}
          component={Profile}
          options={{
            drawerIcon: ({ color }) => (
              <Icon name="account-circle-outline" size={22} color={color} />
            ),
          }}
        />
       
        <Drawer.Screen
          name={t("Logout")}
          component={Logout}
          options={{
            drawerIcon: ({ color }) => (
              <Icon name="logout" size={22} color={color} />
            ),
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
  drawerContent: {
    flex: 1,
    backgroundColor: "transparent",
  },
  drawerHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    paddingLeft: 35,
    backgroundColor: "#f0f0f0",
  },
  logo: {
    width: 60,
    height: 60,
    marginRight: 15,
  },
  appName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000",
  },
  spacer: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    paddingBottom: 18,
    backgroundColor: "#e6e6e6",
    borderTopWidth: 1,
    borderTopColor: "#ccc",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  userPhoneNumber: {
    fontSize: 14,
    color: "gray",
  },
});

export default DashBoard;
