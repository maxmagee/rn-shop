import React from "react";
import PropTypes from "prop-types";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import Card from "../ui/Card";

const ProductItem = (props) => {
  const { children, imageUrl, onSelect, price, title } = props;

  return (
    <TouchableOpacity onPress={onSelect}>
      <Card style={styles.productContainer}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: imageUrl }} style={styles.image} />
        </View>

        <View style={styles.details}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.price}>${price.toFixed(2)}</Text>
        </View>
        <View style={styles.buttonContainer}>{children}</View>
      </Card>
    </TouchableOpacity>
  );
};

ProductItem.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  imageUrl: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
  price: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
};
ProductItem.defaultProps = {
  children: null,
};

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: "flex-end",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 10,
    paddingHorizontal: 20,
  },
  details: {
    alignItems: "center",
    height: "15%",
    paddingTop: 10,
  },
  image: {
    height: "100%",
    width: "100%",
  },
  imageContainer: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    height: "65%",
    overflow: "hidden",
    width: "100%",
  },
  price: {
    color: "#888",
    fontSize: 14,
  },
  productContainer: {
    height: 300,
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    marginVertical: 4,
  },
});

export default ProductItem;
