export const ADD_PRODUCT = "ADD_PRODUCT";
export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";

export const addProduct = (product) => {
  return {
    product,
    type: ADD_PRODUCT,
  };
};

export const deleteProduct = (product) => {
  return {
    product,
    type: DELETE_PRODUCT,
  };
};

export const updateProduct = (product) => {
  return {
    product,
    type: UPDATE_PRODUCT,
  };
};
