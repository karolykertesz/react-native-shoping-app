export const ADD_SHIPPING = "ADD_SHIPPING";
export const RESET = "RESET";
export const PID = "PID";
import axios from "axios";
export const addShipping = (
  city,
  address,
  zip,
  country,
  state,
  check,
  updateS
) => {
  return async function (dispatch, getState) {
    if (check) {
      const uid = getState().auth.uid;
      try {
        const request = await axios({
          method: "POST",
          url: "https://rn-shopping.herokuapp.com/addshipping/ship",
          data: {
            uid,
            city,
            address,
            zip,
            country,
            state,
            updateS,
          },
          headers: { "Content-Type": "application/json" },
        });
        if (request.status === 200) {
          console.log("Yes");
        }
      } catch (err) {
        return err;
      }
    }
    dispatch({ type: ADD_SHIPPING, city, address, zip, country, state });
  };
};

export const resetShipping = () => {
  return {
    type: RESET,
  };
};

export const addPId = (p_id) => {
  return function (dispatch) {
    dispatch({ type: PID, p_id });
  };
};
