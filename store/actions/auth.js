import * as Google from "expo-google-app-auth";
import axios from "axios";
export const CREATE_USER = "CREATE_USER";
import Constants from "expo-constants";
import * as SecureStore from "expo-secure-store";
export const LOGIN = "LOGIN";
export const SIGN_UP = "SIGN_UP";
export const LOG_OUT = "LOG_OUT";

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
        async function save() {
          let token = "token";
          await SecureStore.setItemAsync(
            token,
            JSON.stringify({ uid: uid, accesToken: accessToken })
          );
          dispatch({
            type: SIGN_UP,
            uid: uid,
            accesToken: accessToken,
            isGoogle: false,
          });
        }
        save();
        return request.data;
      }
    } catch (err) {
      if (err) {
        console.log(err);
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
        const { uid, accessToken } = request.data;
        async function save() {
          let token = "token";
          await SecureStore.setItemAsync(
            token,
            JSON.stringify({ uid: uid, accesToken: accessToken })
          );
          dispatch({ type: LOGIN, uid, accesToken, isGoogle: false });
        }
        save();
        return request.data;
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
        async function save() {
          let token = "token";
          await SecureStore.setItemAsync(
            token,
            JSON.stringify({ uid: user.id, accesToken: accessToken })
          );
        }
        dispatch({
          type: LOGIN,
          uid: user.id,
          accesToken: accessToken,
          isGoogle: true,
        });
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      return { error: true };
    }
  };
};
export const logOut = () => {
  return async (dispatch, getState) => {
    if (getState().auth.isGoogle) {
      const iosClientId = Constants.manifest.extra.google;
      const token = getState().auth.token;
      console.log(token);
      await Google.logOutAsync({ accessToken: token, iosClientId }).then(
        dispatch({ type: LOG_OUT })
      );
    }
    dispatch({ type: LOG_OUT });
  };
};
