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
    COMENZAR_EDICION_CHURUATA,
    CHURUATA_EDITADO_EXITO,
    CHURUATA_EDITADO_ERROR
} from '../types/index';

import clienteAxios from '../config/axios';
import Swal from 'sweetalert2'

// Crear nuevas churuatas
export function crearNuevaChuruataAction(churuata){
    return async (dispatch) =>{
        dispatch(agregarChuruata());

        try {
            // INSERTAR EN LA API
            await clienteAxios.post('/churuatas', churuata)

            //Actulizar el state
            dispatch(agregarChuruataExito(churuata));

            // Alerta
            Swal.fire(
                'Correcto',
                'La churuata se aÃ±adio correctamente',
                'success'
            )
        } catch (error) {
            console.log(error);
            dispatch(agregarChuruataError(true));

            //Alerta de error
            Swal.fire({
                icon:'error',
                title:"Hubo un error",
                text:"hubo un error, intentar nuevamente",
            })
        }
    }


}

const agregarChuruata = () =>({
    type: AGREGAR_CHURUATA,
    payload: true
})

// si la churuata se guarda en la base de datos
const agregarChuruataExito = churuata =>({
    type: AGREGAR_CHURUATA_EXITO,
    payload: churuata
})

//Si hubo un error
const agregarChuruataError = estado => ({
    type: AGREGAR_CHURUATA_ERROR,
    payload: estado
})

// Funcion que descarga las churuatas de la base de datos
export function obtenerChuruatasAction(){
    return async (dispatch) => {
        dispatch(descargarChuruatas());

        try {
            const respuesta = await clienteAxios.get('/churuatas');
            dispatch(descargarChuruatasExitosa(respuesta.data))
        } catch {
           dispatch(descargarChuruatasError()) 
        }
    }
}

const descargarChuruatas = () =>({
    type: COMENZAR_DESCARGA_CHURUATAS,
    payload: true,
})

const descargarChuruatasExitosa = churuatas =>({
    type: DESCARGA_CHURUATAS_EXITO,
    payload: churuatas,
})
const descargarChuruatasError = () =>({
    type: DESCARGA_CHURUATA_ERROR,
    payload: true

})

// Selecciona y elimina el producto
export function borrarChuruataAction(id){
    return async (dispatch) =>{
        dispatch(obtenerChuruataEliminar());
        try {
            await clienteAxios.delete(`/churuatas/${id}`   );
            dispatch(eliminarChuruataExito());
        } catch (error) {
            console.log(error);
            dispatch(eliminarChuruataError());
        }
    }
}

export const obtenerChuruataEliminar =id =>({
    type: OBTENER_CHURUATA_ELIMINAR,
    payload: id
});

const eliminarChuruataExito = () =>({
    type: CHURUATA_ELIMINADO_EXITO
})

const eliminarChuruataError = () =>({
    type: CHURUATA_ELIMINADO_ERROR,
    payload: true
})


// Edita un registro en la api y state
export function editarChuruataAction(churuata) {
    return async (dispatch) => {
        dispatch( editarChuruata() );

        try {
            await clienteAxios.put(`/churuatas/${churuata.id}`, churuata);    
            dispatch( editarChuruataExito(churuata) );
        } catch (error) {
            console.log(error);
            dispatch( editarChuruataError() );
        }
    }
}
const editarChuruata = () => ({
    type: COMENZAR_EDICION_CHURUATA
});

const editarChuruataExito = churuata => ({
    type: CHURUATA_EDITADO_EXITO,
    payload: churuata
});

const editarChuruataError = () => ({
    type: CHURUATA_EDITADO_ERROR,
    payload: true
})