import { ADD_SHIPPING, RESET, PID } from "../actions/shipping ";

const initialState = {
  county: null,
  city: null,
  address: null,
  state: null,
  zip: null,
  check: false,
  isDone: false,
  p_id: null,
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
    case PID:
      return {
        ...state,
        p_id: action.p_id,
      };
    default:
      return state;
  }
};

export default Shipping;
