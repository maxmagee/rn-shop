import React from "react";
import { FlatList } from "react-native";
import { useSelector } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { DrawerActions } from "react-navigation-drawer";

import CustomHeaderButton from "../../components/ui/CustomHeaderButton";
import OrderItem from "../../components/shop/OrderItem";

const OrdersScreen = () => {
  const orders = useSelector((state) => state.orders.orders);

  const renderOrderItem = (itemData) => {
    return <OrderItem order={itemData.item} />;
  };

  return (
    <FlatList
      style={{ paddingTop: 10 }}
      data={orders}
      keyExtractor={(item) => item.id}
      renderItem={renderOrderItem}
    />
  );
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

export default OrdersScreen;
