
import { useEffect} from "react";
import { indigo, amber } from "@mui/material/colors";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import Box from "@mui/material/Box";

import Toolbar from "@mui/material/Toolbar";
import { Controller, useForm } from 'react-hook-form'
import Typography from '@mui/material/Typography';

import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import AppBarHeader from "../../components/AppBarHeader";
import Footer from "../../components/Footer";


import React from "react";
import Button from "@mui/material/Button";
import DeleteIcon from '@mui/icons-material/delete';
import EditIcon from '@mui/icons-material/edit';



import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, IconButton, Input, DialogContent, DialogTitle, Dialog, DialogActions } from "@mui/material";

//Action de Redux
import { crearNuevaChuruataAction, editarChuruataAction, borrarChuruataAction } from "../../actions/churuataAction";
import { useDispatch, useSelector } from "react-redux";
import { obtenerChuruatasAction } from "../../actions/churuataAction";

const defaultTheme = createTheme({
  palette: {
    primary: indigo,
    secondary: amber,
  },
});


const Churuatas = () => {
  const { handleSubmit, control} = useForm({ mode: "onChange" });


  //Modal crear
  const [openChuruatas, setOpenChuruatas] = React.useState(false);
  const handleCloseChuruatas = () => setOpenChuruatas(false);

  const handleOpen = (row) => {
    console.log(row)
    setOpenChuruatas(true)
  }

    //Modal editar
    const [churuataModal, setChuruataModal] = React.useState({});
    const [openChuruatasEditar, setOpenChuruatasEditar] = React.useState(false);
    const handleCloseChuruatasEditar = () => setOpenChuruatasEditar(false);
  
    const handleOpenEditar = (churuata) => {
      setChuruataModal(churuata)
      setOpenChuruatasEditar(true)
    }


 

  // Utilizar el dispath y te crea una funcion
  const dispatch = useDispatch();

  //Accerder al store
  const cargando = useSelector((state) => state.deportes.loading);
  const error = useSelector((state) => state.deportes.error);

  //trae los deportes
  const { churuatas } = useSelector((state) => state.churuatas);
  console.log(churuatas);

    //Usuario hace submit en el form
  const onSubmit = (dataForm) => {
    const churuata={
      nombre: dataForm.nombre,
      descripcion: dataForm.descripcion
    }

    console.log(churuata)

    //Crear el nuevo deporte
    dispatch(crearNuevaChuruataAction(churuata));

    setOpenChuruatas(!open)
  };

  // obtener los deportes
  useEffect(() => {
    //Consultar a la api
    dispatch(obtenerChuruatasAction());
  }, []);




  const eliminarChuruata = (idChuruata) => {
    dispatch(borrarChuruataAction(idChuruata));
    window.location.reload()
  }

  const onSubmitEditar = (dataForm) => {
    const churuataEditar = {
      nombre: dataForm.nombreEditar,
      descripcion: dataForm.descripcionEditar,
    }

    dispatch(editarChuruataAction({churuata: churuataEditar, id: churuataModal._id}));
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
                  Agregar Churuata
                </Button>
                

                {/* Modal para editar deportes */}
                <Dialog open={openChuruatas} onClose={handleCloseChuruatas} fullWidth>
                  <DialogTitle>Crear Churuata</DialogTitle>
                  <DialogContent>
                    <Grid container display="flex">
                      <Grid item px={2} xs={6} sx={{ my: 2 }}>
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
                      </Grid>
                      <Grid item px={2} xs={6} sx={{ my: 2 }}>
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
                      </Grid>
                    </Grid>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleCloseChuruatas} variant="outlined">
                      Cancelar
                    </Button>
                    <Button
                      onClick={handleSubmit(onSubmit)}
                      variant="contained"
                    >
                      Enviar
                    </Button>
                  </DialogActions>
                  {cargando ? <p>Cargando...</p> : null}
                  {error ? <p>hubo un error</p> : null}
                </Dialog>
                
                {/* Editar */}
                <Dialog open={openChuruatasEditar}
                  onClose={handleCloseChuruatasEditar} fullWidth>
                  <DialogTitle>Editar Churuata</DialogTitle>
                  <DialogContent>
                    <Grid container display="flex">
                      <Grid item px={2} xs={6} sx={{ my: 2 }}>
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
                      </Grid>
                      <Grid item px={2} xs={6} sx={{ my: 2 }}>
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
                      </Grid>
                    </Grid>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleCloseChuruatas} variant="outlined">
                      Cancelar
                    </Button>
                    <Button
                      onClick={handleSubmit(onSubmitEditar)}
                      variant="contained"
                    >
                      Enviar
                    </Button>
                  </DialogActions>
                  {cargando ? <p>Cargando...</p> : null}
                  {error ? <p>hubo un error</p> : null}
                </Dialog>

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
                            <TableCell align="center">Estado</TableCell>
                            <TableCell align="center">Acciones</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {churuatas.map((row) => (
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
                              <TableCell align="right">{row.status ? "Activo" : "Inactivo"}</TableCell>
                              <TableCell align="right">
                                <IconButton onClick={()=> eliminarChuruata(row._id)} aria-label="delete">
                                  <DeleteIcon color="primary" />
                                </IconButton>
                                <IconButton onClick={()=>handleOpenEditar(row)} aria-label="edit">
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
export default Churuatas