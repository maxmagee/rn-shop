class CartItem {
  constructor(quantity, productId, productPrice, productTitle, sum) {
    this.quantity = quantity;
    this.productId = productId;
    this.productPrice = productPrice;
    this.productTitle = productTitle;
    this.sum = sum;
  }
}

export default CartItem;
