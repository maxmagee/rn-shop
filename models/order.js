// This is the only import of moment I managed to get working.
const moment = require("moment");

class Order {
  constructor(id, items, totalAmount, date) {
    this.id = id;
    this.items = items;
    this.totalAmount = totalAmount;
    this.date = date;
  }

  get readableDate() {
    return moment(this.date).format("MMMM Do YYYY, h:mm A");
  }
}

export default Order;
