import { ADD_SHIPPING, RESET } from "../actions/shipping ";

const initialState = {
  county: null,
  city: null,
  address: null,
  state: null,
  zip: null,
  check: false,
  isDone: false,
};
const Shipping = (state = initialState, action) => {
  switch (action.type) {
    case ADD_SHIPPING:
      return {
        county: action.country,
        city: action.city,
        address: action.address,
        state: action.state,
        zip: action.zip,
        check: action.check,
        isDone: action.isDone,
      };
    case RESET:
      return initialState;
    default:
      return state;
  }
};

export default Shipping;
