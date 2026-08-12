// Cada reducer tiene su propio state
import{
    AGREGAR_ALQUILER,
    AGREGAR_ALQUILER_EXITO,
    AGREGAR_ALQUILER_ERROR,
    COMENZAR_DESCARGA_ALQUILERES,
    DESCARGA_ALQUILERES_EXITO,
    DESCARGA_ALQUILER_ERROR,
    OBTENER_ALQUILER_ELIMINAR,
    ALQUILER_ELIMINADO_ERROR,
    ALQUILER_ELIMINADO_EXITO,
    OBTENER_ALQUILER_EDITAR,
    ALQUILER_EDITADO_EXITO,
    ALQUILER_EDITADO_ERROR
} from '../types/index'


const initialState = {
    alquileres: [],
    error: null,
    loading: false,
    alquilereliminar:null,
    alquilereditar: null
}


export default function alquileresReducer(state = initialState, action) {
    switch(action.type){
        case COMENZAR_DESCARGA_ALQUILERES:
        case AGREGAR_ALQUILER:
            return{
                ...state,
                loading: action.payload
            }
        case AGREGAR_ALQUILER_EXITO:
            return{
                ...state,
                loading:false,
            alquileres:[...state.alquileres, action.payload]
            }
        case AGREGAR_ALQUILER_ERROR:
        case DESCARGA_ALQUILER_ERROR:
        case ALQUILER_ELIMINADO_ERROR:
        case ALQUILER_EDITADO_ERROR:            
                return{
                    ...state,
                    loading:false,
                    error: action.payload
                }                    
        case DESCARGA_ALQUILERES_EXITO:
            return{
                ...state,
                loading:false,
                error: null,
                alquileres: action.payload
            }
        case OBTENER_ALQUILER_ELIMINAR:
            return{
                ...state,
                alquilereliminar: action.payload
            }
        case ALQUILER_ELIMINADO_EXITO:
            return{
                ...state.alquileres.filter(alquiler =>alquiler.id !== state.alquilereliminar),
            alquilereliminar: null
            }
        case  OBTENER_ALQUILER_EDITAR:
            return {
                ...state,
                alquilereditar: action.payload
            }
        case ALQUILER_EDITADO_EXITO:
            return {
                ...state,
                alquilereditar: null,
                alquileres: state.alquileres.map( alquiler => 
                alquiler.id === action.payload.id ? alquiler = action.payload : alquiler
                )
            }            
        default:
            return state;
    }
}