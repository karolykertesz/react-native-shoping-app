import { ADD_USER_ORDER } from "../actions/userOrders";
import userOrders from "../../models/userOrders";
const initialState = {
  orders: [],
  total: 0,
};

const UserOrders = (state = initialState, action) => {
  switch (action.type) {
    case ADD_USER_ORDER:
      const { items, total } = action;
      const newOrder = new UserOrders(
        Math.random(1) * 10,
        items,
        total,
        new Date()
      );
      return {
        ...state,
        orders: state.orders.concat(newOrder),
      };
    default:
      return state;
  }
};

export default UserOrders;
