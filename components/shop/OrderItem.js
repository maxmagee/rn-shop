import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, StyleSheet, View } from "react-native";

import Card from "../ui/Card";
import DefaultText from "../ui/DefaultText";
import OrderItemDetail from "./OrderItemDetail";

import colors from "../../constants/colors";

const OrderItem = (props) => {
  const { order } = props;
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetailsHandler = () => {
    setShowDetails((prevState) => !prevState);
  };

  const renderDetails = () => {
    if (!showDetails) return null;

    return order.items.map((item) => <OrderItemDetail key={item.productId} item={item} />);
  };

  return (
    <Card style={styles.orderItem}>
      <View style={styles.summary}>
        <DefaultText style={styles.totalAmount}>${order.totalAmount.toFixed(2)}</DefaultText>
        <DefaultText style={styles.date}>{order.readableDate}</DefaultText>
      </View>
      <Button
        color={colors.primary}
        onPress={toggleDetailsHandler}
        title={showDetails ? "Hide Details" : "Show Details"}
      />
      {renderDetails()}
    </Card>
  );
};

OrderItem.propTypes = {
  order: PropTypes.shape({
    date: PropTypes.instanceOf(Date),
    id: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        productId: PropTypes.string.isRequired,
        productPrice: PropTypes.number.isRequired,
        productTitle: PropTypes.string.isRequired,
        quantity: PropTypes.number.isRequired,
        sum: PropTypes.number.isRequired,
      }).isRequired
    ).isRequired,
    readableDate: PropTypes.string.isRequired,
    totalAmount: PropTypes.number.isRequired,
  }).isRequired,
};

OrderItem.defaultProps = {};

const styles = StyleSheet.create({
  date: {
    color: "#888",
    fontSize: 16,
  },
  orderItem: {
    alignItems: "center",
    marginVertical: 10,
    paddingHorizontal: 15,
    paddingTop: 5,
  },
  summary: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
    width: "100%",
  },
  totalAmount: {
    fontFamily: "open-sans-bold",
    fontSize: 16,
  },
});

export default OrderItem;
