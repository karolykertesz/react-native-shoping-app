class UserOrdersState {
  constructor(id, items, total, date, quantity) {
    this.id = id;
    this.items = items;
    this.total = total;
    this.date = date;
    this.quantity = quantity;
  }
  get getterDate() {
    return this.date.toLocaleDateString("en-EN", {
      year: "numeric",
      month: "long",
      weekday: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  }
}

export default UserOrdersState;
