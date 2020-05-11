import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { ScrollView, StyleSheet, TextInput, View } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useDispatch } from "react-redux";

import CustomHeaderButton from "../../components/ui/CustomHeaderButton";
import DefaultText from "../../components/ui/DefaultText";
import * as productActions from "../../store/actions/products";
import Product from "../../models/product";

const EditProductScreen = (props) => {
  const { navigation } = props;
  const product = navigation.getParam("product");
  const dispatch = useDispatch();

  const [title, setTitle] = useState(product ? product.title : "");
  const [imageUrl, setImageUrl] = useState(product ? product.imageUrl : "");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState(product ? product.description : "");

  const saveHandler = useCallback(() => {
    if (product) {
      product.title = title;
      product.imageUrl = imageUrl;
      product.description = description;

      dispatch(productActions.updateProduct(product));
    } else {
      const newPriceFixed = parseFloat(price).toFixed(2);
      const newProduct = new Product(
        new Date().toString(),
        "u1",
        title,
        imageUrl,
        description,
        +newPriceFixed
      );

      dispatch(productActions.addProduct(newProduct));
    }

    navigation.goBack();
  }, [dispatch, product, title, imageUrl, price, description]);

  useEffect(() => {
    navigation.setParams({ saveHandler });
  }, [saveHandler]);

  return (
    <ScrollView style={styles.screen}>
      <View style={styles.form}>
        <View style={styles.formControl}>
          <DefaultText style={styles.label}>Title</DefaultText>
          <TextInput style={styles.input} value={title} onChangeText={(text) => setTitle(text)} />
        </View>
        <View style={styles.formControl}>
          <DefaultText style={styles.label}>Image URL</DefaultText>
          <TextInput
            style={styles.input}
            value={imageUrl}
            onChangeText={(text) => setImageUrl(text)}
          />
        </View>
        {product ? null : (
          <View style={styles.formControl}>
            <DefaultText style={styles.label}>Price</DefaultText>
            <TextInput style={styles.input} value={price} onChangeText={(text) => setPrice(text)} />
          </View>
        )}
        <View style={styles.formControl}>
          <DefaultText style={styles.label}>Description</DefaultText>
          <TextInput
            style={styles.input}
            value={description}
            onChangeText={(text) => setDescription(text)}
          />
        </View>
      </View>
    </ScrollView>
  );
};

EditProductScreen.navigationOptions = (navigationData) => {
  const { navigation } = navigationData;
  const saveHandler = navigation.getParam("saveHandler");
  const product = navigation.getParam("product");
  const isNew = product === undefined;

  return {
    headerRight: () => {
      return (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item iconName="ios-checkmark" onPress={saveHandler} title="Save" />
        </HeaderButtons>
      );
    },
    headerTitle: isNew ? "Add Product" : "Edit Product",
  };
};

EditProductScreen.propTypes = {
  navigation: PropTypes.shape({
    getParam: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
    setParams: PropTypes.func.isRequired,
  }).isRequired,
};

EditProductScreen.defaultProps = {};

const styles = StyleSheet.create({
  form: {
    backgroundColor: "white",
    margin: 20,
  },
  formControl: {
    width: "100%",
  },
  input: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    paddingHorizontal: 2,
    paddingVertical: 5,
  },
  label: {
    fontFamily: "open-sans-bold",
    marginVertical: 8,
  },
  screen: {
    backgroundColor: "white",
  },
});

export default EditProductScreen;
