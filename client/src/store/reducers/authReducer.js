import {
  USER_LOADING,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
} from "../actions/types";

const initState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  success: false,
  isLoading: false,
  user: null,
};
export default function (state = initState, action) {
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        success: false,
        isLoading: true,
      };
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        success: false,
        user: action.payload,
      };
    case LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        ...action.payload,
        success: false,
        isAuthenticated: true,
        isLoading: false,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        success: true,
      };
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT_SUCCESS:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        success: false,
        user: null,
        isAuthenticated: false,
        isLoading: false,
      };
    default:
      return state;
  }
}
