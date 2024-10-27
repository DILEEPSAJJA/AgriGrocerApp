import React from 'react';
import { SafeAreaView, StyleSheet, View, Text, FlatList, Image, TouchableOpacity, Linking } from 'react-native';

// Static data for farmer schemes
const farmerSchemes = [
  {
    id: '1',
    title: 'Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)',
    description: 'Direct income support to farmers.',
    image: 'https://www.nrcs.usda.gov/wps/PA_NRCSConsumption/download?cid=nrcseprd1393356&ext=jpg', // PM-KISAN Image
    website: 'https://pmkisan.gov.in/',
  },
  {
    id: '2',
    title: 'Soil Health Card Scheme',
    description: 'Promotes sustainable farming through soil testing.',
    image: 'https://i.imgur.com/1AjK2Xh.jpg', // Soil Health Card Image
    website: 'https://www.shc.gov.in/',
  },
  {
    id: '3',
    title: 'Pradhan Mantri Fasal Bima Yojana',
    description: 'Crop insurance scheme for farmers.',
    image: 'https://upload.wikimedia.org/wikipedia/en/thumb/a/a1/PMFBY_Logo.png/220px-PMFBY_Logo.png', // Fasal Bima Yojana Image
    website: 'https://pmfby.gov.in/',
  },
  {
    id: '4',
    title: 'National Agricultural Market (eNAM)',
    description: 'Online trading platform for farmers.',
    image: 'https://upload.wikimedia.org/wikipedia/en/thumb/b/b1/ENAM_Logo.png/220px-ENAM_Logo.png', // eNAM Image
    website: 'https://enam.gov.in/',
  },
  {
    id: '5',
    title: 'Kisan Vikas Patra',
    description: 'Long-term savings scheme for farmers.',
    image: 'https://upload.wikimedia.org/wikipedia/en/thumb/a/a3/Kisan_Vikas_Patra_logo.jpg/220px-Kisan_Vikas_Patra_logo.jpg', // Kisan Vikas Patra Image
    website: 'https://www.indiapost.gov.in/',
  },
  {
    id: '6',
    title: 'Mahatma Gandhi National Rural Employment Guarantee Act (MGNREGA)',
    description: 'Guarantees 100 days of wage employment in a financial year.',
    image: 'https://upload.wikimedia.org/wikipedia/en/thumb/2/2d/MGNREGA_Logo.png/220px-MGNREGA_Logo.png', // MGNREGA Image
    website: 'https://nrega.nic.in/',
  },
  {
    id: '7',
    title: 'Pradhan Mantri Gram Sadak Yojana (PMGSY)',
    description: 'Provides all-weather road connectivity to unconnected villages.',
    image: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/4e/PMGSY_Logo.png/220px-PMGSY_Logo.png', // PMGSY Image
    website: 'https://pmgsymis.gov.in/',
  },
  {
    id: '8',
    title: 'Rastriya Krishi Vikas Yojana (RKVY)',
    description: 'Promotes agricultural development through investment.',
    image: 'https://upload.wikimedia.org/wikipedia/en/thumb/d/db/RKVY_Logo.png/220px-RKVY_Logo.png', // RKVY Image
    website: 'https://rkvy.nic.in/',
  },
  {
    id: '9',
    title: 'National Livestock Mission',
    description: 'Enhances livestock production and productivity.',
    image: 'https://upload.wikimedia.org/wikipedia/en/thumb/d/d0/National_Livestock_Mission.png/220px-National_Livestock_Mission.png', // National Livestock Mission Image
    website: 'https://nlm.gov.in/',
  },
  {
    id: '10',
    title: 'Dairy Processing and Infrastructure Development Fund (DIDF)',
    description: 'Supports the dairy sector by improving infrastructure.',
    image: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/4a/DIDF_Logo.png/220px-DIDF_Logo.png', // DIDF Image
    website: 'https://dairy.nic.in/',
  },
];

const MyOrders = () => {
  const renderSchemeItem = ({ item }) => (
    <TouchableOpacity
      style={styles.schemeItem}
      onPress={() => Linking.openURL(item.website)}
      activeOpacity={0.8} // Add opacity effect on press
    >
      <Image source={{ uri: item.image }} style={styles.schemeImage} />
      <View style={styles.schemeDetails}>
        <Text style={styles.schemeTitle}>{item.title}</Text>
        <Text style={styles.schemeDescription}>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerTitle}>Indian Government Farmer Schemes</Text>
      <FlatList
        data={farmerSchemes}
        renderItem={renderSchemeItem}
        keyExtractor={(item) => item.id}
        style={styles.schemesList}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f8f8f8',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'center',
  },
  schemesList: {
    marginTop: 10,
  },
  schemeItem: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginVertical: 5,
    elevation: 3,
    flexDirection: 'row',
    alignItems: 'center',
  },
  schemeImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 15,
  },
  schemeDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  schemeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  schemeDescription: {
    fontSize: 14,
    color: '#666',
  },
});

export default MyOrders;
