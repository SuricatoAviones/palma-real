// Cada reducer tiene su propio state
import{
    AGREGAR_SOCIO,
    AGREGAR_SOCIO_EXITO,
    AGREGAR_SOCIO_ERROR,
    COMENZAR_DESCARGA_SOCIOS,
    DESCARGA_SOCIOS_EXITO,
    DESCARGA_SOCIO_ERROR,
    SOCIO_ELIMINADO_ERROR,
    OBTENER_SOCIO_ELIMINAR,
    SOCIO_ELIMINADO_EXITO,
    OBTENER_SOCIO_EDITAR,
    SOCIO_EDITADO_EXITO,
    SOCIO_EDITADO_ERROR
} from '../types/index'


const initialState = {
    socios: [],
    error: null,
    loading: false,
    socioeditar:null,
    socioeliminar:null
}


export default function sociosReducer(state = initialState, action) {
    switch(action.type){
        case COMENZAR_DESCARGA_SOCIOS:
        case AGREGAR_SOCIO:
            return{
                ...state,
                loading: action.payload
            }
        case AGREGAR_SOCIO_EXITO:
            return{
                ...state,
                loading:false,
                deportes:[...state.deportes, action.payload]
            }
        case AGREGAR_SOCIO_ERROR:
        case DESCARGA_SOCIO_ERROR:
        case SOCIO_ELIMINADO_ERROR: 
        case SOCIO_EDITADO_ERROR:       
                return{
                    ...state,
                    loading:false,
                    error: action.payload
                }                    
        case DESCARGA_SOCIOS_EXITO:
            return{
                ...state,
                loading:false,
                error: null,
                socios: action.payload
            }
        case OBTENER_SOCIO_ELIMINAR:
              return{
                ...state,
                   socioeliminar: action.payload
                }
         case SOCIO_ELIMINADO_EXITO:
              return{
                   ...state.socio.filter(socio => socio.id !== state.socioeliminar),
                   socioeliminar: null
              }
              case  OBTENER_SOCIO_EDITAR:
                return {
                    ...state,
                    socioeditar: action.payload
                }
            case SOCIO_EDITADO_EXITO:
                return {
                    ...state,
                    socioeditar: null,
                socios: state.socios.map( socio => 
                        socio.id === action.payload.id ? socio = action.payload : socio
                    )
                }           
        default:
            return state;
    }
}