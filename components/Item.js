// import React from "react";
// import { View, Text, Image } from "react-native";

// export default class Item extends React.Component {
//   render() {
//     const { name, price, width, imgSrc, sold } = this.props;
//     return (
//       <View
//         style={{
//           width: width / 2 - 30,
//           height: width / 2 - 10,
//           borderWidth: 0.5,
//           borderColor: "#dddddd",
//           borderRadius: 10,
//           marginTop: 15,
//         }}
//       >
//         <View style={{ flex: 2 }}>
//           <Image
//             style={{
//               flex: 1,
//               width: null,
//               height: null,
//               resizeMode: "cover",
//               borderTopLeftRadius: 10,
//               borderTopRightRadius: 10,
//             }}
//             source={imgSrc}
//           />
//         </View>
//         <View
//           style={{
//             flex: 1,
//             alignItems: "flex-start",
//             justifyContent: "space-evenly",
//             paddingLeft: 10,
//             borderBottomRightRadius: 10,
//             borderBottomLeftRadius: 10,
//           }}
//         >
//           <Text style={{ fontSize: 12, color: "black" }}>{name}</Text>
//           <Text style={{ fontSize: 14 }}>${price}</Text>
//           <Text style={{ color: "black" }}>{sold} sold</Text>
//         </View>
//       </View>
//     );
//   }
// }

// import React from "react";
// import { View, Text, Image, Button, TouchableOpacity } from "react-native";
// //import { withNavigation } from "@react-navigation/compat";

// export default class Item extends React.Component {

//   handleAddToCart = () => {
//     // Navigate to the Cart screen
//     this.props.navigation.navigate("Cart");
//   };

//   render() {
//     const { name, price, width, imgSrc, sold } = this.props;
//     return (
//       <View
//         style={{
//           width: width / 2 - 30,
//           height: width / 2 + 40, // Adjusted height to fit button
//           borderWidth: 0.5,
//           borderColor: "#dddddd",
//           borderRadius: 10,
//           marginTop: 15,
//         }}
//       >
//         <View style={{ flex: 2 }}>
//           <Image
//             style={{
//               flex: 1,
//               width: null,
//               height: null,
//               resizeMode: "cover",
//               borderTopLeftRadius: 10,
//               borderTopRightRadius: 10,
//             }}
//             source={imgSrc}
//           />
//         </View>
//         <View
//           style={{
//             flex: 1,
//             alignItems: "flex-start",
//             justifyContent: "space-evenly",
//             paddingLeft: 10,
//             borderBottomRightRadius: 10,
//             borderBottomLeftRadius: 10,
//           }}
//         >
//           <Text style={{ fontSize: 12, color: "black" }}>{name}</Text>
//           <Text style={{ fontSize: 14 }}>${price}</Text>
//           <Text style={{ color: "black" }}>{sold} sold</Text>
//         </View>
//         <View
//           style={{
//             padding: 10,
//             alignItems: "center",
//           }}
//         >
//           <TouchableOpacity
//             style={{
//               backgroundColor: "black",
//               paddingVertical: 10,
//               paddingHorizontal: 20,
//               borderRadius: 5,
//             }}
//             onPress={this.handleAddToCart}
//           >
//             <Text style={{ color: "white" }}>Add to Cart</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     );
//   }
// }

import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import firestore from "@react-native-firebase/firestore"; // Use appropriate Firebase import

export default class Item extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isWishlisted: false, // State to track wishlist status
    };
  }

  handleAddToCart = () => {
    // Navigate to the Cart screen
    this.props.navigation.navigate("Cart");
  };

  handleWishlistToggle = () => {
    const { isWishlisted } = this.state;
    const { name, price, imgSrc } = this.props;

    // Toggle wishlist state
    this.setState({ isWishlisted: !isWishlisted }, async () => {
      try {
        if (!isWishlisted) {
          // Add item to wishlist in Firestore
          await firestore().collection("wishlist").add({
            name,
            price,
            imgSrc,
            timestamp: firestore.FieldValue.serverTimestamp(),
          });
        } else {
          // Remove item from wishlist in Firestore
          const wishlistCollection = await firestore()
            .collection("wishlist")
            .where("name", "==", name)
            .get();

          wishlistCollection.forEach((doc) => {
            doc.ref.delete();
          });
        }
      } catch (error) {
        console.error("Error updating wishlist: ", error);
      }
    });
  };

  render() {
    const { name, price, width, imgSrc, sold } = this.props;
    const { isWishlisted } = this.state;

    return (
      <View
        style={{
          width: width / 2 - 30,
          height: width / 2 + 40, // Adjusted height to fit button
          borderWidth: 0.5,
          borderColor: "#dddddd",
          borderRadius: 10,
          marginTop: 15,
        }}
      >
        <View style={{ flex: 2 }}>
          <Image
            style={{
              flex: 1,
              width: null,
              height: null,
              resizeMode: "cover",
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
            }}
            source={imgSrc}
          />
        </View>
        <View
          style={{
            flex: 1,
            alignItems: "flex-start",
            justifyContent: "space-evenly",
            paddingLeft: 10,
            borderBottomRightRadius: 10,
            borderBottomLeftRadius: 10,
          }}
        >
          <Text style={{ fontSize: 12, color: "black" }}>{name}</Text>
          <Text style={{ fontSize: 14 }}>${price}</Text>
          <Text style={{ color: "black" }}>{sold} sold</Text>
        </View>
        <View
          style={{
            padding: 10,
            flexDirection: "row", // Align items in a row
            justifyContent: "space-between",
          }}
        >
          {/* Wishlist Icon */}
          <TouchableOpacity onPress={this.handleWishlistToggle}>
            <Icon
              name={isWishlisted ? "heart" : "heart-o"} // Filled or empty heart icon
              size={24}
              color={isWishlisted ? "red" : "black"}
            />
          </TouchableOpacity>

          {/* Add to Cart Button */}
          <TouchableOpacity
            style={{
              backgroundColor: "black",
              paddingVertical: 10,
              paddingHorizontal: 20,
              borderRadius: 5,
            }}
            onPress={this.handleAddToCart}
          >
            <Text style={{ color: "white" }}>Add to Cart</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
