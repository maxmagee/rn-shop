import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, TextInput, View } from "react-native";

import DefaultText from "./DefaultText";

const CustomTextInput = (props) => {
  const { label } = props;

  return (
    <View style={styles.formControl}>
      <DefaultText style={styles.label}>{label}</DefaultText>
      <TextInput {...props} style={styles.input} />
    </View>
  );
};

CustomTextInput.propTypes = {
  label: PropTypes.string,
};

CustomTextInput.defaultProps = {
  label: "",
};

const styles = StyleSheet.create({
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
});

export default CustomTextInput;
