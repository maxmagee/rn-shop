import React from "react";
import PropTypes from "prop-types";
import { FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import ProductItem from "../../components/shop/ProductItem";

import * as cartActions from "../../store/actions/cart";

const ProductsOverviewScreen = (props) => {
  const { navigation } = props;

  const products = useSelector((state) => state.products.availableProducts);
  const dispatch = useDispatch();

  const viewDetailsHandler = (product) => {
    navigation.navigate("ProductDetail", { product });
  };

  const addToCartHandler = (product) => {
    dispatch(cartActions.addToCart(product));
  };

  const renderProduct = (itemData) => {
    const { item } = itemData;
    return (
      <ProductItem
        imageUrl={item.imageUrl}
        price={item.price}
        title={item.title}
        onViewDetails={viewDetailsHandler.bind(null, item)}
        onAddToCart={addToCartHandler.bind(null, item)}
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

export default ProductsOverviewScreen;
