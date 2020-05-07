/* eslint-disable global-require */
import React, { useState } from "react";
import { enableScreens } from "react-native-screens";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import { AppLoading } from "expo";
import * as Font from "expo-font";
// composeWithDevTools should be removed before deploying to production
// which is why eslint is warning about the dependency
import { composeWithDevTools } from "redux-devtools-extension"; // eslint-disable-line

import cartReducer from "./store/reducers/cart";
import productsReducer from "./store/reducers/products";
import ShopNavigator from "./navigation/ShopNavigator";

enableScreens();

const rootReducer = combineReducers({
  cart: cartReducer,
  products: productsReducer,
});

// TODO: Remove composeWithDevTools before Prod
const store = createStore(rootReducer, composeWithDevTools());

const fetchFonts = () => {
  return Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return <AppLoading startAsync={fetchFonts} onFinish={() => setFontLoaded(true)} />;
  }
  return (
    <Provider store={store}>
      <ShopNavigator />
    </Provider>
  );
}
