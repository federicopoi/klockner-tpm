import {
  GET_USERS,
  USERS_LOADING,
  BORRAR_USER,
  CAMBIAR_ROL,
  AGREGAR_HORAS,
} from "./types";
import { tokenConfig } from "./authActions";
import { returnErrors } from "./errorActions";
import axios from "axios";

// Get All users
export const getUsers = () => (dispatch) => {
  dispatch(setUsersLoading());
  axios
    .get("/api/users")
    .then((res) =>
      dispatch({
        type: GET_USERS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const borrarUser = (id) => (dispatch) => {
  axios
    .delete(`/api/users/${id}`)
    .then((res) =>
      dispatch({
        type: BORRAR_USER,
        payload: id,
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const cambiarRol = (newUser) => (dispatch) => {
  axios
    .post("/api/users/cambiarrol", newUser)
    .then((res) =>
      dispatch({
        type: CAMBIAR_ROL,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch(
        returnErrors(
          err.response.data,
          err.response.status,
          "CAMBIAR_ROL_ERROR"
        )
      )
    );
};
export const agregarHoras = (user) => (dispatch) => {
  axios.post("/api/users/hours", user).then((res) =>
    dispatch({
      type: AGREGAR_HORAS,
      payload: res.data,
    })
  );
};

export const setUsersLoading = () => {
  return {
    type: USERS_LOADING,
  };
};
