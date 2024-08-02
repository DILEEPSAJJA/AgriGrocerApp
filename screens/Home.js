import React from "react";
import { View, Text, StyleSheet, Button, Image } from "react-native";
// import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";

const Home = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();

  const handleProfilePress = () => {
    navigation.navigate("Profile");
  };

  return (
    <View style={styles.container}>
      <Image
        // source={require("../assets/home-banner.png")}
        style={styles.banner}
      />
      <Text style={styles.title}>{t("Welcome to MyApp!")}</Text>
      <Text style={styles.subtitle}>{t("Your one-stop solution for all your needs.")}</Text>
      <Button title={t("Go to Profile")} onPress={handleProfilePress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  banner: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "gray",
    marginBottom: 20,
    textAlign: "center",
  },
});

export default Home;
