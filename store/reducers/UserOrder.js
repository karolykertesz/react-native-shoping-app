import { ADD_USER_ORDER } from "../actions/userOrders";
import UserOrdersState from "../../models/userOrders";
const initialState = {
  orders: [],
  total: 0,
};

const UserOrders = (state = initialState, action) => {
  switch (action.type) {
    case ADD_USER_ORDER:
      const newOrder = new UserOrdersState(
        Math.random(1) * 10,
        action.items,
        action.total,
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
