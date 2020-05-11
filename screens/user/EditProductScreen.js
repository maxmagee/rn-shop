import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, View } from "react-native";

import DefaultText from "../../components/ui/DefaultText";

const EditProductScreen = (props) => {
  return (
    <View style={styles.screen}>
      <DefaultText>Edit Products Screen</DefaultText>
    </View>
  );
};

EditProductScreen.navigationOptions = {
  headerTitle: "Edit Product",
};

EditProductScreen.propTypes = {};

EditProductScreen.defaultProps = {};

const styles = StyleSheet.create({
  screen: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
});

export default EditProductScreen;
