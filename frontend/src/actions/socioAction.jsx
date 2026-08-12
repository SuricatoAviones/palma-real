import{
    AGREGAR_SOCIO,
    AGREGAR_SOCIO_EXITO,
    AGREGAR_SOCIO_ERROR,
    COMENZAR_DESCARGA_SOCIOS,
    DESCARGA_SOCIOS_EXITO,
    DESCARGA_SOCIO_ERROR,
    OBTENER_SOCIO_ELIMINAR,
    SOCIO_ELIMINADO_EXITO,
    SOCIO_ELIMINADO_ERROR,
    COMENZAR_EDICION_SOCIO,
    SOCIO_EDITADO_EXITO,
    SOCIO_EDITADO_ERROR
} from '../types/index';

import clienteAxios from '../config/axios';
import Swal from 'sweetalert2'

// Crear nuevos deportes
export function crearNuevoSocioAction(socios){
    return async (dispatch) =>{
        dispatch(agregarSocio());

        try {
            // INSERTAR EN LA API
            await clienteAxios.post('/socios', socios)

            //Actulizar el state
            dispatch(agregarSocioExito(socios));

            // Alerta
            Swal.fire(
                'Correcto',
                'El deporte se aÃ±adio correctamente',
                'success'
            )
        } catch (error) {
            console.log(error);
            dispatch(agregarSocioError(true));

            //Alerta de error
            Swal.fire({
                icon:'error',
                title:"Hubo un error",
                text:"hubo un error, intentar nuevamente",
            })
        }
    }


}

const agregarSocio = () =>({
    type: AGREGAR_SOCIO,
    payload: true
})

// si el producto se guarda en la base de datos
const agregarSocioExito = deporte =>({
    type: AGREGAR_SOCIO_EXITO,
    payload: deporte
})

//Si hubo un error
const agregarSocioError = estado => ({
    type: AGREGAR_SOCIO_ERROR,
    payload: estado
})

// Funcion que descarga los deportes de la base de datos
export function obtenerSociosAction(){
    return async (dispatch) => {
        dispatch(descargarSocios());

        try {
            const respuesta = await clienteAxios.get('/socios');
            dispatch(descargarSociosExitosa(respuesta.data))
        } catch {
           dispatch(descargarSociosError()) 
        }
    }
}

const descargarSocios = () =>({
    type: COMENZAR_DESCARGA_SOCIOS,
    payload: true,
})

const descargarSociosExitosa = deportes =>({
    type: DESCARGA_SOCIOS_EXITO,
    payload: deportes,
})
const descargarSociosError = () =>({
    type: DESCARGA_SOCIO_ERROR,
    payload: true

})

// Selecciona y elimina el producto
export function borrarSocioAction(id){
    return async (dispatch) =>{
        dispatch(obtenerSocioEliminar());
        try {
            await clienteAxios.delete(`/socios/${id}`   );
            dispatch(eliminarSocioExito());
        } catch (error) {
            console.log(error);
            dispatch(eliminarSocioError());
        }
    }
}

export const obtenerSocioEliminar =id =>({
    type: OBTENER_SOCIO_ELIMINAR,
    payload: id
});

const eliminarSocioExito = () =>({
    type: SOCIO_ELIMINADO_EXITO
})

const eliminarSocioError = () =>({
    type: SOCIO_ELIMINADO_ERROR,
    payload: true
})

// Edita un registro en la api y state
export function editarSocioAction(socio) {
    return async (dispatch) => {
        dispatch( editarSocio() );

        try {
            await clienteAxios.put(`/socios/${socio.id}`, socio);    
            dispatch( editarSocioExito(socio) );
        } catch (error) {
            console.log(error);
            dispatch( editarSocioError() );
        }
    }
}
const editarSocio = () => ({
    type: COMENZAR_EDICION_SOCIO
});

const editarSocioExito = socio => ({
    type: SOCIO_EDITADO_EXITO,
    payload: socio
});

const editarSocioError = () => ({
    type: SOCIO_EDITADO_ERROR,
    payload: true
})