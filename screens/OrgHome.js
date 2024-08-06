import React from 'react';
import { SafeAreaView, StyleSheet, View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const OrgHome = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Welcome to Organization Dashboard</Text>
        <Button title="Go to Profile" onPress={() => navigation.navigate('Profile')} />
        {/* Add more buttons or components based on your app's features */}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    width: '80%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 3,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default OrgHome;
