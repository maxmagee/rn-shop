import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, Text } from "react-native";

const DefaultText = (props) => {
  const { children, style } = props;

  return <Text style={{ ...styles.text, ...style }}>{children}</Text>;
};

DefaultText.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  style: Text.propTypes.style,
};

DefaultText.defaultProps = {
  style: StyleSheet.create({}),
};

const styles = StyleSheet.create({
  text: {
    fontFamily: "open-sans",
  },
});

export default DefaultText;
