import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";

const renderProduct = (itemData) => {
  return <Text>{itemData.item.title}</Text>;
};

const ProductsOverviewScreen = (props) => {
  const products = useSelector((state) => state.products.availableProducts);

  return <FlatList data={products} keyExtractor={(item) => item.id} renderItem={renderProduct} />;
};

ProductsOverviewScreen.navigationOptions = {
  headerTitle: "All Products",
};

const styles = StyleSheet.create({
  screen: {},
});

export default ProductsOverviewScreen;
