import api from "../../api";

export const ADD_PRODUCT = "ADD_PRODUCT";
export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const GET_PRODUCTS = "GET_PRODUCTS";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";

export const addProduct = (product) => {
  return async (dispatch) => {
    // any async code you want can go here...
    const productKey = await api.products.addProduct(product);

    dispatch({
      product: { ...product, id: productKey },
      type: ADD_PRODUCT,
    });
  };
};

export const deleteProduct = (product) => {
  return async (dispatch) => {
    await api.products.deleteProduct(product);
    dispatch({
      product,
      type: DELETE_PRODUCT,
    });
  };
};

export const fetchProducts = () => {
  return async (dispatch) => {
    const products = await api.products.fetchProducts();

    dispatch({
      products,
      type: GET_PRODUCTS,
    });
  };
};

export const updateProduct = (product) => {
  return async (dispatch) => {
    await api.products.updateProduct(product);

    dispatch({
      product,
      type: UPDATE_PRODUCT,
    });
  };
};
