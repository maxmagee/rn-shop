import React from "react";
import PropTypes from "prop-types";
import { Button, StyleSheet, View } from "react-native";

import CartItem from "./CartItem";
import DefaultText from "../ui/DefaultText";

const OrderItem = (props) => {
  const { order } = props;

  return (
    <View>
      <View>
        <DefaultText>${order.totalAmount}</DefaultText>
        <DefaultText>{order.date.toString()}</DefaultText>
      </View>
    </View>
  );
};

OrderItem.propTypes = {
  order: PropTypes.shape({
    date: PropTypes.instanceOf(Date),
    id: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        productPrice: PropTypes.number.isRequired,
        productTitle: PropTypes.string.isRequired,
        quantity: PropTypes.number.isRequired,
        sum: PropTypes.number.isRequired,
      }).isRequired
    ).isRequired,
    totalAmount: PropTypes.number.isRequired,
  }).isRequired,
};

OrderItem.defaultProps = {};

const styles = StyleSheet.create({});

export default OrderItem;
