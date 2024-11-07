import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View, Text, FlatList, Image, TouchableOpacity, Linking, Modal, Pressable } from 'react-native';

// Import images
import img1 from '../assets/1f.jpeg';
import img2 from '../assets/2f.webp';
import img3 from '../assets/3f.jpg';
import img4 from '../assets/4f.jpeg';
import img5 from '../assets/5f.webp';
import img6 from '../assets/6f.webp';
import img7 from '../assets/7f.jpg';
import img8 from '../assets/8f.jpg';
// import img9 from '../assets/9f.jpg';
import img10 from '../assets/10f.jpeg';

// Static data for farmer schemes
const farmerSchemes = [
  {
    id: '1',
    title: 'Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)',
    description: 'Financial support scheme for small and marginal farmers to promote stable income and reduce poverty in rural areas.',
    detailedDescription: 'PM-KISAN provides eligible farmers with an annual income support of INR 6,000, distributed in three installments. This scheme aims to help farmers manage the costs of agriculture and household needs, especially for small and marginal farmers.',
    image: img1,
    website: 'https://pmkisan.gov.in/',
  },
  {
    id: '2',
    title: 'Soil Health Card Scheme',
    description: 'Encourages sustainable agriculture by providing soil health cards that recommend necessary nutrients.',
    detailedDescription: 'The Soil Health Card Scheme helps farmers understand the nutrient quality of their soil and provides them with recommendations for proper soil treatment. This initiative encourages farmers to reduce excess use of fertilizers, leading to healthier crops and better soil management.',
    image: img2,
    website: 'https://www.shc.gov.in/',
  },
  {
    id: '3',
    title: 'Pradhan Mantri Fasal Bima Yojana',
    description: 'Crop insurance scheme to protect farmers against natural disasters.',
    detailedDescription: 'This insurance scheme safeguards farmers from crop loss due to unexpected natural disasters, pests, and diseases. With low premiums, it aims to reduce the financial impact on farmers and promote sustainable agriculture.',
    image: img3,
    website: 'https://pmfby.gov.in/',
  },
  {
    id: '4',
    title: 'National Agricultural Market (eNAM)',
    description: 'Online trading platform that facilitates direct selling for farmers.',
    detailedDescription: 'eNAM connects farmers directly to buyers nationwide, removing middlemen and ensuring fair prices. It aims to modernize the agricultural supply chain and increase farmers’ access to wider markets.',
    image: img4,
    website: 'https://enam.gov.in/',
  },
  {
    id: '5',
    title: 'Kisan Vikas Patra',
    description: 'Savings scheme that encourages long-term investment for farmers.',
    detailedDescription: 'Kisan Vikas Patra allows farmers to invest their savings securely and get a fixed return. It doubles the investment amount within a set period, providing financial security to farmers in rural areas.',
    image: img5,
    website: 'https://www.indiapost.gov.in/',
  },
  {
    id: '6',
    title: 'Mahatma Gandhi National Rural Employment Guarantee Act (MGNREGA)',
    description: 'Employment guarantee scheme providing 100 days of work per year.',
    detailedDescription: 'Under MGNREGA, the government guarantees 100 days of wage employment for rural households. This scheme provides a safety net for farmers, ensuring that families have access to an additional source of income during non-farming seasons.',
    image: img6,
    website: 'https://nrega.nic.in/',
  },
  {
    id: '7',
    title: 'Pradhan Mantri Gram Sadak Yojana (PMGSY)',
    description: 'Scheme to provide all-weather road connectivity to rural areas.',
    detailedDescription: 'PMGSY improves road access in rural regions, connecting villages to larger towns and cities. This program enhances farmers’ access to markets, schools, and healthcare facilities, promoting economic growth and reducing isolation.',
    image: img7,
    website: 'https://pmgsymis.gov.in/',
  },
  {
    id: '8',
    title: 'Rashtriya Krishi Vikas Yojana (RKVY)',
    description: 'Promotes agricultural investment and development in rural areas.',
    detailedDescription: 'RKVY supports state-specific agricultural projects aimed at increasing farmers’ income. This initiative encourages states to develop projects based on local needs, leading to overall growth in the agricultural sector.',
    image: img8,
    website: 'https://rkvy.nic.in/',
  },
  {
    id: '9',
    title: 'National Livestock Mission',
    description: 'Enhances productivity and profitability in the livestock sector.',
    detailedDescription: 'The National Livestock Mission supports farmers in improving their livestock production. It offers financial aid for animal husbandry and focuses on breeding, feed management, and infrastructure development for the livestock sector.',
    image: img6,
    website: 'https://nlm.gov.in/',
  },
  {
    id: '10',
    title: 'Dairy Processing and Infrastructure Development Fund (DIDF)',
    description: 'Improves dairy sector infrastructure to increase milk production.',
    detailedDescription: 'DIDF provides funding for dairy cooperatives to improve their infrastructure. It aims to enhance milk processing capabilities, create jobs in rural areas, and provide better earnings for dairy farmers.',
    image: img10,
    website: 'https://dairy.nic.in/',
  },
];

const MyOrders = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedScheme, setSelectedScheme] = useState(null);

  const openModal = (scheme) => {
    setSelectedScheme(scheme);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedScheme(null);
  };

  const renderSchemeItem = ({ item }) => (
    <TouchableOpacity
      style={styles.schemeItem}
      onPress={() => openModal(item)}
      activeOpacity={0.8}
    >
      <Image source={item.image} style={styles.schemeImage} />
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
      {selectedScheme && (
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={closeModal}
        >
          <Pressable style={styles.modalOverlay} onPress={closeModal}>
            <View style={styles.modalContent}>
              <Image source={selectedScheme.image} style={styles.modalImage} />
              <Text style={styles.modalTitle}>{selectedScheme.title}</Text>
              <Text style={styles.modalDescription}>{selectedScheme.detailedDescription}</Text>
              <TouchableOpacity
                style={styles.visitButton}
                onPress={() => Linking.openURL(selectedScheme.website)}
              >
                <Text style={styles.visitButtonText}>Visit Site</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={closeModal}
              >
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </Pressable>
        </Modal>
      )}
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: 320,
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 15,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  modalDescription: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  visitButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 10,
  },
  visitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  closeButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#FF6347',
  },
  closeButtonText: {
    color: '#FF6347',
    fontSize: 16,
  },
});

export default MyOrders;
