import React from "react";
import PropTypes from "prop-types";
import { FlatList, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

import ProductItem from "../../components/shop/ProductItem";

const ProductsOverviewScreen = (props) => {
  const { navigation } = props;

  const products = useSelector((state) => state.products.availableProducts);

  const viewDetailsHandler = (product) => {
    navigation.navigate("ProductDetail", { product });
  };

  const addToCartHandler = () => {
    console.log("Add to Cart Pressed");
  };

  const renderProduct = (itemData) => {
    const { item } = itemData;
    return (
      <ProductItem
        imageUrl={item.imageUrl}
        price={item.price}
        title={item.title}
        onViewDetails={viewDetailsHandler.bind(null, item)}
        onAddToCart={addToCartHandler}
      />
    );
  };

  return <FlatList data={products} keyExtractor={(item) => item.id} renderItem={renderProduct} />;
};

ProductsOverviewScreen.navigationOptions = {
  headerTitle: "All Products",
};

ProductsOverviewScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

ProductsOverviewScreen.defaultProps = {};

const styles = StyleSheet.create({
  screen: {},
});

export default ProductsOverviewScreen;
