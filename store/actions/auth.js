import * as Google from "expo-google-app-auth";
import axios from "axios";
export const CREATE_USER = "CREATE_USER";
import Constants from "expo-constants";

export const LOGIN = "LOGIN";
export const SIGN_UP = "SIGN_UP";

export const createUser = (email, password) => {
  return async (dispatch) => {
    try {
      const request = await axios({
        method: "POST",
        url: "https://rn-shopping.herokuapp.com/createuser/create",
        data: {
          email,
          password,
        },
        headers: { "Content-Type": "application/json" },
      });
      if (request.status === 200) {
        const { uid, accessToken } = request.data;
        dispatch({ type: LOGIN, accessToken, uid });
      }
    } catch (err) {
      if (err) {
        return err;
      }
    }
  };
};
export const signIn = (email, password) => {
  return async (dispatch) => {
    try {
      const request = await axios({
        method: "POST",
        url: "https://rn-shopping.herokuapp.com/signinuser/signin",
        data: {
          email,
          password,
        },
        headers: { "Content-Type": "application/json" },
      });
      if (request.status === 200) {
        const { accessToken, uid } = request.data;
        dispatch({ type: SIGN_UP, accessToken, uid });
      }
    } catch (err) {
      if (err) {
        return err["response"]["data"]["msg"];
      }
    }
  };
};

export const signUpWithGoogle = () => {
  return async (dispatch) => {
    try {
      const {
        type,
        accessToken,
        user,
        idToken,
        refreshToken,
      } = await Google.logInAsync({
        iosClientId: Constants.manifest.extra.google,
        scopes: ["profile", "email"],
      });
      if (type === "success") {
        const response = await { user, accessToken };
        dispatch({ type: LOGIN, accessToken, uid: user.id });
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      return { error: true };
    }
  };
};
