import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import { Platform } from "react-native";

import ProductDetailScreen from "../screens/shop/ProductDetailScreen";
import ProductsOverviewScreen from "../screens/shop/ProductsOverviewScreen";

import colors from "../constants/colors";

const ProductsNavigator = createStackNavigator(
  {
    ProductDetail: ProductDetailScreen,
    ProductsOverview: ProductsOverviewScreen,
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Platform.OS === "android" ? colors.primary : "",
      },
      headerTintColor: Platform.OS === "android" ? "white" : colors.primary,
    },
    initialRouteName: "ProductsOverview",
  }
);

export default createAppContainer(ProductsNavigator);
