import React from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
  Image,
} from "react-native";
import Colors from "../../helpers/Colors";
const ListProductItem = (props) => {
  const TitleButton =
    Platform.OS === "ios" ? TouchableOpacity : TouchableNativeFeedback;
  return (
    <View style={styles.product}>
      <TitleButton
        useForeground // Android
        onPress={() =>
          props.navigation.navigate("ProductDetailScreen", {
            id: props.id,
            title: props.title,
          })
        }
      >
        <View>
          <View style={styles.imageCont}>
            <Image source={{ uri: props.imgUrl }} style={styles.image} />
          </View>
          <View style={styles.details}>
            <Text style={styles.title}>{props.title}</Text>
            <Text style={styles.price}>${props.price.toFixed(2)}</Text>
          </View>

          <View style={styles.btnContainer}>
            <TitleButton
              onPress={props.viewDetail}
              style={styles.actionButtons}
            >
              <Text style={styles.btnText}>View Details</Text>
            </TitleButton>
            <TitleButton onPress={props.toCart} style={styles.actionButtons}>
              <Text style={styles.btnText}>To Cart</Text>
            </TitleButton>
          </View>
        </View>
      </TitleButton>
    </View>
  );
};

const styles = StyleSheet.create({
  product: {
    shadowColor: "#ccc",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 1.3 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "white",
    height: 280,
    margin: 20,
  },
  image: {
    height: "100%",
    width: "100%",
  },
  imageCont: {
    width: "100%",
    height: "60%",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: "hidden",
  },
  title: {
    fontSize: 18,
    marginVertical: 2,
  },

  price: { fontSize: 17, color: "#888" },
  actionButtons: {
    backgroundColor: Platform.OS === "ios" ? "white" : Colors.secondary,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
    marginHorizontal: 15,
  },
  details: {
    alignItems: "center",
    height: "15%",
    padding: 5,
  },
  btnText: {
    textAlign: "center",
    color: Platform.OS === "ios" ? Colors.primary : "white",
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: "15%",
    borderRadius: 5,
    elevation: 3,
  },
  touchStyle: {
    overflow: "hidden",
    // borderRadius: 10,
  },
});

export default ListProductItem;
