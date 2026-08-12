/* import { Link } from "react-router-dom" */
import { useEffect } from "react";
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


import React from "react";
import Button from "@mui/material/Button";
import DeleteIcon from '@mui/icons-material/delete';
import EditIcon from '@mui/icons-material/edit';


import Modal from "@mui/material/Modal";
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, IconButton, Input, Typography } from "@mui/material";

//Action de Redux
import { crearNuevoLocalAction, borrarLocalAction, editarLocalAction } from "../../actions/localAction";
import { useDispatch, useSelector } from "react-redux";
import { obtenerLocalesAction } from "../../actions/localAction";
import { Controller, useForm } from "react-hook-form";

  
    

  
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

const Locales = () => {
  const { handleSubmit, control} = useForm({ mode: "onChange" });


  //Modal crear
  const [openDeportes, setOpenLocales] = React.useState(false);
  const handleCloseLocales = () => setOpenLocales(false);

  const handleOpen = (row) => {
    console.log(row)
    setOpenLocales(true)
  }

    //Modal editar
    const [localModal, setDeporteModal] = React.useState({});
    const [openLocalesEditar, setOpenLocalesEditar] = React.useState(false);
    const handleCloseLocalesEditar = () => setOpenLocalesEditar(false);
  
    const handleOpenEditar = (local) => {
      setDeporteModal(local)
      setOpenLocalesEditar(true)
    }


 

  // Utilizar el dispath y te crea una funcion
  const dispatch = useDispatch();

  //Accerder al store
  const cargando = useSelector((state) => state.locales.loading);
  const error = useSelector((state) => state.locales.error);

  //trae los deportes
  const { locales } = useSelector((state) => state.locales);
  console.log(locales);

    //Usuario hace submit en el form
  const onSubmit = (dataForm) => {
    const local={
      nombre: dataForm.nombre,
      rif: dataForm.rif,
      descripcion: dataForm.descripcion,
      status: dataForm.status,
      fecha_pago: dataForm.fecha_pago
    }

    console.log(local)

    //Crear el nuevo deporte
    dispatch(crearNuevoLocalAction(local));

    setOpenLocales(!open)
  };

  // obtener los deportes
  useEffect(() => {
    //Consultar a la api
    dispatch(obtenerLocalesAction());
  }, [dispatch]);




  const eliminarLocal = (idLocal) => {
    dispatch(borrarLocalAction(idLocal));
    window.location.reload()
  }

  const onSubmitEditar = (dataForm) => {
    const deporteEditar = {
      nombre: dataForm.nombreEditar,
      descripcion: dataForm.descripcionEditar,
    }

    dispatch(editarLocalAction({deporte: deporteEditar, id: localModal._id}));
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
              height: "100vh",
              overflow: "auto",
            }}
          >
            <Toolbar />
            <Paper sx={{ mt: 4, mb: 4, mr: 2, ml: 2, height: '75vh' }}>
              <Container sx={{ p: 4 }}>
                <Button variant="contained" color="primary" onClick={handleOpen} sx={{ mb: 2 }}>
                  Agregar Local
                </Button>
                {/* Modal para crear deportes */}
                <Modal
                  open={openDeportes}
                  onClose={handleCloseLocales}
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
                        Rif
                      </Typography>
                      <Controller
                        name="rif"
                        defaultValue=""
                        control={control}
                        rules={{
                          required: "Ingresa un rif",
                        }}
                        render={({
                          field: { onChange, value },
                          fieldState: { error: errorInput },
                        }) => (
                          <Box>
                            <Input
                              sx={{ width: "100%" }}
                              id="standard-adornment-name"
                              placeholder="Rif"
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

                    <Button variant="contained" onClick={handleSubmit(onSubmit)}>Enviar</Button>
                    <Button variant="contained" >Cancelar</Button>
                    
                    {cargando ? <p>Cargando...</p> : null}
                    {error ? <p>hubo un error</p> : null}
                  </Box>
                </Modal>
                {/* Modal para editar deportes */}
                <Modal
                  open={openLocalesEditar}
                  onClose={handleCloseLocalesEditar}
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
                        Rif
                      </Typography>
                      <Controller
                        name="rifEditar"
                        defaultValue=""
                        control={control}
                        rules={{
                          required: "Ingresa un rif",
                        }}
                        render={({
                          field: { onChange, value },
                          fieldState: { error: errorInput },
                        }) => (
                          <Box>
                            <Input
                              sx={{ width: "100%" }}
                              id="standard-adornment-name"
                              placeholder="Rif"
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

                    <Button onClick={handleSubmit(onSubmitEditar)}>Enviar</Button>
                    <Button variant="contained" >Cancelar</Button>
                    
                    {cargando ? <p>Cargando...</p> : null}
                    {error ? <p>hubo un error</p> : null}
                  </Box>
                </Modal>
                <Grid container spacing={6}>
                  {/* Chart */}
                  <Grid size={12}>
                    <TableContainer component={Paper}>
                      <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                          <TableRow>
                            <TableCell align="center">ID</TableCell>
                            <TableCell align="center">Nombre</TableCell>
                            <TableCell align="center">RIF</TableCell>
                            <TableCell align="center">DescripciÃ³n</TableCell>
                            <TableCell align="center">Estado</TableCell>
                            <TableCell align="center">Fecha de Pago</TableCell>
                            <TableCell align="center">Acciones</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {locales?.map((row) => (
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
                              <TableCell align="right">{row.rif}</TableCell>
                              <TableCell align="right">{row.descripcion}</TableCell>
                              <TableCell align="right">{row.status ? "Activo" : "Inactivo"}</TableCell>
                              <TableCell align="right">{row.fecha_pago}</TableCell>

                              <TableCell align="right">
                                <IconButton onClick={()=> eliminarLocal(row._id)} aria-label="delete">
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

export default Locales