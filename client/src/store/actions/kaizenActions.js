import {
  GET_KAIZEN,
  AGREGAR_KAIZEN,
  CARGANDO_KAIZEN,
  CERRAR_KAIZEN,
  BORRAR_KAIZEN,
  TARJETASHACER_KAIZEN,
  AGREGAR_IMAGEN_FRONT,
  AGREGAR_IMAGEN_BACK,
  EDITAR_KAIZEN,
} from "./types";

import { returnErrors } from "./errorActions";
import axios from "axios";

export const getKaizen = () => (dispatch) => {
  dispatch(cargandoKaizen());
  axios
    .get("/api/tarjetaskaizen")
    .then((res) =>
      dispatch({
        type: GET_KAIZEN,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const agregarKaizen = (kaizen) => (dispatch, getState) => {
  axios
    .post("/api/tarjetaskaizen", kaizen)
    .then((res) =>
      dispatch({
        type: AGREGAR_KAIZEN,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch(
        returnErrors(
          err.response.data,
          err.response.status,
          "AGREGAR_KAIZEN_ERROR"
        )
      )
    );
};
export const cerrarKaizen = (kaizen) => (dispatch, getState) => {
  axios
    .post("/api/tarjetaskaizen/cerrar", kaizen)
    .then((res) =>
      dispatch({
        type: CERRAR_KAIZEN,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch(
        returnErrors(
          err.response.data,
          err.response.status,
          "CERRAR_KAIZEN_ERROR"
        )
      )
    );
};
export const editarKaizen = (kaizen) => (dispatch) => {
  axios
    .post("/api/tarjetaskaizen/editarkaizen", kaizen)
    .then((res) =>
      dispatch({
        type: EDITAR_KAIZEN,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch(
        returnErrors(
          err.response.data,
          err.response.status,
          "EDITAR_KAIZEN_ERROR"
        )
      )
    );
};
export const cargandoKaizen = () => {
  return {
    type: CARGANDO_KAIZEN,
  };
};
export const borrarKaizen = (id) => (dispatch) => {
  axios
    .delete(`/api/tarjetaskaizen/${id}`)
    .then((res) =>
      dispatch({
        type: BORRAR_KAIZEN,
        payload: id,
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};
export const tarjetasHacer = (kaizen) => (dispatch) => {
  axios.post("/api/tarjetaskaizen/tarjetasHacer", kaizen).then((res) =>
    dispatch({
      type: TARJETASHACER_KAIZEN,
      payload: res.data,
    })
  );
};

export const agregarImagenFront = (imagen) => (dispatch) => {
  axios
    .post("/api/tarjetaskaizen/agregarimagenfront", imagen)
    .then((res) =>
      dispatch({
        type: AGREGAR_IMAGEN_FRONT,
        payload: res.data,
      })
    )
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};
export const agregarImagenBack = (imagen) => (dispatch) => {
  axios
    .post("/api/tarjetaskaizen/agregarimagenback", imagen)
    .then((res) =>
      dispatch({
        type: AGREGAR_IMAGEN_BACK,
        payload: res.data,
      })
    )
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};
