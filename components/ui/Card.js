import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, View, ViewPropTypes } from "react-native";

const Card = (props) => {
  const { children, style } = props;
  return <View style={{ ...styles.card, ...style }}>{children}</View>;
};

Card.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  style: ViewPropTypes.style,
};

Card.defaultProps = {
  children: null,
  style: StyleSheet.create({}),
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: 10,
    elevation: 5,
    marginHorizontal: 20,
    shadowColor: "black",
    shadowOffset: {
      height: 2,
      width: 0,
    },
    shadowOpacity: 0.26,
    shadowRadius: 8,
  },
});

export default Card;
