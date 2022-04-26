import {
  GET_KAIZEN,
  CARGANDO_KAIZEN,
  AGREGAR_KAIZEN,
  CERRAR_KAIZEN,
  BORRAR_TARJETA,
  TARJETASHACER_KAIZEN,
  AGREGAR_IMAGEN_BACK,
  AGREGAR_IMAGEN_FRONT,
  EDITAR_KAIZEN,
} from "../actions/types";
const initState = {
  tarjetaskaizen: [],
  cargando: false,
  agregarsuccess: false,
  tarjetaActualId: "",
};

export default function (state = initState, action) {
  switch (action.type) {
    case GET_KAIZEN:
      return {
        ...state,
        tarjetaskaizen: action.payload,
        cargando: false,
        agregarsuccess: false,
        tarjetaActualId: "",
      };
    case TARJETASHACER_KAIZEN:
      return {
        ...state,
        tarjetaskaizen: state.tarjetaskaizen.map((kaizen) => {
          return kaizen._id === action.payload._id ? action.payload : kaizen;
        }), // replace matched item and returns the array
      };
    case AGREGAR_KAIZEN:
      return {
        ...state,
        tarjetaskaizen: [action.payload, ...state.tarjetaskaizen],
        agregarsuccess: true,
        tarjetaActualId: action.payload._id,
      };
    case CERRAR_KAIZEN:
    case EDITAR_KAIZEN:
      return Object.assign({}, state, {
        tarjetaskaizen: state.tarjetaskaizen.map((kaizen) => {
          return kaizen._id === action.payload._id ? action.payload : kaizen;
        }), // replace matched item and returns the array
        agregarsuccess: true,
      });
    case CARGANDO_KAIZEN:
      return {
        ...state,
        cargando: true,
      };
    case AGREGAR_IMAGEN_BACK:
    case AGREGAR_IMAGEN_FRONT:
      return {
        ...state,
        tarjetaskaizen: [action.payload],
      };
    case BORRAR_TARJETA:
      return {
        ...state,
        tarjetaskaizen: state.tarjetaskaizen.filter(
          (kaizen) => kaizen._id !== action.payload
        ),
      };
    default:
      return state;
  }
}
