import React from "react";
import PropTypes from "prop-types";
import { Button, Image, StyleSheet, Text, View } from "react-native";

import colors from "../../constants/colors";

const ProductItem = (props) => {
  const { imageUrl, onViewDetails, onAddToCart, price, title } = props;

  return (
    <View style={styles.productContainer}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: imageUrl }} style={styles.image} />
      </View>

      <View style={styles.details}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.price}>${price.toFixed(2)}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button color={colors.primary} title="View Details" onPress={onViewDetails} />
        <Button color={colors.primary} title="Add to Cart" onPress={onAddToCart} />
      </View>
    </View>
  );
};

ProductItem.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  onAddToCart: PropTypes.func.isRequired,
  onViewDetails: PropTypes.func.isRequired,
  price: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
};
ProductItem.defaultProps = {};

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: "center",
    flexDirection: "row",
    height: "25%",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  details: {
    alignItems: "center",
  },
  image: {
    height: "100%",
    width: "100%",
  },
  imageContainer: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    height: "60%",
    overflow: "hidden",
    width: "100%",
  },
  price: {
    color: "#888",
    fontSize: 14,
  },
  productContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    elevation: 5,
    height: 300,
    margin: 20,
    shadowColor: "black",
    shadowOffset: {
      height: 2,
      width: 0,
    },
    shadowOpacity: 0.26,
    shadowRadius: 8,
  },
  title: {
    fontSize: 18,
    marginVertical: 4,
  },
});

export default ProductItem;
