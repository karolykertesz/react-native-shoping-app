import { ADD_SHIPPING } from "../actions/shipping ";

const initialState = {
  county: null,
  city: null,
  address: null,
  state: null,
  zip: null,
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
      };
    default:
      return state;
  }
};

export default Shipping;
