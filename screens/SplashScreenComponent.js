// screens/SplashScreenComponent.js
import React from 'react';
import AppIntroSlider from 'react-native-app-intro-slider';
import { View, Text, Image, StyleSheet, Button } from 'react-native';

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
    image: require('../assets/splash1.png'),
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
          <Button style={styles.btn}
            title="Get Started"
            onPress={() => navigation.navigate('Login')}
          />
        )}
      </View>
    );
  };

  const _onDone = () => {
    navigation.navigate('Login');
  };

  return (
    <AppIntroSlider
      renderItem={_renderItem}
      data={slides}
      onDone={_onDone}
      showSkipButton
      onSkip={_onDone}
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
  position: 'absolute',
  bottom: 20,
  right: 20,
  width: 56,
  height: 56,
  borderRadius: 28,
  backgroundColor: '#000', // Black background color
  alignItems: 'center',
  justifyContent: 'center',
  elevation: 5, 
  shadowColor: '#000', 
  shadowOffset: { width: 0, height: 2 }, // iOS shadow offset
  shadowOpacity: 0.2, // iOS shadow opacity
  shadowRadius: 4, // iOS shadow radius
},
btnText: {
  color: '#fff', // White text color
  fontSize: 16, // Font size for the text
  fontWeight: 'bold', // Font weight for emphasis
},
});
