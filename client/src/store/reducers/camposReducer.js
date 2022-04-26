import {
  GET_CAMPOS,
  CARGANDO_CAMPOS,
  AGREGAR_CAMPOS,
  BORRAR_CAMPO,
  PARTE_MAQUINA,
  PARTE_MAQUINA_DELETE,
} from "../actions/types";
const initState = {
  campos: [],
  cargando: false,
  agregarsuccesscampos: false,
};

export default function (state = initState, action) {
  switch (action.type) {
    case GET_CAMPOS:
      return {
        ...state,
        campos: action.payload,
        cargando: false,
        agregarsuccesscampos: false,
      };
    case AGREGAR_CAMPOS:
    case PARTE_MAQUINA:
      return {
        ...state,
        campos: [action.payload, ...state.campos],
        agregarsuccesscampos: true,
      };
    case PARTE_MAQUINA_DELETE:
      return {
        ...state,
        campos: [
          action.payload,
          ...state.campos.filter((campo) => campo._id !== action.payload._id),
        ],
      };
    case BORRAR_CAMPO:
      return {
        ...state,
        campos: state.campos.filter((campo) => campo._id !== action.payload),
      };
    case CARGANDO_CAMPOS:
      return {
        ...state,
        cargando: true,
      };
    default:
      return state;
  }
}
