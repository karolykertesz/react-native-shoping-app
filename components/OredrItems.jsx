import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, Button, Alert } from "react-native";
import { useDispatch } from "react-redux";
import Colors from "../helpers/Colors";
import { TouchableOpacity } from "react-native-gesture-handler";
import { cancelOrder } from "../store/actions/userOrders";
import PaymantModal from "./PaymantModal";
import Modal from "react-native-modal";
import Shipping from "./Shipping";
import { AntDesign } from "@expo/vector-icons";
const OrderItems = ({ total, date, items, navigation, id }) => {
  const [closeS, setColoseS] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [isShipping, setIsShipping] = useState(false);
 
  const dismissModal = () => {
    setModalVisible(false);
  };
  const dispatch = useDispatch();
  const canc = () => {
    dispatch(cancelOrder(id));
  };
  const cancelAllOrder = (id) => {
    Alert.alert(
      "You are about to cancel your Order!",
      "Would you like to proceed?",
      [
        {
          text: "Cancel my Orders!",
          style: "destructive",
          onPress: () => canc(),
        },
        { text: "Keep My Orders!", style: "cancel" },
      ]
    );
  };

  const [viewItems, setViewItems] = useState(false);
  return (
    <View style={styles.screen}>
      <View style={styles.textCont}>
        <Text style={styles.textDate}>{date}</Text>
      </View>
      <Button
        color={Colors.secondary}
        title={!viewItems ? "Show Details" : "Hide Details"}
        onPress={() => setViewItems((prev) => !prev)}
      />
      {viewItems && (
        <View>
          {items.map((it) => (
            <View key={it.id} style={styles.inner}>
              <Text style={styles.text}>
                {it.quantity} {""} x ${""} {it.price}
              </Text>
              <Text style={styles.text}>{it.title}</Text>
            </View>
          ))}
          <View style={styles.btnCont}>
            <View style={styles.btnView}>
              <TouchableOpacity
                style={[styles.btn, { backgroundColor: "#4990e6" }]}
                onPress={() => cancelAllOrder()}
              >
                <Text style={[styles.totalText, { color: "#fff" }]}>
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.btnView}>
              <TouchableOpacity
                style={[styles.btn, { backgroundColor: "#e34d42" }]}
                onPress={() => setModalVisible(true)}
              >
                <Text style={[styles.totalText, { color: "#fff" }]}>
                  Pay Now
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <Text style={styles.totalText}>$ {total.toFixed(2)}</Text>
        </View>
      )}
      <View style={styles.shp}>
        <Text style={styles.sphText}>Add shipping</Text>
        <TouchableOpacity onPress={() => setIsShipping((prev) => !prev)}>
          <AntDesign
            name={!isShipping ? "pluscircle" : "minuscircle"}
            size={24}
            color="#4990e6"
          />
        </TouchableOpacity>
      </View>
      {isShipping && <Shipping closeShipping={() => {}} />}
      <View>
        <Modal
          visible={modalVisible}
          onBackdropPress={() => dismissModal()}
          backdropOpacity={1}
          animationInTiming={500}
          animationIn="fadeIn"
          style={styles.modalContent}
        >
          <View stye={{ flex: 1, heigh: 300 }}>
            <PaymantModal
              dismiss={dismissModal}
              total={total}
              id={id}
              navigation={navigation}
              date={date}
            />
          </View>
        </Modal>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    flex: 1,
    marginTop: 0,
    justifyContent: "center",
    shadowColor: "black",
    height: "100%",

    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    borderRadius: 10,
  },
  shp: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    alignItems: "center",
  },
  sphText: { fontFamily: "merri-regular", fontSize: 16, marginHorizontal: 15 },
  screen: {
    elevation: 5,
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, heigh: 1.4 },
    shadowRadius: 6,
    borderRadius: 10,
    backgroundColor: "rgb(245, 241, 240)",
    shadowColor: "#8888",
    margin: 10,
    padding: 10,
    alignItems: "center",
  },
  inner: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
  },
  textCont: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "100%",
    marginBottom: 15,
  },
  totalText: {
    fontFamily: "merri-bold",
    fontSize: 17,
    textAlign: "center",
  },
  textDate: {
    fontFamily: "merri-regular",
    fontSize: 16,
    color: "#8888",
  },
  btnCont: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  btn: {
    width: "100%",
    height: "100%",
    borderRadius: 3,
    elevation: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  btnView: {
    margin: 40,
    width: 100,
    height: 30,
  },
  text: {
    textAlign: "center",
    fontFamily: "merri-regular",
    lineHeight: 16,
  },
});

export default OrderItems;
