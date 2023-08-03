
import { useEffect} from "react";
import { indigo, amber } from "@mui/material/colors";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import Box from "@mui/material/Box";

import Toolbar from "@mui/material/Toolbar";


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
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, IconButton, Typography, Input } from "@mui/material";

//Action de Redux
import { borrarDeporteAction, crearNuevoDeporteAction, editarDeporteAction } from "../../actions/deporteAction";
import { useDispatch, useSelector } from "react-redux";
import { obtenerDeportesAction } from "../../actions/deporteAction";
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

const Deportes = () => {
  const { handleSubmit, control} = useForm({ mode: "onChange" });


  //Modal crear
  const [openDeportes, setOpenDeportes] = React.useState(false);
  const handleCloseDeportes = () => setOpenDeportes(false);

  const handleOpen = (row) => {
    console.log(row)
    setOpenDeportes(true)
  }

    //Modal editar
    const [deporteModal, setDeporteModal] = React.useState({});
    const [openDeportesEditar, setOpenDeportesEditar] = React.useState(false);
    const handleCloseDeportesEditar = () => setOpenDeportesEditar(false);
  
    const handleOpenEditar = (deporte) => {
      setDeporteModal(deporte)
      setOpenDeportesEditar(true)
    }


 

  // Utilizar el dispath y te crea una funcion
  const dispatch = useDispatch();

  //Accerder al store
  const cargando = useSelector((state) => state.deportes.loading);
  const error = useSelector((state) => state.deportes.error);

  //trae los deportes
  const { deportes } = useSelector((state) => state.deportes);
  console.log(deportes);

    //Usuario hace submit en el form
  const onSubmit = (dataForm) => {
    const deporte={
      nombre: dataForm.nombre,
      descripcion: dataForm.descripcion
    }

    console.log(deporte)

    //Crear el nuevo deporte
    dispatch(crearNuevoDeporteAction(deporte));

    setOpenDeportes(!open)
  };

  // obtener los deportes
  useEffect(() => {
    //Consultar a la api
    dispatch(obtenerDeportesAction());
  }, []);




  const eliminarDeporte = (idDeporte) => {
    dispatch(borrarDeporteAction(idDeporte));
    window.location.reload()
  }

  const onSubmitEditar = (dataForm) => {
    const deporteEditar = {
      nombre: dataForm.nombreEditar,
      descripcion: dataForm.descripcionEditar,
    }

    dispatch(editarDeporteAction({deporte: deporteEditar, id: deporteModal._id}));
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
                  Agregar Deporte
                </Button>
                {/* Modal para crear deportes */}
                <Modal
                  open={openDeportes}
                  onClose={handleCloseDeportes}
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
                  open={openDeportesEditar}
                  onClose={handleCloseDeportesEditar}
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
                            <TableCell align="center">Descripción</TableCell>
                            <TableCell align="center">Acciones</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {deportes?.map((row) => (
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
  );
};

export default Deportes;
