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
    COMENZAR_EDICION_DEPORTISTA,
    DEPORTISTA_EDITADO_EXITO,
    DEPORTISTA_EDITADO_ERROR
} from '../types/index';

import clienteAxios from '../config/axios';
import Swal from 'sweetalert2'

// Crear nuevos deportes
export function crearNuevoDeportistaAction(deportista){
    return async (dispatch) =>{
        dispatch(agregarDeportista());

        try {
            // INSERTAR EN LA APista
            await clienteAxios.post('/deportistas', deportista)

            //Actulizar el state
            dispatch(agregarDeportistaExito(deportista));

            // Alerta
            Swal.fire(
                'Correcto',
                'El deportista se aÃ±adio correctamente',
                'success'
            )
        } catch (error) {
            console.log(error);
            dispatch(agregarDeportistaError(true));

            //Alerta de error
            Swal.fire({
                icon:'error',
                title:"Hubo un error",
                text:"hubo un error, intentar nuevamente",
            })
        }
    }


}

const agregarDeportista = () =>({
    type: AGREGAR_DEPORTISTA,
    payload: true
})

// si el producto se guarda en la base de datos
const agregarDeportistaExito = deportista =>({
    type: AGREGAR_DEPORTISTA_EXITO,
    payload: deportista
})

//Si hubo un error
const agregarDeportistaError = estado => ({
    type: AGREGAR_DEPORTISTA_ERROR,
    payload: estado
})

// Funcion que descarga los deportes de la base de datos
export function obtenerDeportistasAction(){
    return async (dispatch) => {
        dispatch(descargarDeportistas());

        try {
            const respuesta = await clienteAxios.get('/deportistas');
            dispatch(descargarDeportistasExitosa(respuesta.data))
        } catch {
           dispatch(descargarDeportistasError()) 
        }
    }
}

const descargarDeportistas = () =>({
    type: COMENZAR_DESCARGA_DEPORTISTAS,
    payload: true,
})

const descargarDeportistasExitosa = deportistas=>({
    type: DESCARGA_DEPORTISTAS_EXITO,
    payload: deportistas,
})
const descargarDeportistasError = () =>({
    type: DESCARGA_DEPORTISTA_ERROR,
    payload: true

})

// Selecciona y elimina el producto
export function borrarDeportistaAction(id){
    return async (dispatch) =>{
        dispatch(obtenerDeportistaEliminar());
        try {
            await clienteAxios.delete(`/deportistas/${id}`   );
            dispatch(eliminarDeportistaExito());
        } catch (error) {
            console.log(error);
            dispatch(eliminarDeportistaError());
        }
    }
}

export const obtenerDeportistaEliminar =id =>({
    type: OBTENER_DEPORTISTA_ELIMINAR,
    payload: id
});

const eliminarDeportistaExito = () =>({
    type: DEPORTISTA_ELIMINADO_EXITO
})

const eliminarDeportistaError = () =>({
    type: DEPORTISTA_ELIMINADO_ERROR,
    payload: true
})

// Edita un registro en la api y state
export function editarDeportistaAction(deportista) {
    return async (dispatch) => {
        dispatch( editarDeportista() );

        try {
            await clienteAxios.put(`/deportistas/${deportista.id}`, deportista);    
            dispatch( editarDeportistaExito(deportista) );
        } catch (error) {
            console.log(error);
            dispatch( editarDeportistaError() );
        }
    }
}
const editarDeportista = () => ({
    type: COMENZAR_EDICION_DEPORTISTA
});

const editarDeportistaExito = deportista => ({
    type: DEPORTISTA_EDITADO_EXITO,
    payload: deportista
});

const editarDeportistaError = () => ({
    type: DEPORTISTA_EDITADO_ERROR,
    payload: true
})