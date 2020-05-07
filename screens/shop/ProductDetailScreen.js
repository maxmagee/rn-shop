import React from "react";
import PropTypes from "prop-types";
import { Button, Image, ScrollView, StyleSheet, View } from "react-native";

import DefaultText from "../../components/DefaultText";

const ProductDetailScreen = (props) => {
  const { navigation } = props;
  const { description, imageUrl, price } = navigation.getParam("product");
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <View style={styles.buttonContainer}>
        <Button title="Add to Cart" onPress={() => {}} />
      </View>
      <DefaultText style={styles.price}>${price.toFixed(2)}</DefaultText>
      <DefaultText style={styles.description}>{description}</DefaultText>
    </ScrollView>
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
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
  description: {
    fontSize: 14,
    margin: 20,
  },
  image: {
    height: 200,
    width: "100%",
  },
  price: {
    color: "#888",
    fontSize: 20,
    textAlign: "center",
  },
});

export default ProductDetailScreen;
