import{
    AGREGAR_ALQUILER,
    AGREGAR_ALQUILER_EXITO,
    AGREGAR_ALQUILER_ERROR,
    COMENZAR_DESCARGA_ALQUILERES,
    DESCARGA_ALQUILERES_EXITO,
    DESCARGA_ALQUILER_ERROR,
    OBTENER_ALQUILER_ELIMINAR,
    ALQUILER_ELIMINADO_EXITO,
    ALQUILER_ELIMINADO_ERROR,
    ALQUILER_EDITADO_ERROR,
    ALQUILER_EDITADO_EXITO,
    COMENZAR_EDICION_ALQUILER,
    OBTENER_ALQUILER_EDITAR
    
} from '../types/index';

import clienteAxios from '../config/axios';
import Swal from 'sweetalert2'

// Crear nuevos deportes
export function crearNuevoAlquilerAction(alquiler){
    return async (dispatch) =>{
        dispatch(agregarAlquiler());

        try {
            // INSERTAR EN LA API
            await clienteAxios.post('/alquiler-churuatas', alquiler)

            //Actulizar el state
            dispatch(agregarAlquilerExito(alquiler));

            // Alerta
            Swal.fire(
                'Correcto',
                'El alquiler se añadio correctamente',
                'success'
            )
        } catch (error) {
            console.log(error);
            dispatch(agregarAlquilerError(true));

            //Alerta de error
            Swal.fire({
                icon:'error',
                title:"Hubo un error",
                text:"hubo un error, intentar nuevamente",
            })
        }
    }


}

const agregarAlquiler = () =>({
    type: AGREGAR_ALQUILER,
    payload: true
})

// si el producto se guarda en la base de datos
const agregarAlquilerExito = alquiler =>({
    type: AGREGAR_ALQUILER_EXITO,
    payload: alquiler
})

//Si hubo un error
const agregarAlquilerError = estado => ({
    type: AGREGAR_ALQUILER_ERROR,
    payload: estado
})

// Funcion que descarga los alquileres de la base de datos
export function obtenerAlquileresAction(){
    return async (dispatch) => {
        dispatch(descargarAlquileres());

        try {
            const respuesta = await clienteAxios.get('/alquiler-churuatas');
            dispatch(descargarAlquileresExitosa(respuesta.data))
        } catch (error) {
           dispatch(descargarAlquileresError()) 
        }
    }
}

const descargarAlquileres = () =>({
    type: COMENZAR_DESCARGA_ALQUILERES,
    payload: true,
})

const descargarAlquileresExitosa = alquileres =>({
    type: DESCARGA_ALQUILERES_EXITO,
    payload: alquileres,
})
const descargarAlquileresError = () =>({
    type: DESCARGA_ALQUILER_ERROR,
    payload: true

})

// Selecciona y elimina el producto
export function borrarAlquilerAction(id){
    return async (dispatch) =>{
        dispatch(obtenerAlquilerEliminar());
        try {
            await clienteAxios.delete(`/alquiler-churuatas/${id}`   );
            dispatch(eliminarAlquilerExito());
        } catch (error) {
            console.log(error);
            dispatch(eliminarAlquilerError());
        }
    }
}

export const obtenerAlquilerEliminar =id =>({
    type: OBTENER_ALQUILER_ELIMINAR,
    payload: id
});

const eliminarAlquilerExito = () =>({
    type: ALQUILER_ELIMINADO_EXITO
})

const eliminarAlquilerError = () =>({
    type: ALQUILER_ELIMINADO_ERROR,
    payload: true
})

// Colocar producto en edición
export function obtenerAlquilerEditar(alquiler) {
    return (dispatch) => {
        dispatch( obtenerAlquilerEditarAction(alquiler) )
    }
}

const obtenerAlquilerEditarAction = alquiler => ({
    type: OBTENER_ALQUILER_EDITAR,
    payload: alquiler
})

// Edita un registro en la api y state
export function editarAlquilerAction(alquiler) {
    return async (dispatch) => {
        dispatch( editarAlquiler() );

        try {
            await clienteAxios.put(`/alquiler-churuatas/${alquiler.id}`, alquiler);    
            dispatch( editarAlquilerExito(alquiler) );
        } catch (error) {
            console.log(error);
            dispatch( editarAlquilerError() );
        }
    }
}
const editarAlquiler = () => ({
    type: COMENZAR_EDICION_ALQUILER
});

const editarAlquilerExito = alquiler => ({
    type: ALQUILER_EDITADO_EXITO,
    payload: alquiler
});

const editarAlquilerError = () => ({
    type: ALQUILER_EDITADO_ERROR,
    payload: true
})
