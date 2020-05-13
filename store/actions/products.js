import endpoints from "../../constants/api";
import Product from "../../models/product";

export const ADD_PRODUCT = "ADD_PRODUCT";
export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const SET_PRODUCTS = "SET_PRODUCTS";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";

export const addProduct = (product) => {
  const { title, imageUrl, price, description } = product;
  return async (dispatch) => {
    // any async code you want can go here...
    const response = await fetch(endpoints.products, {
      body: JSON.stringify({
        description,
        imageUrl,
        price,
        title,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });

    const responseData = await response.json();

    dispatch({
      product: { ...product, id: responseData.name },
      type: ADD_PRODUCT,
    });
  };
};

export const deleteProduct = (product) => {
  return {
    product,
    type: DELETE_PRODUCT,
  };
};

export const fetchProducts = () => {
  return async (dispatch) => {
    const response = await fetch(endpoints.products);
    const responseData = await response.json();

    const products = Object.keys(responseData).map((key) => {
      const { description, imageUrl, price, title } = responseData[key];

      return new Product(key, "u1", title, imageUrl, description, price);
    });

    dispatch({
      products,
      type: SET_PRODUCTS,
    });
  };
};

export const updateProduct = (product) => {
  return {
    product,
    type: UPDATE_PRODUCT,
  };
};
