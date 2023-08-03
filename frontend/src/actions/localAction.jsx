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
    COMENZAR_EDICION_LOCAL,
    LOCAL_EDITADO_EXITO,
    LOCAL_EDITADO_ERROR
} from '../types/index';

import clienteAxios from '../config/axios';
import Swal from 'sweetalert2'

// Crear nuevos deportes
export function crearNuevoLocalAction(local){
    return async (dispatch) =>{
        dispatch(agregarLocal());

        try {
            // INSERTAR EN LA API
            await clienteAxios.post('/locales', local)

            //Actulizar el state
            dispatch(agregarLocalExito(local));

            // Alerta
            Swal.fire(
                'Correcto',
                'El Local se añadio correctamente',
                'success'
            )
        } catch (error) {
            console.log(error);
            dispatch(agregarLocalError(true));

            //Alerta de error
            Swal.fire({
                icon:'error',
                title:"Hubo un error",
                text:"hubo un error, intentar nuevamente",
            })
        }
    }


}

const agregarLocal = () =>({
    type: AGREGAR_LOCAL,
    payload: true
})

// si el producto se guarda en la base de datos
const agregarLocalExito = local =>({
    type: AGREGAR_LOCAL_EXITO,
    payload: local
})

//Si hubo un error
const agregarLocalError = estado => ({
    type: AGREGAR_LOCAL_ERROR,
    payload: estado
})

// Funcion que descarga los deportes de la base de datos
export function obtenerLocalesAction(){
    return async (dispatch) => {
        dispatch(descargarLocales());

        try {
            const respuesta = await clienteAxios.get('/locales');
            dispatch(descargarLocalesExitosa(respuesta.data))
        } catch (error) {
           dispatch(descargarLocalesError()) 
        }
    }
}

const descargarLocales = () =>({
    type: COMENZAR_DESCARGA_LOCALES,
    payload: true,
})

const descargarLocalesExitosa = locales =>({
    type: DESCARGA_LOCALES_EXITO,
    payload: locales,
})
const descargarLocalesError = () =>({
    type: DESCARGA_LOCAL_ERROR,
    payload: true

})


// Selecciona y elimina el producto
export function borrarLocalAction(id){
    return async (dispatch) =>{
        dispatch(obtenerLocalEliminar());
        try {
            await clienteAxios.delete(`/locales/${id}`   );
            dispatch(eliminarLocalExito());
        } catch (error) {
            console.log(error);
            dispatch(eliminarLocalError());
        }
    }
}

export const obtenerLocalEliminar =id =>({
    type: OBTENER_LOCAL_ELIMINAR,
    payload: id
});

const eliminarLocalExito = () =>({
    type: LOCAL_ELIMINADO_EXITO
})

const eliminarLocalError = () =>({
    type: LOCAL_ELIMINADO_ERROR,
    payload: true
})

// Edita un registro en la api y state
export function editarLocalAction(local) {
    return async (dispatch) => {
        dispatch( editarLocal() );

        try {
            await clienteAxios.put(`/locales/${local.id}`, local);    
            dispatch( editarLocalExito(local) );
        } catch (error) {
            console.log(error);
            dispatch( editarLocalError() );
        }
    }
}
const editarLocal = () => ({
    type: COMENZAR_EDICION_LOCAL
});

const editarLocalExito = alquiler => ({
    type: LOCAL_EDITADO_EXITO,
    payload: alquiler
});

const editarLocalError = () => ({
    type: LOCAL_EDITADO_ERROR,
    payload: true
})