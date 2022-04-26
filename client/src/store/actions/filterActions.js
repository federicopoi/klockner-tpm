import { GET_FILTERS, CARGANDO_FILTERS, AGREGAR_FILTER } from "./types";

import { returnErrors } from "./errorActions";
import axios from "axios";

export const getFilters = () => (dispatch) => {
  dispatch(cargandoFilters());
  axios
    .get("/api/filters")
    .then((res) =>
      dispatch({
        type: GET_FILTERS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const agregarFilter = (filter) => (dispatch) => {
  axios.post("/api/filters", filter).then((res) =>
    dispatch({
      type: AGREGAR_FILTER,
      payload: res.data,
    })
  );
};

export const cargandoFilters = () => {
  return {
    type: CARGANDO_FILTERS,
  };
};
