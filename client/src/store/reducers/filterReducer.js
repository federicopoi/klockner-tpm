import {
  GET_FILTERS,
  CARGANDO_FILTERS,
  AGREGAR_FILTER,
} from "../actions/types";
const initState = {
  filters: [],
  cargando: false,
  agregarsuccessfilter: false,
};

export default function (state = initState, action) {
  switch (action.type) {
    case GET_FILTERS:
      return {
        ...state,
        filters: action.payload,
        cargando: false,
        agregarsuccessfilter: false,
      };
    case AGREGAR_FILTER:
      return {
        ...state,
        filters: [action.payload, ...state.filters],
        agregarsuccessfilter: true,
      };

    case CARGANDO_FILTERS:
      return {
        ...state,
        cargando: true,
      };
    default:
      return state;
  }
}
