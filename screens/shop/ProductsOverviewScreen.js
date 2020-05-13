import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { ActivityIndicator, Button, FlatList, StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { DrawerActions } from "react-navigation-drawer";

import CustomHeaderButton from "../../components/ui/CustomHeaderButton";
import DefaultText from "../../components/ui/DefaultText";
import ProductItem from "../../components/shop/ProductItem";

import * as cartActions from "../../store/actions/cart";
import * as productsActions from "../../store/actions/products";
import colors from "../../constants/colors";

const ProductsOverviewScreen = (props) => {
  const { navigation } = props;

  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setFetchError] = useState(null);
  const products = useSelector((state) => state.products.availableProducts);
  const dispatch = useDispatch();

  const loadProducts = useCallback(async () => {
    setIsLoading(true);
    setFetchError(null);

    try {
      await dispatch(productsActions.fetchProducts());
    } catch (err) {
      setFetchError(err.message);
    }

    setIsLoading(false);
  }, [dispatch, setIsLoading, setFetchError]);

  useEffect(() => {
    loadProducts();
  }, [dispatch, loadProducts]);

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

  if (isLoading) {
    return (
      <View style={styles.centeredScreen}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (fetchError) {
    return (
      <View style={styles.centeredScreen}>
        <DefaultText>{fetchError}</DefaultText>
        <Button title="Try again" color={colors.primary} onPress={loadProducts} />
      </View>
    );
  }

  if (products === undefined || products.length === 0) {
    return (
      <View style={styles.centeredScreen}>
        <DefaultText>No Products Found</DefaultText>
        <Button title="Try again" color={colors.primary} onPress={loadProducts} />
      </View>
    );
  }

  return (
    <FlatList
      style={styles.list}
      data={products}
      keyExtractor={(item) => item.id}
      renderItem={renderProduct}
    />
  );
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

const styles = StyleSheet.create({
  centeredScreen: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  list: {
    paddingVertical: 15,
  },
});

export default ProductsOverviewScreen;
