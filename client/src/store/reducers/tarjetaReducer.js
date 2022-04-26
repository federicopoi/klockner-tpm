import {
  GET_TARJETAS,
  CARGANDO_TARJETAS,
  AGREGAR_TARJETA,
  CERRAR_TARJETA,
  BORRAR_TARJETA,
  AGREGAR_TARJETA_AMARILLA,
  CERRAR_TARJETA_AMARILLA,
  EDITAR_TARJETA,
  AGREGAR_PLANIFICACION,
  AGREGAR_IMAGEN,
} from "../actions/types";
const initState = {
  tarjetas: [],
  cargando: false,
  agregarsuccess: false,
  tarjetaActualId: "",
};

export default function (state = initState, action) {
  switch (action.type) {
    case GET_TARJETAS:
      return {
        ...state,
        tarjetas: action.payload,
        cargando: false,
        agregarsuccess: false,
        tarjetaActualId: "",
      };
    case AGREGAR_TARJETA:
    case AGREGAR_TARJETA_AMARILLA:
      return {
        ...state,
        tarjetas: [action.payload, ...state.tarjetas],
        agregarsuccess: true,
        tarjetaActualId: action.payload._id,
      };
    case CERRAR_TARJETA:
    case CERRAR_TARJETA_AMARILLA:
    case EDITAR_TARJETA:
      return Object.assign({}, state, {
        tarjetas: state.tarjetas.map((tarjeta) => {
          return tarjeta._id === action.payload._id ? action.payload : tarjeta;
        }), // replace matched item and returns the array
        agregarsuccess: true,
      });
    case BORRAR_TARJETA:
      return {
        ...state,
        tarjetas: state.tarjetas.filter(
          (tarjeta) => tarjeta._id !== action.payload
        ),
      };
    case CARGANDO_TARJETAS:
      return {
        ...state,
        cargando: true,
      };
    case AGREGAR_PLANIFICACION:
      return {
        ...state,
        tarjetas: [action.payload],
      };
    case AGREGAR_IMAGEN:
      return {
        ...state,
        tarjetas: [action.payload],
      };
    default:
      return state;
  }
}
