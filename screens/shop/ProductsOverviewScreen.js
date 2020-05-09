import React from "react";
import PropTypes from "prop-types";
import { Button, FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { DrawerActions } from "react-navigation-drawer";

import CustomHeaderButton from "../../components/ui/CustomHeaderButton";
import ProductItem from "../../components/shop/ProductItem";

import * as cartActions from "../../store/actions/cart";
import colors from "../../constants/colors";

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
        onSelect={viewDetailsHandler.bind(null, itemData.item)}
      >
        <Button
          color={colors.primary}
          title="View Details"
          onPress={viewDetailsHandler.bind(null, itemData.item)}
        />
        <Button
          color={colors.primary}
          title="Add to Cart"
          onPress={addToCartHandler.bind(null, itemData.item)}
        />
      </ProductItem>
    );
  };

  return <FlatList data={products} keyExtractor={(item) => item.id} renderItem={renderProduct} />;
};

ProductsOverviewScreen.navigationOptions = (navigationData) => {
  const goToCartHandler = () => {
    navigationData.navigation.navigate("Cart");
  };

  const openMenuHandler = () => {
    navigationData.navigation.dispatch(DrawerActions.openDrawer());
  };

  return {
    headerLeft: () => {
      return (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item iconName="ios-menu" onPress={openMenuHandler} title="Menu" />
        </HeaderButtons>
      );
    },
    headerRight: () => {
      return (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item iconName="ios-cart" onPress={goToCartHandler} title="Cart" />
        </HeaderButtons>
      );
    },
    headerTitle: "All Products",
  };
};

ProductsOverviewScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

ProductsOverviewScreen.defaultProps = {};

export default ProductsOverviewScreen;
