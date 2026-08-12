// Cada reducer tiene su propio state
import{
    AGREGAR_CHURUATA,
    AGREGAR_CHURUATA_EXITO,
    AGREGAR_CHURUATA_ERROR,
    COMENZAR_DESCARGA_CHURUATAS,
    DESCARGA_CHURUATAS_EXITO,
    DESCARGA_CHURUATA_ERROR,
    OBTENER_CHURUATA_ELIMINAR,
    CHURUATA_ELIMINADO_EXITO,
    CHURUATA_ELIMINADO_ERROR,
    CHURUATA_EDITADO_EXITO,
    OBTENER_CHURUATA_EDITAR,
    CHURUATA_EDITADO_ERROR
} from '../types/index'


const initialState = {
    churuatas: [],
    error: null,
    loading: false,
    churuataeliminar: null
}


export default function churuatasReducer(state = initialState, action) {
    switch(action.type){
        case COMENZAR_DESCARGA_CHURUATAS:
        case AGREGAR_CHURUATA:
            return{
                ...state,
                loading: action.payload
            }
        case AGREGAR_CHURUATA_EXITO:
            return{
                ...state,
                loading:false,
                churuatas:[...state.churuatas, action.payload]
            }
        case AGREGAR_CHURUATA_ERROR:
        case DESCARGA_CHURUATA_ERROR:
        case CHURUATA_ELIMINADO_ERROR:
        case CHURUATA_EDITADO_ERROR:           
                return{
                    ...state,
                    loading:false,
                    error: action.payload
                }                    
        case DESCARGA_CHURUATAS_EXITO:
            return{
                ...state,
                loading:false,
                error: null,
                churuatas: action.payload
            }
        case OBTENER_CHURUATA_ELIMINAR:
            return{
                ...state,
                churuataeliminar: action.payload
                }
        case CHURUATA_ELIMINADO_EXITO:
            return{
                ...state.churuatas.filter(churuata => churuata.id !== state.churuataeliminar),
                churuataeliminar: null
                }
          case  OBTENER_CHURUATA_EDITAR:
               return {
                ...state,
                 churuataeditar: action.payload
             }
         case CHURUATA_EDITADO_EXITO:
              return {
                  ...state,
                 churuataeditar: null,
                 churuatas: state.churuatas.map( churuata => 
                    churuata.id === action.payload.id ? churuata = action.payload : churuata
                   )
             }                    
        default:
            return state;
    }
}