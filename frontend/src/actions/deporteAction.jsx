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
    COMENZAR_EDICION_DEPORTE,
    DEPORTE_EDITADO_EXITO,
    DEPORTE_EDITADO_ERROR
} from '../types/index';

import clienteAxios from '../config/axios';
import Swal from 'sweetalert2'

// Crear nuevos deportes
export function crearNuevoDeporteAction(deporte){
    return async (dispatch) =>{
        dispatch(agregarDeporte());

        try {
            // INSERTAR EN LA API
            await clienteAxios.post('/deportes', deporte)

            //Actulizar el state
            dispatch(agregarDeporteExito(deporte));

            // Alerta
            Swal.fire(
                'Correcto',
                'El deporte se aÃ±adio correctamente',
                'success'
            )
        } catch (error) {
            console.log(error);
            dispatch(agregarDeporteError(true));

            //Alerta de error
            Swal.fire({
                icon:'error',
                title:"Hubo un error",
                text:"hubo un error, intentar nuevamente",
            })
        }
    }


}

const agregarDeporte = () =>({
    type: AGREGAR_DEPORTE,
    payload: true
})

// si el producto se guarda en la base de datos
const agregarDeporteExito = deporte =>({
    type: AGREGAR_DEPORTE_EXITO,
    payload: deporte
})

//Si hubo un error
const agregarDeporteError = estado => ({
    type: AGREGAR_DEPORTE_ERROR,
    payload: estado
})

// Funcion que descarga los deportes de la base de datos
export function obtenerDeportesAction(){
    return async (dispatch) => {
        dispatch(descargarDeportes());

        try {
            const respuesta = await clienteAxios.get('/deportes');
            dispatch(descargarDeportesExitosa(respuesta.data))
        } catch {
           dispatch(descargarDeportesError()) 
        }
    }
}

const descargarDeportes = () =>({
    type: COMENZAR_DESCARGA_DEPORTES,
    payload: true,
})

const descargarDeportesExitosa = deportes =>({
    type: DESCARGA_DEPORTES_EXITO,
    payload: deportes,
})
const descargarDeportesError = () =>({
    type: DESCARGA_DEPORTE_ERROR,
    payload: true

})

// Selecciona y elimina el producto
export function borrarDeporteAction(id){
    return async (dispatch) =>{
        dispatch(obtenerDeporteEliminar());
        try {
            await clienteAxios.delete(`/deportes/${id}`   );
            dispatch(eliminarDeporteExito());
        } catch (error) {
            console.log(error);
            dispatch(eliminarDeporteError());
        }
    }
}

export const obtenerDeporteEliminar =id =>({
    type: OBTENER_DEPORTE_ELIMINAR,
    payload: id
});

const eliminarDeporteExito = () =>({
    type: DEPORTE_ELIMINADO_EXITO
})

const eliminarDeporteError = () =>({
    type: DEPORTE_ELIMINADO_ERROR,
    payload: true
})

// Edita un registro en la api y state
export function editarDeporteAction(data) {
    const {id} = data
    return async (dispatch) => {
        dispatch( editarDeporte() );

        try {
            await clienteAxios.put(`/deportes/${id}`, data.deporte);    
            dispatch( editarDeporteExito(data.deporte) );
        } catch (error) {
            console.log(error);
            dispatch( editarDeporteError() );
        }
    }
}
const editarDeporte = () => ({
    type: COMENZAR_EDICION_DEPORTE
});

const editarDeporteExito = deporte => ({
    type: DEPORTE_EDITADO_EXITO,
    payload: deporte
});

const editarDeporteError = () => ({
    type: DEPORTE_EDITADO_ERROR,
    payload: true
})