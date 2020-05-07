import React from "react";
import PropTypes from "prop-types";
import { Button, Image, ScrollView, StyleSheet, Text, View } from "react-native";

const ProductDetailScreen = (props) => {
  const { navigation } = props;
  const { title } = navigation.getParam("product");
  return (
    <View style={styles.screen}>
      <Text>The product detail screen</Text>
      <Text>{title}</Text>
    </View>
  );
};

ProductDetailScreen.propTypes = {
  navigation: PropTypes.shape({
    getParam: PropTypes.func.isRequired,
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

ProductDetailScreen.defaultProps = {};

ProductDetailScreen.navigationOptions = (navigationData) => {
  return {
    headerTitle: navigationData.navigation.getParam("product").title,
  };
};

const styles = StyleSheet.create({
  screen: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
});

export default ProductDetailScreen;
