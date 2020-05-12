import React, { useCallback, useEffect, useReducer } from "react";
import PropTypes from "prop-types";
import { ScrollView, StyleSheet, View, Alert } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useDispatch } from "react-redux";

import CustomHeaderButton from "../../components/ui/CustomHeaderButton";
import CustomTextInput from "../../components/ui/CustomTextInput";

import * as productActions from "../../store/actions/products";
import Product from "../../models/product";

const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";

// This IS NOT related to Redux
const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.inputId]: action.value,
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.inputId]: action.isValid,
    };

    // If any validity key is false, set updatedFormIsValid to false
    const updatedFormIsValid = !Object.keys(updatedValidities).some((key) => {
      return !updatedValidities[key];
    });

    return {
      ...state,
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues,
    };
  }

  return state;
};

const EditProductScreen = (props) => {
  const { navigation } = props;
  const product = navigation.getParam("product");
  const dispatch = useDispatch();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    formIsValid: !!product,
    inputValidities: {
      description: !!product,
      imageUrl: !!product,
      price: !!product,
      title: !!product,
    },
    inputValues: {
      description: product ? product.description : "",
      imageUrl: product ? product.imageUrl : "",
      price: "",
      title: product ? product.title : "",
    },
  });

  const saveHandler = useCallback(() => {
    if (!formState.formIsValid) {
      Alert.alert("Invalid Input", "Please provide a valid value for each form field.", [
        { text: "Okay" },
      ]);
      return;
    }

    const { title, imageUrl, price, description } = formState.inputValues;

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
  }, [dispatch, product, formState]);

  useEffect(() => {
    navigation.setParams({ saveHandler });
  }, [saveHandler]);

  // Note: You can also import validate.js to help with validation

  const isTextValid = (inputId, text) => {
    switch (inputId) {
      case "title":
      case "imageUrl":
      case "description":
        return text.trim().length > 0;
      case "price":
        return (
          text.trim().length > 0 && !Number.isNaN(Number(text.trim())) && Number(text.trim()) > 0
        );
      default:
        return false;
    }
  };

  const textChangeHandler = (inputId, text) => {
    dispatchFormState({
      inputId,
      isValid: isTextValid(inputId, text),
      type: FORM_INPUT_UPDATE,
      value: text,
    });
  };

  return (
    <ScrollView style={styles.screen}>
      <View style={styles.form}>
        <CustomTextInput
          label="Title"
          value={formState.inputValues.title}
          autoCapitalize="sentences"
          returnKeyType="next"
          onChangeText={textChangeHandler.bind(null, "title")}
        />
        <CustomTextInput
          label="Image URL"
          value={formState.inputValues.imageUrl}
          autoCapitalize="sentences"
          returnKeyType="next"
          onChangeText={textChangeHandler.bind(null, "imageUrl")}
        />
        {product ? null : (
          <CustomTextInput
            label="Price"
            value={formState.inputValues.price}
            autoCapitalize="sentences"
            returnKeyType="next"
            keyboardType="decimal-pad"
            onChangeText={textChangeHandler.bind(null, "price")}
          />
        )}
        <CustomTextInput
          label="Description"
          value={formState.inputValues.description}
          autoCapitalize="sentences"
          returnKeyType="next"
          onChangeText={textChangeHandler.bind(null, "description")}
        />
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

  screen: {
    backgroundColor: "white",
  },
});

export default EditProductScreen;
