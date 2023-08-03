
/* import { Link } from "react-router-dom" */

import {  createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { indigo, amber } from "@mui/material/colors";
import Box from '@mui/material/Box';

import Toolbar from '@mui/material/Toolbar';
import Modal from "@mui/material/Modal";
/* import Typography from '@mui/material/Typography'; */

import DeleteIcon from '@mui/icons-material/delete';
import EditIcon from '@mui/icons-material/edit';
import React from "react";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import AppBarHeader from "../../components/AppBarHeader";
import Footer from "../../components/Footer";



import { useEffect}  from 'react';
import { Controller, useForm } from "react-hook-form";
import {  IconButton, Input,Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Typography } from "@mui/material";
import Button from "@mui/material/Button";
//Action de Redux
import { crearNuevoDeportistaAction,borrarDeportistaAction, editarDeportistaAction } from "../../actions/deportistaAction";
import { useDispatch, useSelector } from "react-redux";
import { obtenerDeportistasAction } from "../../actions/deportistaAction";

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

const Deportistas = () => {

  const { handleSubmit, control} = useForm({ mode: "onChange" });


  //Modal crear
  const [openDeportes, setOpenDeportistas] = React.useState(false);
  const handleCloseDeportistas = () => setOpenDeportistas(false);

  const handleOpen = (row) => {
    console.log(row)
    setOpenDeportistas(true)
  }

    //Modal editar
    const [deportistaModal, setDeportistaModal] = React.useState({});
    const [openDeportistasEditar, setOpenDeportistasEditar] = React.useState(false);
    const handleCloseDeportistasEditar = () => setOpenDeportistasEditar(false);
  
    const handleOpenEditar = (deporte) => {
      setDeportistaModal(deporte)
      setOpenDeportistasEditar(true)
    }


 

  // Utilizar el dispath y te crea una funcion
  const dispatch = useDispatch();

  //Accerder al store
  const cargando = useSelector((state) => state.deportistas.loading);
  const error = useSelector((state) => state.deportistas.error);

  const deportistas =[
    {  
    _id: "64bc48fa7ccf593749eea432",
    nombres:"Miguel",
    apellidos:"Cabrera",
    email:"miguelito@gmail.com",
    telefono:"04148639465",
    fecha_nacimiento:"2023-07-22",
    fecha_registro:"2023-07-22",
    status:true,
    deporte: "Natacion"
  }
]
 
  //trae los deportes
  /* const { deportistas } = useSelector((state) => state.deportistas); */
  console.log(deportistas);

    //Usuario hace submit en el form
  const onSubmit = (dataForm) => {
    const deportista={
      nombre: dataForm.nombre,
      descripcion: dataForm.descripcion
    }

    console.log(deportista)

    //Crear el nuevo deporte
    dispatch(crearNuevoDeportistaAction(deportista));

    setOpenDeportistas(!open)
  };

  // obtener los deportes
  useEffect(() => {
    //Consultar a la api
    dispatch(obtenerDeportistasAction());
  }, []);




  const eliminarDeportista = (idDeportista) => {
    dispatch(borrarDeportistaAction(idDeportista));
    window.location.reload()
  }

  const onSubmitEditar = (dataForm) => {
    const deportistaEditar = {
      nombre: dataForm.nombreEditar,
      descripcion: dataForm.descripcionEditar,
    }

    dispatch(editarDeportistaAction({deportista: deportistaEditar, id: deportistaModal._id}));
    window.location.reload()
  } 

  return (
    <>
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
              minHeight: "100vh",
              overflow: "auto",
            }}
          >
            <Toolbar />
            <Paper sx={{ mt: 4, mb: 4, mr: 2, ml: 2, minHeight: '75vh' }}>
              <Container sx={{ p: 4 }}>
                <Button variant="contained" color="primary" onClick={handleOpen} sx={{ mb: 2 }}>
                  Agregar Deportista
                </Button>
                {/* Modal para crear deportes */}
                <Modal
                  open={openDeportes}
                  onClose={handleCloseDeportistas}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box
                    sx={style}
                    noValidate
                    autoComplete="off"
                    component="form"
                  >
                    <Box sx={{ my: 2 }}>
                      <Typography
                        sx={{
                          fontWeight: 700,
                          textTransform: "none",
                          mb: 1,
                        }}
                      >
                        Nombre
                      </Typography>
                      <Controller
                        name="nombre"
                        defaultValue=""
                        control={control}
                        rules={{
                          required: "Ingresa un nombre",
                        }}
                        render={({
                          field: { onChange, value },
                          fieldState: { error: errorInput },
                        }) => (
                          <Box>
                            <Input
                              sx={{ width: "100%" }}
                              id="standard-adornment-name"
                              placeholder="Nombre"
                              onChange={onChange}
                              type="text"
                              value={value}
                              error={!!errorInput}
                            />
                            <Typography sx={{ color: "red" }}>
                              {errorInput?.message}
                            </Typography>
                          </Box>
                        )}
                      />
                    </Box>
                    <Box sx={{ my: 2 }}>
                      <Typography
                        sx={{
                          fontWeight: 700,
                          textTransform: "none",
                          mb: 1,
                        }}
                      >
                        Descripcion
                      </Typography>
                      <Controller
                        name="descripcion"
                        defaultValue=""
                        control={control}
                        rules={{
                          required: "Ingresa una descripcion",
                        }}
                        render={({
                          field: { onChange, value },
                          fieldState: { error: errorInput },
                        }) => (
                          <Box>
                            <Input
                              sx={{ width: "100%" }}
                              id="standard-adornment-name"
                              placeholder="Descripcion"
                              onChange={onChange}
                              type="text"
                              value={value}
                              error={!!errorInput}
                            />
                            <Typography sx={{ color: "red" }}>
                              {errorInput?.message}
                            </Typography>
                          </Box>
                        )}
                      />
                    </Box>

                    <button onClick={handleSubmit(onSubmit)}>Enviar</button>
                    
                    {cargando ? <p>Cargando...</p> : null}
                    {error ? <p>hubo un error</p> : null}
                  </Box>
                </Modal>
                {/* Modal para editar deportes */}
                <Modal
                  open={openDeportistasEditar}
                  onClose={handleCloseDeportistasEditar}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box
                    sx={style}
                    noValidate
                    autoComplete="off"
                    component="form"
                  >
                    <Box sx={{ my: 2 }}>
                      <Typography
                        sx={{
                          fontWeight: 700,
                          textTransform: "none",
                          mb: 1,
                        }}
                      >
                        Nombre
                      </Typography>
                      <Controller
                        name="nombreEditar"
                        defaultValue=""
                        control={control}
                        rules={{
                          required: "Ingresa un nombre",
                        }}
                        render={({
                          field: { onChange, value },
                          fieldState: { error: errorInput },
                        }) => (
                          <Box>
                            <Input
                              sx={{ width: "100%" }}
                              id="standard-adornment-name"
                              placeholder="Nombre"
                              onChange={onChange}
                              type="text"
                              value={value}
                              error={!!errorInput}
                            />
                            <Typography sx={{ color: "red" }}>
                              {errorInput?.message}
                            </Typography>
                          </Box>
                        )}
                      />
                    </Box>
                    <Box sx={{ my: 2 }}>
                      <Typography
                        sx={{
                          fontWeight: 700,
                          textTransform: "none",
                          mb: 1,
                        }}
                      >
                        Descripcion
                      </Typography>
                      <Controller
                        name="descripcionEditar"
                        defaultValue=""
                        control={control}
                        rules={{
                          required: "Ingresa una descripcion",
                        }}
                        render={({
                          field: { onChange, value },
                          fieldState: { error: errorInput },
                        }) => (
                          <Box>
                            <Input
                              sx={{ width: "100%" }}
                              id="standard-adornment-name"
                              placeholder="Descripcion"
                              onChange={onChange}
                              type="text"
                              value={value}
                              error={!!errorInput}
                            />
                            <Typography sx={{ color: "red" }}>
                              {errorInput?.message}
                            </Typography>
                          </Box>
                        )}
                      />
                    </Box>

                    <button onClick={handleSubmit(onSubmitEditar)}>Enviar</button>
                    
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
                            <TableCell align="center">Apellidos</TableCell>
                            <TableCell align="center">Email</TableCell>
                            <TableCell align="center">Telefono</TableCell>
                            <TableCell align="center">Fecha_Nacimiento</TableCell>
                            <TableCell align="center">Fecha_Registro</TableCell>
                            <TableCell align="center">Estado</TableCell>
                            <TableCell align="center">Deporte</TableCell>
                            <TableCell align="center">Acciones</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {deportistas?.map((row) => (
                            <TableRow
                              key={row._id}
                              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                              <TableCell component="th" scope="row">
                                {row._id}
                              </TableCell>
                              <TableCell component="th" scope="row">
                                {row.nombres}
                              </TableCell>
                              <TableCell align="right">{row.apellidos}</TableCell>
                              <TableCell align="right">{row.email}</TableCell>
                              <TableCell align="right">{row.telefono}</TableCell>
                              <TableCell align="right">{row.fecha_nacimiento}</TableCell>
                              <TableCell align="right">{row.fecha_registro}</TableCell>
                              <TableCell align="right">{row.status ? "Activo" :"Inactivo"}</TableCell>
                              <TableCell align="right">{row.deporte}</TableCell>
                              <TableCell align="right">
                                <IconButton onClick={()=> eliminarDeportista(row._id)} aria-label="delete">
                                  <DeleteIcon color="primary" />
                                </IconButton>
                                <IconButton onClick={()=> handleOpenEditar(row)} aria-label="edit">
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
    </>
  )
}

export default Deportistas