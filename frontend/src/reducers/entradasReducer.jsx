// Cada reducer tiene su propio state
import{
    AGREGAR_ENTRADA,
    AGREGAR_ENTRADA_EXITO,
    AGREGAR_ENTRADA_ERROR,
    COMENZAR_DESCARGA_ENTRADAS,
    DESCARGA_ENTRADAS_EXITO,
    DESCARGA_ENTRADA_ERROR,
    OBTENER_ENTRADA_ELIMINAR,
    ENTRADA_ELIMINADO_EXITO,
    ENTRADA_ELIMINADO_ERROR,
    ENTRADA_EDITADO_EXITO,
    OBTENER_ENTRADA_EDITAR,
    ENTRADA_EDITADO_ERROR
} from '../types/index'


const initialState = {
    entradas: [],
    error: null,
    loading: false,
    entradaeliminar: null,
    entradaeditar:null
}


export default function entradasReducer(state = initialState, action) {
    switch(action.type){
        case COMENZAR_DESCARGA_ENTRADAS:
        case AGREGAR_ENTRADA:
            return{
                ...state,
                loading: action.payload
            }
        case AGREGAR_ENTRADA_EXITO:
            return{
                ...state,
                loading:false,
                deportes:[...state.entradas, action.payload]
            }
        case AGREGAR_ENTRADA_ERROR:
        case DESCARGA_ENTRADA_ERROR:
        case ENTRADA_ELIMINADO_ERROR:
        case ENTRADA_EDITADO_ERROR:            
                return{
                    ...state,
                    loading:false,
                    error: action.payload
                }                    
        case DESCARGA_ENTRADAS_EXITO:
            return{
                ...state,
                loading:false,
                error: null,
                entradas: action.payload
            }
        case OBTENER_ENTRADA_ELIMINAR:
            return{
                 ...state,
                entradaeliminar: action.payload
            }
        case ENTRADA_ELIMINADO_EXITO:
            return{
                ...state.entradas.filter(entrada => entrada.id !== state.entradaeliminar),
                entradaeliminar: null
            }
            case  OBTENER_ENTRADA_EDITAR:
                return {
                    ...state,
                    entradaeditar: action.payload
                }
            case ENTRADA_EDITADO_EXITO:
                return {
                    ...state,
                    entradaeditar: null,
                    entradas: state.entradas.map( entrada => 
                        entrada.id === action.payload.id ? entrada = action.payload : entrada
                    )
                }          
        default:
            return state;
    }
}