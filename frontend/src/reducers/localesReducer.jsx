// Cada reducer tiene su propio state
import{
    AGREGAR_LOCAL,
    AGREGAR_LOCAL_EXITO,
    AGREGAR_LOCAL_ERROR,
    COMENZAR_DESCARGA_LOCALES,
    DESCARGA_LOCALES_EXITO,
    DESCARGA_LOCAL_ERROR,
    OBTENER_LOCAL_ELIMINAR,
    LOCAL_ELIMINADO_EXITO,
    LOCAL_ELIMINADO_ERROR,
    LOCAL_EDITADO_EXITO,
    OBTENER_LOCAL_EDITAR
} from '../types/index'


const initialState = {
    locales: [],
    error: null,
    loading: false,
    localeliminar: null,
    localeditar: null
}


export default function(state =  initialState, action){
    switch(action.type){
        case COMENZAR_DESCARGA_LOCALES:
        case AGREGAR_LOCAL:
            return{
                ...state,
                loading: action.payload
            }
        case AGREGAR_LOCAL_EXITO:
            return{
                ...state,
                loading:false,
                locales:[...state.locales, action.payload]
            }
        case AGREGAR_LOCAL_ERROR:
        case DESCARGA_LOCAL_ERROR:
        case LOCAL_ELIMINADO_ERROR:    
                return{
                    ...state,
                    loading:false,
                    error: action.payload
                }                    
        case DESCARGA_LOCALES_EXITO:
            return{
                ...state,
                loading:false,
                error: null,
                locales: action.payload
            }
        case OBTENER_LOCAL_ELIMINAR:
              return{
                  ...state,
                 localeliminar: action.payload
               }
         case LOCAL_ELIMINADO_EXITO:
              return{
                   ...state.locales.filter(local => local.id !== state.localeliminar),
                   localeliminar: null
              }
            case  OBTENER_LOCAL_EDITAR:
             return {
                  ...state,
                   localeditar: action.payload
             }
          case LOCAL_EDITADO_EXITO:
             return {
                 ...state,
                localeditar: null,
                locales: state.locales.map( local => 
                    local.id === action.payload.id ? local = action.payload : local
                   )
            }           
        default:
            return state;
    }
}