/* import { Link } from "react-router-dom" */
import { useEffect, useState } from "react";
import { indigo, amber } from "@mui/material/colors";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import Box from "@mui/material/Box";

import Toolbar from "@mui/material/Toolbar";
/* import { Controller, useForm } from 'react-hook-form'
import Typography from '@mui/material/Typography'; */

import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import AppBarHeader from "../../components/AppBarHeader";
import Footer from "../../components/Footer";
import { useNavigate } from "react-router-dom";

import React from "react";
import Button from "@mui/material/Button";
import DeleteIcon from '@mui/icons-material/delete';
import EditIcon from '@mui/icons-material/edit';


import Modal from "@mui/material/Modal";
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, IconButton } from "@mui/material";
//Action de Redux
import { crearNuevoAlquilerAction } from "../../actions/alquilerAction";
import { useDispatch, useSelector } from "react-redux";
import { obtenerAlquileresAction } from "../../actions/alquilerAction";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const defaultTheme = createTheme({
  palette: {
    primary: indigo,
    secondary: amber,
  },
});


const AlquilerChuruatas = () => {
    //Navigate
    let navigate = useNavigate();

    //Modal
    const [open, setOpen] = React.useState(false);
    const handleClose = () => setOpen(false);
  
    const handleOpen = (row) => {
      console.log(row)
      setOpen(true)
    }
  
    // state del modal
    const [nombre, guardarNombre] = useState("");
    const [descripcion, guardarDescripcion] = useState("");
  
    // Utilizar el dispath y te crea una funcion
    const dispatch = useDispatch();
  
    //Accerder al store
    const cargando = useSelector((state) => state.deportes.loading);
    const error = useSelector((state) => state.deportes.error);
  
    // Añadir deporte con Redux y manda a lllamar el action del deporte
    const agregarDeporte = (deporte) =>
      dispatch(crearNuevoAlquilerAction(deporte));
    
    
      //Usuario hace submit en el form
    const onSubmit = (e) => {
      e.preventDefault();
  
      //Validar Formulario
      if (nombre.trim === "" || descripcion === "") {
        return;
      }
      // Si no hay errorres
  
      //Crear el nuevo deporte
      agregarDeporte({
        nombre,
        descripcion,
      });
  
      //Redireccionar
      navigate("/deportes");
    };
  
    // obtener los deportes
    useEffect(() => {
      //Consultar a la api
      const cargarDeportes = () => dispatch(obtenerAlquileresAction());
      cargarDeportes();
    }, []);
  
    const deportes = useSelector((state) => state.deportes);
    console.log(deportes);
  
    /* const {nombre, id, descripcion} = deporte; */
  
    const eliminarDeporte = (id) => {
      console.log(id)
    }

  return (
    <ThemeProvider theme={defaultTheme}>
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBarHeader></AppBarHeader>
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
        }}
      >
        <Toolbar />
        <Paper sx={{ mt: 4, mb: 4, mr: 2, ml: 2, height: '75vh' }}>
          <Container sx={{ p: 4 }}>
            <Button variant="contained" color="primary" onClick={handleOpen} sx={{ mb: 2 }}>
              Agregar Deporte
            </Button>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style} noValidate autoComplete="off" component="form">
              <form onSubmit={onSubmit}>
                <input
                  type="text"
                  placeholder="Nombre"
                  name="nombre"
                  value={nombre}
                  onChange={e => guardarNombre(e.target.value)}
                  
                />
                <input
                  type="text"
                  placeholder="Descripción"
                  name="descripcion"
                  value={descripcion}
                  onChange={e =>  guardarDescripcion( e.target.value)}
                />
                <button type="submit">Enviar</button>
              </form>
                {cargando ? <p>Cargando...</p> : null}
                {error ? <p>hubo un error</p> : null}
              </Box>
            </Modal>
            <Grid container spacing={6}>
              {/* Chart */}
              <Grid item lg={12}>
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell align="center">ID</TableCell>
                        <TableCell align="center">Nombre</TableCell>
                        <TableCell align="center">Descripción</TableCell>
                        <TableCell align="center">Acciones</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {deportes.deportes.map((row) => (
                        <TableRow
                          key={row._id}
                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                          <TableCell component="th" scope="row">
                            {row._id}
                          </TableCell>
                          <TableCell component="th" scope="row">
                            {row.nombre}
                          </TableCell>
                          <TableCell align="right">{row.descripcion}</TableCell>
                          <TableCell align="right">
                            <IconButton onClick={()=> eliminarDeporte(row._id)} aria-label="delete">
                              <DeleteIcon color="primary" />
                            </IconButton>
                            <IconButton onClick={()=> handleOpen(row)} aria-label="edit">
                              <EditIcon color="primary" />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
            </Grid>
            <Footer sx={{ pt: 4 }} />
          </Container>
        </Paper>
      </Box>
    </Box>
  </ThemeProvider>
    
  )
}

export default AlquilerChuruatas