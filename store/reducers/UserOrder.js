import {
  ADD_USER_ORDER,
  CANCEL_ORDER,
  LOG_ALL_OUT,
} from "../actions/userOrders";
import UserOrdersState from "../../models/userOrders";
import { Product } from "../../models/productModels";
const initialState = {
  orders: [],
  total: 0,
};

const UserOrders = (state = initialState, action) => {
  switch (action.type) {
    case ADD_USER_ORDER:
      const newOrder = new UserOrdersState(
        Date.now().toString(),
        action.items,
        action.total,
        new Date(),
        action.quantity
      );
      return {
        ...state,
        orders: state.orders.concat(newOrder),
      };

    case CANCEL_ORDER:
      const modifiedState = state.orders.filter((i) => i.id !== action.id);
      return {
        ...state,
        orders: modifiedState,
      };
    case LOG_ALL_OUT:
      return initialState;
    default:
      return state;
  }
};

export default UserOrders;
