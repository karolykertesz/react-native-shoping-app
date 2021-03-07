import { ADD_ITEM_TO_CART } from "../actions/cart";
import CartItem from "../../models/cart-item";

const initialState = {
  items: {},
  sumItems: 0,
};

const Cart = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ITEM_TO_CART:
      const { product } = action.product;
      const price = product.price;
      const title = product.title;

      if (state.items[product.id]) {
        const itemUpdated = new CartItem(
          state[product.id].quantity + 1,
          price,
          title,
          price + state[product.id].sum + price
        );
        return {
          ...state,
          items: {
            ...state.items,
            [product.id]: itemUpdated,
          },
          sumItems: state.sumItems + price,
        };
      } else {
        const newItem = new CartItem(1, price, title, price);
      }
      return {
        ...state,
        items: {
          ...state.items,
          [product.id]: newItem,
        },
        sumItems: state.sumItems + price,
      };
    default:
      return state;
  }
};

export default Cart;