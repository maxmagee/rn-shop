import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator } from "react-navigation-drawer";

import { Platform } from "react-native";

import { Ionicons } from "@expo/vector-icons";
import CartScreen from "../screens/shop/CartScreen";
import ProductDetailScreen from "../screens/shop/ProductDetailScreen";
import ProductsOverviewScreen from "../screens/shop/ProductsOverviewScreen";
import OrdersScreen from "../screens/shop/OrdersScreen";
import UserProductsScreen from "../screens/user/UserProductsScreen";

import colors from "../constants/colors";

const defaultNavigationOptions = {
  headerBackTitleStyle: {
    fontFamily: "open-sans",
  },
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? colors.primary : "",
  },
  headerTintColor: Platform.OS === "android" ? "white" : colors.primary,
  headerTitleStyle: {
    fontFamily: "open-sans-bold",
  },
};

const ProductsNavigator = createStackNavigator(
  {
    Cart: CartScreen,
    ProductDetail: ProductDetailScreen,
    ProductsOverview: ProductsOverviewScreen,
  },
  {
    defaultNavigationOptions,
    initialRouteName: "ProductsOverview",
    navigationOptions: {
      drawerIcon: (drawerConfig) => (
        <Ionicons name="ios-cart" size={23} color={drawerConfig.tintColor} />
      ),
    },
  }
);

const OrdersNavigator = createStackNavigator(
  {
    Orders: OrdersScreen,
  },
  {
    defaultNavigationOptions,
    initialRouteName: "Orders",
    navigationOptions: {
      drawerIcon: (drawerConfig) => (
        <Ionicons name="ios-list" size={23} color={drawerConfig.tintColor} />
      ),
    },
  }
);

const AdminNavigator = createStackNavigator(
  {
    UserProducts: UserProductsScreen,
  },
  {
    defaultNavigationOptions,
    initialRouteName: "UserProducts",
    navigationOptions: {
      drawerIcon: (drawerConfig) => (
        <Ionicons name="ios-create" size={23} color={drawerConfig.tintColor} />
      ),
    },
  }
);

const RootNavigator = createDrawerNavigator(
  {
    Admin: AdminNavigator,
    Orders: OrdersNavigator,
    Products: ProductsNavigator,
  },
  {
    contentOptions: {
      activeTintColor: colors.primary,
    },
    initialRouteName: "Products",
    order: ["Products", "Orders", "Admin"],
  }
);

export default createAppContainer(RootNavigator);
