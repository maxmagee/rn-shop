export const DELETE_PRODUCT = "DELETE_PRODUCT";

export const deleteProduct = (product) => {
  return {
    product,
    type: DELETE_PRODUCT,
  };
};
