// Cada reducer tiene su propio state
import{
    AGREGAR_DEPORTE,
    AGREGAR_DEPORTE_EXITO,
    AGREGAR_DEPORTE_ERROR,
    COMENZAR_DESCARGA_DEPORTES,
    DESCARGA_DEPORTES_EXITO,
    DESCARGA_DEPORTE_ERROR,
    OBTENER_DEPORTE_ELIMINAR,
    DEPORTE_ELIMINADO_ERROR,
    DEPORTE_ELIMINADO_EXITO,
    DEPORTE_EDITADO_EXITO,
    OBTENER_DEPORTE_EDITAR,
    DEPORTE_EDITADO_ERROR
} from '../types/index'


const initialState = {
    deportes: [],
    error: null,
    loading: false,
    deporteeliminar:null,
    deporteeditar:null
}


export default function deportesReducer(state = initialState, action) {
    switch(action.type){
        case COMENZAR_DESCARGA_DEPORTES:
        case AGREGAR_DEPORTE:
            return{
                ...state,
                loading: action.payload
            }
        case AGREGAR_DEPORTE_EXITO:
            return{
                ...state,
                loading:false,
                deportes:[...state.deportes, action.payload]
            }
        case AGREGAR_DEPORTE_ERROR:
        case DESCARGA_DEPORTE_ERROR:
        case DEPORTE_ELIMINADO_ERROR: 
        case DEPORTE_EDITADO_ERROR:       
                return{
                    ...state,
                    loading:false,
                    error: action.payload
                }                    
        case DESCARGA_DEPORTES_EXITO:
            return{
                ...state,
                loading:false,
                error: null,
                deportes: action.payload
            }
        case OBTENER_DEPORTE_ELIMINAR:
            return{
                ...state,
                deporteeliminar: action.payload
            }
        case DEPORTE_ELIMINADO_EXITO:
            return{
                ...state.deportes.filter(deporte => deporte.id !== state.deporteeliminar),
                deporteeliminar: null
            }
        case  OBTENER_DEPORTE_EDITAR:
            return {
                  ...state,
                 alquilereditar: action.payload
                }
         case DEPORTE_EDITADO_EXITO:
             return {
                 ...state,
                deporteeditar: null,
                 deportes: state.deportes.map( deporte => 
                      deporte.id === action.payload.id ? deporte = action.payload : deporte
                  )
            }            
        default:
            return state;
    }
}