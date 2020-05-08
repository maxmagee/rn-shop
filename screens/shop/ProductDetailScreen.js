import React from "react";
import PropTypes from "prop-types";
import { Button, Image, ScrollView, StyleSheet, View } from "react-native";
import { useDispatch } from "react-redux";

import DefaultText from "../../components/ui/DefaultText";

import * as cartActions from "../../store/actions/cart";
import colors from "../../constants/colors";

const ProductDetailScreen = (props) => {
  const { navigation } = props;
  const product = navigation.getParam("product");
  const { description, imageUrl, price } = product;
  const dispatch = useDispatch();

  const addToCartHandler = (productToAdd) => {
    dispatch(cartActions.addToCart(productToAdd));
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <View style={styles.buttonContainer}>
        <Button
          color={colors.primary}
          title="Add to Cart"
          onPress={addToCartHandler.bind(null, product)}
        />
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
