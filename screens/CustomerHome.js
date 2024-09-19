// import React, { useEffect, useState } from 'react';
// import { SafeAreaView, ScrollView, View, Text, TextInput, ActivityIndicator, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import Icon from '@expo/vector-icons/Ionicons';
// import { Ionicons } from '@expo/vector-icons';
// import getApi from '../api/getApi';  // Assuming your API utility
// import Tabs from '../components/tab.js';  // Existing Tab component
// import Preview from '../components/horizontalPreview.js';  // Existing Preview component
// import Banner from '../components/banner.js';  // Existing Banner component
// import s from '../styles/mainStyle.js';
// import Header from '../components/Header.js';

// const { width } = Dimensions.get('window');

// const CustomerHome = () => {
//   const navigation = useNavigation();
  
//   // States for products and categories
//   const [product, setProduct] = useState([]);
//   const [allProduct, setAllProduct] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [popcat, setPopCat] = useState([
//     {"id": 0, "name": "All", "icon": "building-o", "colors": "#155C9E"},
//     {"id": 1, "name": "Men's Clothing", "icon": "tshirt", "colors": "#155C9E"},
//     {"id": 2, "name": "Women's Clothing", "icon": "mobile", "colors": "#155C9E"},
//     {'id': 3, 'name': 'Electronics', 'icon': 'desktop', 'colors': "#d4d4d4"},
//     {"id": 4, "name": "Jewelery", "icon": "cogs", "colors": "#155C9E"},
//   ]);
//   const [activeCat, setActiveCat] = useState("All");

//   // Fetch products by category
//   const getProduct = (category) => {
//     const url = category === 'All' ? `https://fakestoreapi.com/products?limit=15` : `https://fakestoreapi.com/products/category/${category.toLowerCase()}?limit=5`;
//     getApi(url, 'GET')
//       .then(json => {
//         setProduct(json);
//         setIsLoading(false);
//       })
//       .catch(e => setIsLoading(false));
//   };

//   // Initial fetch on component mount
//   useEffect(() => {
//     getProduct('All');  // Fetch all products initially
//   }, []);

//   const categorySearch = (category) => {
//     setIsLoading(true);
//     setActiveCat(category);
//     getProduct(category);
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <ScrollView>
//         <View style={styles.header}>
//           <View style={styles.searchContainer}>
//           <Ionicons name="search-outline" size={24} color="black" />
//             <TextInput
//               placeholder='Search for products'
//               style={styles.searchInput}
//             />
//           </View>
//           <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
//             <Icon name="cart" size={32} />
//           </TouchableOpacity>
//         </View>

//         {/* Loading Indicator */}
//         {isLoading ? (
//           <View style={[s.fl1,s.tocnt,s.mgtp20]}>
//             <ActivityIndicator size={'medium'} />
//           </View>
//         ) : (
//           <>
//             {/* Banner and Tabs */}
//             <Banner width="100%" height={150} image="https://www.shutterstock.com/search/big-sale-banner" />
//             <Tabs
//               data={popcat}
//               bgcolor="transparent"
//               tabVal={activeCat}
//               settabData={categorySearch}
//             />

//             {/* Product Previews */}
//             <Preview title="Flash Sale" products={product} />
//             <Banner width="100%" height={150} image='https://www.alamy.com/stock-photo/sale-banner.html' />
//             <Preview title="Recently Viewed" products={product} />
//           </>
//         )}
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f5f5f5',
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     padding: 8,
//     backgroundColor: '#fff',
//     elevation: 3,
//     paddingLeft: 20,
//   },
//   searchContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#e6e6e6',
//     borderRadius: 20,
//     paddingHorizontal: 10,
//     width: width * 0.85,
//   },
//   searchInput: {
//     marginLeft: 10,
//     fontSize: 16,
//     flex: 1,
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 20,
//   },
// });

// export default CustomerHome;

import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Platform,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from '@expo/vector-icons/Ionicons';
import { items } from "../data";
import { colors, sizes, fonts } from "../constants/Theme";
import { RectButton, BorderlessButton } from "react-native-gesture-handler";
import Category from "../components/Category";
import Item from "../components/Item";

const { width, height } = Dimensions.get("window");

export default class Home extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerStyle: { backgroundColor: "#FF4500", height: 60 },
      title: "BDStore",
      headerTintColor: "white",
      headerRight: (
        <BorderlessButton
          onPress={() => navigation.navigate("Search")}
          style={{ flex: 1 }}
        >
          <Icon
            name="ios-search"
            size={sizes.search_icon}
            style={{ marginRight: 10, color: colors.white, textAlign: "right" }}
          />
        </BorderlessButton>
      ),
    };
  };

  state = {
    items: [],
  };

  componentDidMount() {
    this.setState({ items });
  }

  componentWillMount() {
    this.startHeaderHeight = 80;
    if (Platform.OS === "android") {
      this.startHeaderHeight = 70 + StatusBar.currentHeight;
    }
  }

  render() {
    const { navigation } = this.props;
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.gray }}>
        <View style={{ flex: 1 }}>
          <ScrollView scrollEventThrottle={16}>
            <View
              style={{
                flex: 1,
                backgroundColor: colors.gray,
                paddingTop: sizes.padding,
              }}
            >
              <Text
                style={{
                  fontSize: sizes.title,
                  fontWeight: "700",
                  paddingHorizontal: sizes.padding,
                }}
              >
                Featured Categories
              </Text>
            </View>
            <View style={{ height: 130, marginTop: sizes.margin }}>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              >
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("Category", { type: "male" })
                  }
                >
                  <Category
                    imgSrc={require("../assets/images/mens_fashion.jpg")}
                    name="FRUITS"
                    textBgColor="black"
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("Category", { type: "female" })
                  }
                >
                  <Category
                    imgSrc={require("../assets/images/womens_fashion.jpg")}
                    name="VEGETABLES"
                    textBgColor="black"
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("Category", { type: "kid" })
                  }
                >
                  <Category
                    imgSrc={require("../assets/images/kids_fashion.jpg")}
                    name="DIARY PRODUCTS"
                    textBgColor="black"
                  />
                </TouchableOpacity>

                {/* <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("Category", { type: "home" })
                  }
                >
                  <Category
                    imgSrc={require("../assets/images/home_display.jpg")}
                    name="Home"
                    textBgColor="purple"
                  />
                </TouchableOpacity> */}
                
              </ScrollView>
            </View>
            <View style={{ flex: 1, paddingTop: sizes.padding }}>
              <Text
                style={{
                  fontSize: sizes.title,
                  fontWeight: "700",
                  paddingHorizontal: sizes.padding,
                }}
              >
                More to Love
              </Text>
            </View>
            <View
              style={{
                paddingHorizontal: sizes.padding,
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "space-between",
              }}
            >
              {this.state.items.map(item => {
                return (
                  <TouchableOpacity
                    key={item.id}
                    onPress={() => navigation.navigate("ItemDetails", { item })}
                  >
                    <Item
                      imgSrc={item.imgPath}
                      width={width}
                      name={item.name}
                      price={item.price}
                      sold={item.sold}
                    />
                  </TouchableOpacity>
                );
              })}
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}