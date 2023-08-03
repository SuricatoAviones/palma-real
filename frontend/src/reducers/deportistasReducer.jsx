// Cada reducer tiene su propio state
import{
    AGREGAR_DEPORTISTA,
    AGREGAR_DEPORTISTA_EXITO,
    AGREGAR_DEPORTISTA_ERROR,
    COMENZAR_DESCARGA_DEPORTISTAS,
    DESCARGA_DEPORTISTAS_EXITO,
    DESCARGA_DEPORTISTA_ERROR,
    OBTENER_DEPORTISTA_ELIMINAR,
    DEPORTISTA_ELIMINADO_EXITO,
    DEPORTISTA_ELIMINADO_ERROR,
    OBTENER_DEPORTISTA_EDITAR,
    DEPORTISTA_EDITADO_EXITO,
    DEPORTISTA_EDITADO_ERROR
} from '../types/index'


const initialState = {
    deportistas: [],
    error: null,
    loading: false,
    deportistaeliminar:null,
    deportistaeditar:null
    
}


export default function(state =  initialState, action){
    switch(action.type){
        case COMENZAR_DESCARGA_DEPORTISTAS:
        case AGREGAR_DEPORTISTA:
            return{
                ...state,
                loading: action.payload
            }
        case AGREGAR_DEPORTISTA_EXITO:
            return{
                ...state,
                loading:false,
                deportistass:[...state.deportistas, action.payload]
            }
        case AGREGAR_DEPORTISTA_ERROR:
        case DESCARGA_DEPORTISTA_ERROR:
        case DEPORTISTA_ELIMINADO_ERROR:
        case DEPORTISTA_EDITADO_ERROR:            
                return{
                    ...state,
                    loading:false,
                    error: action.payload
                }                    
        case DESCARGA_DEPORTISTAS_EXITO:
            return{
                ...state,
                loading:false,
                error: null,
                deportistas: action.payload
            }
        case OBTENER_DEPORTISTA_ELIMINAR:
            return{
                ...state,
                deportistaeliminar: action.payload
            }
        case DEPORTISTA_ELIMINADO_EXITO:
            return{
                ...state.deportistas.filter(deportista => deportista.id !== state.deportistaeliminar),
                deporteeliminar: null
            }
            case  OBTENER_DEPORTISTA_EDITAR:
                return {
                    ...state,
                    deportistaeditar: action.payload
                }
            case DEPORTISTA_EDITADO_EXITO:
                return {
                    ...state,
                    deportistaeditar: null,
                    deportistas: state.deportistas.map( deportista => 
                        deportista.id === action.payload.id ? deportista = action.payload : deportista
                    )
                }        
        default:
            return state;
    }
}