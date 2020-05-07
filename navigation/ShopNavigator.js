import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import { Platform } from "react-native";

import CartScreen from "../screens/shop/CartScreen";
import ProductDetailScreen from "../screens/shop/ProductDetailScreen";
import ProductsOverviewScreen from "../screens/shop/ProductsOverviewScreen";

import colors from "../constants/colors";

const ProductsNavigator = createStackNavigator(
  {
    Cart: CartScreen,
    ProductDetail: ProductDetailScreen,
    ProductsOverview: ProductsOverviewScreen,
  },
  {
    defaultNavigationOptions: {
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
    },
    initialRouteName: "ProductsOverview",
  }
);

export default createAppContainer(ProductsNavigator);
