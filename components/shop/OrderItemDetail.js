import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, View } from "react-native";

import DefaultText from "../ui/DefaultText";

const OrderItemDetail = (props) => {
  const { item } = props;

  return (
    <View style={styles.container}>
      <View style={{ ...styles.itemData, ...styles.itemDataLeft }}>
        <DefaultText style={styles.quantity}>{item.quantity}</DefaultText>
        <DefaultText style={styles.title}>{item.productTitle}</DefaultText>
      </View>
      <View style={{ ...styles.itemData, ...styles.itemDataRight }}>
        <DefaultText style={styles.sum}>${item.sum.toFixed(2)}</DefaultText>
      </View>
    </View>
  );
};

OrderItemDetail.propTypes = {
  item: PropTypes.shape({
    productTitle: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
    sum: PropTypes.number.isRequired,
  }).isRequired,
};

OrderItemDetail.defaultProps = {};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
    width: "100%",
  },
  itemData: {
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 10,
    width: "100%",
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

export default OrderItemDetail;
