import React from "react";
import PropTypes from "prop-types";
import { Button, FlatList, StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { DrawerActions } from "react-navigation-drawer";

import CustomHeaderButton from "../../components/ui/CustomHeaderButton";
import DefaultText from "../../components/ui/DefaultText";
import ProductItem from "../../components/shop/ProductItem";

import colors from "../../constants/colors";
import { deleteProduct } from "../../store/actions/products";

const UserProductsScreen = (props) => {
  const { navigation } = props;
  const userProducts = useSelector((state) => state.products.userProducts);
  const dispatch = useDispatch();

  const editHandler = (product) => {
    navigation.navigate("EditProduct", { product });
  };

  const deleteHandler = (product) => {
    dispatch(deleteProduct(product));
  };

  const renderUserProduct = (itemData) => {
    const { item } = itemData;
    return (
      <ProductItem
        imageUrl={item.imageUrl}
        title={item.title}
        price={item.price}
        onSelect={editHandler.bind(null, itemData)}
      >
        <Button color={colors.primary} title="Edit" onPress={editHandler.bind(null, item)} />
        <Button color={colors.primary} title="Delete" onPress={deleteHandler.bind(null, item)} />
      </ProductItem>
    );
  };

  if (userProducts.length === 0) {
    return (
      <View style={styles.screen}>
        <DefaultText>No Products Found</DefaultText>
      </View>
    );
  }

  return (
    <FlatList
      style={styles.list}
      data={userProducts}
      keyExtractor={(item) => item.id}
      renderItem={renderUserProduct}
    />
  );
};

UserProductsScreen.navigationOptions = (navigationData) => {
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
    headerTitle: "Your Products",
  };
};

UserProductsScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

UserProductsScreen.defaultProps = {};

const styles = StyleSheet.create({
  list: {
    paddingVertical: 15,
  },
  screen: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
});

export default UserProductsScreen;
