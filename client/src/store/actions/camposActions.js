import {
  GET_CAMPOS,
  CARGANDO_CAMPOS,
  AGREGAR_CAMPOS,
  BORRAR_CAMPO,
  PARTE_MAQUINA,
  PARTE_MAQUINA_DELETE,
} from "./types";
import { returnErrors } from "./errorActions";
import axios from "axios";

export const getCampos = () => (dispatch) => {
  dispatch(cargandoCampos());
  axios
    .get("/api/campos")
    .then((res) =>
      dispatch({
        type: GET_CAMPOS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const agregarCampos = (campos) => (dispatch) => {
  axios.post("/api/campos", campos).then((res) =>
    dispatch({
      type: AGREGAR_CAMPOS,
      payload: res.data,
    })
  );
};

export const parteMaquina = (campos) => (dispatch) => {
  axios.post("/api/campos/parteMaquina", campos).then((res) =>
    dispatch({
      type: PARTE_MAQUINA,
      payload: res.data,
    })
  );
};

export const parteMaquinaDelete = (campos) => (dispatch) => {
  axios.post("/api/campos/parteMaquinaDelete", campos).then((res) =>
    dispatch({
      type: PARTE_MAQUINA_DELETE,
      payload: res.data,
    })
  );
};

export const borrarCampo = (id) => (dispatch) => {
  axios
    .delete(`/api/campos/${id}`)
    .then((res) =>
      dispatch({
        type: BORRAR_CAMPO,
        payload: id,
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const cargandoCampos = () => {
  return {
    type: CARGANDO_CAMPOS,
  };
};
