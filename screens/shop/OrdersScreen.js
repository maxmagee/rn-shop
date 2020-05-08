import React from "react";
import { FlatList, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { DrawerActions } from "react-navigation-drawer";

import CustomHeaderButton from "../../components/ui/CustomHeaderButton";
import DefaultText from "../../components/ui/DefaultText";
import OrderItem from "../../components/shop/OrderItem";

const OrdersScreen = () => {
  const orders = useSelector((state) => state.orders.orders);

  const renderOrderItem = (itemData) => {
    return <OrderItem order={itemData.item} />;
  };

  return <FlatList data={orders} keyExtractor={(item) => item.id} renderItem={renderOrderItem} />;
};

OrdersScreen.navigationOptions = (navigationData) => {
  const openMenuHandler = () => {
    navigationData.navigation.dispatch(DrawerActions.openDrawer());
  };

  return {
    headerLeft: () => {
      return (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item iconName="ios-menu" onPress={openMenuHandler} title="Menu" />
        </HeaderButtons>
      );
    },
    headerTitle: "Your Orders",
  };
};

const styles = StyleSheet.create({
  screen: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
});

export default OrdersScreen;
