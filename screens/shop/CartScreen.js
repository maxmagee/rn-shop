import React from "react";
import { Button, FlatList, StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";

import CartItem from "../../components/shop/CartItem";
import DefaultText from "../../components/ui/DefaultText";

import colors from "../../constants/colors";

const CartScreen = () => {
  const renderCartItem = (itemData) => {
    const { item } = itemData;
    return <CartItem cartItem={item} />;
  };

  const cartTotalAmount = useSelector((state) => state.cart.totalAmount);
  const cartItems = useSelector((state) => {
    const { items } = state.cart;

    // Only iterate over own properties, not up the prototype chain
    // Returns an array of objects
    const transformedCartItems = Object.keys(items).map((key) => {
      return {
        productId: key,
        productPrice: items[key].productPrice,
        productTitle: items[key].productTitle,
        quantity: items[key].quantity,
        sum: items[key].sum,
      };
    });

    return transformedCartItems.sort((a, b) => (a.productId > b.productId ? 1 : -1));
  });

  return (
    <View style={styles.screen}>
      <View style={styles.summary}>
        <DefaultText style={styles.summaryText}>
          Total: <DefaultText style={styles.totalAmount}>${cartTotalAmount.toFixed(2)}</DefaultText>
        </DefaultText>
        <Button disabled={cartItems.length === 0} color={colors.primary} title="Order Now" />
      </View>
      <View>
        <FlatList
          data={cartItems}
          keyExtractor={(item) => item.productId}
          renderItem={renderCartItem}
          style={styles.cartItems}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

CartScreen.propTypes = {};

CartScreen.defaultProps = {};

const styles = StyleSheet.create({
  cartItems: {
    height: "100%",
  },
  screen: {
    flex: 1,
  },
  summary: {
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 10,
    elevation: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 20,
    marginBottom: 20,
    padding: 10,
    shadowColor: "black",
    shadowOffset: {
      height: 2,
      width: 0,
    },
    shadowOpacity: 0.26,
    shadowRadius: 8,
  },
  summaryText: {
    fontFamily: "open-sans-bold",
    fontSize: 18,
  },
  totalAmount: {
    color: "black",
  },
});

export default CartScreen;
