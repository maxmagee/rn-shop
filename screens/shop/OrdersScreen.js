import React, { useCallback, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { ActivityIndicator, Button, FlatList, StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { DrawerActions } from "react-navigation-drawer";
import * as orderActions from "../../store/actions/orders";

import CustomHeaderButton from "../../components/ui/CustomHeaderButton";
import OrderItem from "../../components/shop/OrderItem";
import DefaultText from "../../components/ui/DefaultText";
import colors from "../../constants/colors";

const USER_ID = "u1";

const OrdersScreen = (props) => {
  const { navigation } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [fetchError, setFetchError] = useState(null);
  const orders = useSelector((state) => state.orders.orders);
  const dispatch = useDispatch();

  const loadOrders = useCallback(async () => {
    setIsRefreshing(true);
    setFetchError(null);

    try {
      await dispatch(orderActions.fetchOrders(USER_ID));
    } catch (err) {
      setFetchError(err.message);
    }

    setIsRefreshing(false);
  }, [dispatch, setIsLoading, setFetchError]);

  useEffect(() => {
    setIsLoading(true);
    loadOrders().then(() => {
      setIsLoading(false);
    });
  }, [dispatch, loadOrders]);

  useEffect(() => {
    const willFocusListener = navigation.addListener("willFocus", loadOrders);

    // This will run when the component is destroyed or this effect will re-run.
    return () => {
      willFocusListener.remove();
    };
  }, [loadOrders]);

  const renderOrderItem = (itemData) => {
    return <OrderItem order={itemData.item} />;
  };

  if (isLoading) {
    return (
      <View style={styles.centeredScreen}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (fetchError) {
    return (
      <View style={styles.centeredScreen}>
        <DefaultText>{fetchError}</DefaultText>
        <Button title="Try again" color={colors.primary} onPress={loadOrders} />
      </View>
    );
  }

  if (orders === undefined || orders.length === 0) {
    return (
      <View style={styles.centeredScreen}>
        <DefaultText>No Orders Found</DefaultText>
        <Button title="Try again" color={colors.primary} onPress={loadOrders} />
      </View>
    );
  }

  return (
    <FlatList
      style={{ paddingTop: 10 }}
      data={orders}
      keyExtractor={(item) => item.id}
      renderItem={renderOrderItem}
      onRefresh={loadOrders}
      refreshing={isRefreshing}
    />
  );
};

OrdersScreen.propTypes = {
  navigation: PropTypes.shape({
    addListener: PropTypes.func.isRequired,
  }).isRequired,
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
  centeredScreen: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
});

export default OrdersScreen;
