import React from 'react';
import AppIntroSlider from 'react-native-app-intro-slider';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const slides = [
  {
    key: '1',
    title: 'Discover Fresh Produce and Products',
    text: 'Find the best quality products directly from farmers.',
    image: require('../assets/splash1.png'),
  },
  {
    key: '2',
    title: 'Access Market Prices and Trends',
    text: 'Stay updated with real-time market prices and trends.',
    image: require('../assets/splash2.png'),
  },
  {
    key: '3',
    title: 'Find Subsidy Schemes and Support',
    text: 'Get information about various subsidy schemes and support.',
    image: require('../assets/splash3.png'),
    isLast: true, // Add a flag to identify the last slide
  },
];

export default function SplashScreenComponent({ navigation }) {
  const _renderItem = ({ item }) => {
    return (
      <View style={styles.slide}>
        <Text style={styles.title}>{item.title}</Text>
        <Image source={item.image} style={styles.image} />
        <Text style={styles.text}>{item.text}</Text>
        {item.isLast && (
          <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Login')}>
            <Text style={styles.btnText}>Register</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  const _onDone = () => {
    navigation.navigate('Login');
  };

  const renderSkipButton = () => {
    return (
      <View style={styles.buttonContainer}>
        <Text style={styles.buttonText}>Skip</Text>
      </View>
    );
  };

  const renderDoneButton = () => {
    return (
      <View style={styles.buttonContainer}>
        <Text style={styles.buttonText}>Done</Text>
      </View>
    );
  };

  return (
    <AppIntroSlider
      renderItem={_renderItem}
      data={slides}
      onDone={_onDone}
      showSkipButton
      onSkip={_onDone}
      renderSkipButton={renderSkipButton}
      renderDoneButton={renderDoneButton}
    />
  );
}

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  text: {
    fontSize: 16,
    color: '#666',
    marginTop: 20,
    textAlign: 'center',
  },
  image: {
    width: 300,
    height: 300,
    marginTop: 20,
  },
  btn: {
    top: 40,
    backgroundColor: '#000',
    padding: 15,
    paddingHorizontal: 105,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  btnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  buttonText: {
    color: '#000', // Change this to your desired text color
    fontSize: 16,
    fontWeight: 'bold',
  },
});
