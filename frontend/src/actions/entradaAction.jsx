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
    COMENZAR_EDICION_ENTRADA,
    ENTRADA_EDITADO_EXITO,
    ENTRADA_EDITADO_ERROR

} from '../types/index';

import clienteAxios from '../config/axios';
import Swal from 'sweetalert2'

// Crear nuevos deportes
export function crearNuevaEntradaAction(){
    return async (dispatch) =>{
        dispatch(agregarEntrada());

        try {
            // INSERTAR EN LA API
            await clienteAxios.post('/entradas', )

            //Actulizar el state
            dispatch(agregarEntradaExito());

            // Alerta
            Swal.fire(
                'Correcto',
                'La nueva entrada se aÃ±adio correctamente',
                'success'
            )
        } catch (error) {
            console.log(error);
            dispatch(agregarEntradaError(true));

            //Alerta de error
            Swal.fire({
                icon:'error',
                title:"Hubo un error",
                text:"hubo un error, intentar nuevamente",
            })
        }
    }


}

const agregarEntrada = () =>({
    type: AGREGAR_ENTRADA,
    payload: true
})

// si el producto se guarda en la base de datos
const agregarEntradaExito = entrada =>({
    type: AGREGAR_ENTRADA_EXITO,
    payload: entrada
})

//Si hubo un error
const agregarEntradaError = estado => ({
    type: AGREGAR_ENTRADA_ERROR,
    payload: estado
})

// Funcion que descarga los deportes de la base de datos
export function obtenerEntradasAction(){
    return async (dispatch) => {
        dispatch(descargarEntradas());

        try {
            const respuesta = await clienteAxios.get('/entradas');
            dispatch(descargarEntradasExitosa(respuesta.data))
        } catch {
           dispatch(descargarEntradasError()) 
        }
    }
}

const descargarEntradas = () =>({
    type: COMENZAR_DESCARGA_ENTRADAS,
    payload: true,
})

const descargarEntradasExitosa = entradas =>({
    type: DESCARGA_ENTRADAS_EXITO,
    payload: entradas,
})
const descargarEntradasError = () =>({
    type: DESCARGA_ENTRADA_ERROR,
    payload: true

})

// Selecciona y elimina el producto
export function borrarEntradaAction(id){
    return async (dispatch) =>{
        dispatch(obtenerEntradaEliminar());
        try {
            await clienteAxios.delete(`/entradas/${id}`   );
            dispatch(eliminarEntradaExito());
        } catch (error) {
            console.log(error);
            dispatch(eliminarEntradaError());
        }
    }
}

export const obtenerEntradaEliminar =id =>({
    type: OBTENER_ENTRADA_ELIMINAR,
    payload: id
});

const eliminarEntradaExito = () =>({
    type: ENTRADA_ELIMINADO_EXITO
})

const eliminarEntradaError = () =>({
    type: ENTRADA_ELIMINADO_ERROR,
    payload: true
})

// Edita un registro en la api y state
export function editarEntradaAction(entrada) {
    return async (dispatch) => {
        dispatch( editarAlquiler() );

        try {
            await clienteAxios.put(`/entradas/${entrada.id}`, entrada);    
            dispatch( editarEntradaExito(entrada) );
        } catch (error) {
            console.log(error);
            dispatch( editarEntradaError() );
        }
    }
}
const editarAlquiler = () => ({
    type: COMENZAR_EDICION_ENTRADA
});

const editarEntradaExito = alquiler => ({
    type: ENTRADA_EDITADO_EXITO,
    payload: alquiler
});

const editarEntradaError = () => ({
    type: ENTRADA_EDITADO_ERROR,
    payload: true
})