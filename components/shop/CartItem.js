import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";

import DefaultText from "../ui/DefaultText";

import * as cartActions from "../../store/actions/cart";
import colors from "../../constants/colors";

const CartItem = (props) => {
  const { item } = props;

  const dispatch = useDispatch();

  const removeFromCartHandler = () => {
    dispatch(cartActions.removeFromCart(item));
  };

  return (
    <View style={styles.container}>
      <View style={{ ...styles.itemData, ...styles.itemDataLeft }}>
        <DefaultText style={styles.quantity}>{item.quantity}</DefaultText>
        <DefaultText style={styles.title}>{item.productTitle}</DefaultText>
      </View>
      <View style={{ ...styles.itemData, ...styles.itemDataRight }}>
        <DefaultText style={styles.sum}>${item.sum.toFixed(2)}</DefaultText>
        <TouchableOpacity onPress={removeFromCartHandler} style={styles.deleteButton}>
          <Ionicons name="ios-trash" size={23} color={colors.primary} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

CartItem.propTypes = {
  item: PropTypes.shape({
    productTitle: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
    sum: PropTypes.number.isRequired,
  }).isRequired,
};

CartItem.defaultProps = {};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
    paddingHorizontal: 20,
  },
  deleteButton: {
    marginLeft: 20,
  },
  itemData: {
    alignItems: "center",
    flexDirection: "row",
    marginVertical: 10,
  },
  itemDataLeft: {
    width: "60%",
  },
  itemDataRight: {
    justifyContent: "flex-end",
    width: "40%",
  },
  quantity: {
    fontFamily: "open-sans-bold",
    fontSize: 16,
    marginRight: 10,
  },
  sum: {
    fontFamily: "open-sans-bold",
    fontSize: 16,
  },
  title: {
    fontFamily: "open-sans",
    fontSize: 16,
  },
});

export default CartItem;
