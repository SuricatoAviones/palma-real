

import React from 'react';
import {  createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Modal from "@mui/material/Modal";
import Box from '@mui/material/Box';
import { indigo, amber } from "@mui/material/colors";

import Toolbar from '@mui/material/Toolbar';



import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import AppBarHeader from "../../components/AppBarHeader";
import Footer from "../../components/Footer";




import { useEffect}  from 'react';

import {  Button, IconButton, TableCell, TableRow, TableBody, TableHead, TableContainer, Table, Typography, Input, DialogActions, Switch, DialogContent, DialogTitle, Dialog } from "@mui/material";

//Action de Redux
import { crearNuevaEntradaAction, borrarEntradaAction, editarEntradaAction } from "../../actions/entradaAction";
import { useDispatch, useSelector } from "react-redux";
import { obtenerEntradasAction } from "../../actions/entradaAction";
import { Controller, useForm } from 'react-hook-form';
import DeleteIcon from '@mui/icons-material/delete';
import EditIcon from '@mui/icons-material/edit';

  
    
const entradas = [
 {
  id:"64bcc6782f8cf24fd6cdde76",
  nombres:
  "Jose Luis",
  apellidos:
  "Gutierrez",
  cedula:"V2773623",
  status:
  "Disponible",
  fecha:
  "2023-07-23",
  socio:
  "894"
}]
  
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

const Entradas = () => {
  const { handleSubmit, control} = useForm({ mode: "onChange" });


  //Modal crear
  const [openEntradas, setOpenEntradas] = React.useState(false);
  const handleCloseEntradas = () => setOpenEntradas(false);

  const handleOpen = (row) => {
    console.log(row)
    setOpenEntradas(true)
  }

    //Modal editar
    const [deporteModal, setEntradaModal] = React.useState({});
    const [openEntradasEditar, setOpenEntradasEditar] = React.useState(false);
    const handleCloseEntradasEditar = () => setOpenEntradasEditar(false);
  
    const handleOpenEditar = (deporte) => {
      setEntradaModal(deporte)
      setOpenEntradasEditar(true)
    }


 

  // Utilizar el dispath y te crea una funcion
  const dispatch = useDispatch();

  //Accerder al store
  const cargando = useSelector((state) => state.entradas.loading);
  const error = useSelector((state) => state.entradas.error);

  //trae los deportes
  /* const { entradas } = useSelector((state) => state.entradas); */
  console.log(entradas);

    //Usuario hace submit en el form
  const onSubmit = (dataForm) => {
    const entrada={
      nombre: dataForm.nombre,
      descripcion: dataForm.descripcion
    }

    console.log(entrada)

    //Crear el nuevo deporte
    dispatch(crearNuevaEntradaAction(entrada));

    setOpenEntradas(!open)
  };

  // obtener los deportes
  useEffect(() => {
    //Consultar a la api
    dispatch(obtenerEntradasAction());
  }, [dispatch]);




  const eliminarEntrada = (idDeporte) => {
    dispatch(borrarEntradaAction(idDeporte));
    window.location.reload()
  }

  const onSubmitEditar = (dataForm) => {
    const deporteEditar = {
      nombre: dataForm.nombreEditar,
      descripcion: dataForm.descripcionEditar,
    }

    dispatch(editarEntradaAction({deporte: deporteEditar, id: deporteModal._id}));
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
                  Agregar Entrada
                </Button>
                {/* Modal para crear deportes */}
                <Dialog open={openEntradas} onClose={handleCloseEntradas} fullWidth>
                  <DialogTitle>Crear socio</DialogTitle>
                  <DialogContent>
                    <Grid container display="flex">
                      <Grid size={{ xs: 6 }} sx={{ px: 2, my: 2 }}>
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
                      <Grid size={{ xs: 6 }} sx={{ px: 2, my: 2 }}>
                        <Typography
                          sx={{
                            fontWeight: 700,
                            textTransform: "none",
                            mb: 1,
                          }}
                        >
                          Apellido
                        </Typography>
                        <Controller
                          name="apellido"
                          defaultValue=""
                          control={control}
                          rules={{
                            required: "Ingresar apellidos",
                          }}
                          render={({
                            field: { onChange, value },
                            fieldState: { error: errorInput },
                          }) => (
                            <Box>
                              <Input
                                sx={{ width: "100%" }}
                                id="standard-adornment-name"
                                placeholder="Apellidos"
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
                      <Grid size={{ xs: 6 }} sx={{ px: 2, my: 2 }}>
                        <Typography
                          sx={{
                            fontWeight: 700,
                            textTransform: "none",
                            mb: 1,
                          }}
                        >
                          Cedula
                        </Typography>
                        <Controller
                          name="Ingresar Cedula"
                          defaultValue=""
                          control={control}
                          rules={{
                            required: "Ingresar Cedula",
                          }}
                          render={({
                            field: { onChange, value },
                            fieldState: { error: errorInput },
                          }) => (
                            <Box>
                              <Input
                                sx={{ width: "100%" }}
                                id="standard-adornment-name"
                                placeholder="Cedula"
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
                     
                      <Grid size={{ xs: 6 }} sx={{ px: 2, my: 2 }}>
                        <Typography
                          sx={{
                            fontWeight: 700,
                            textTransform: "none",
                            mb: 1,
                          }}
                        >
                          Numero de socio
                        </Typography>
                        <Controller
                          name="socioNumero"
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
                      <Grid size={{ xs: 6 }} sx={{ px: 2, my: 2 }}>
                        <Typography
                          sx={{
                            fontWeight: 700,
                            textTransform: "none",
                            mb: 1,
                          }}
                        >
                          Estado
                        </Typography>
                        <Controller
                          name="estado"
                          defaultValue=""
                          control={control}
                          render={({ field: { onChange, value } }) => (
                            <Box>
                              <Typography
                                data-testid="message-is-enabled-carrier"
                                variant="caption"
                              >
                                Inactivo
                              </Typography>
                              <Switch
                                id="enabled-carrier"
                                onChange={onChange}
                                value={value}
                              />
                              <Typography
                                data-testid="message-is-enabled-carrier"
                                variant="caption"
                              >
                                Activo
                              </Typography>
                            </Box>
                          )}
                        />
                      </Grid>
                    </Grid>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleCloseEntradas} variant="outlined">
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
                {/* Modal para editar deportes */}
                <Modal
                  open={openEntradasEditar}
                  onClose={handleCloseEntradasEditar}
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
                  <Grid size={12}>
                    <TableContainer component={Paper}>
                      <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                          <TableRow>
                            <TableCell align="center">ID</TableCell>
                            <TableCell align="center">Nombres</TableCell>
                            <TableCell align="center">Apellidos</TableCell>
                            <TableCell align="center">Cedula</TableCell>
                            <TableCell align="center">Estado</TableCell>
                            <TableCell align="center">Fecha</TableCell>
                            <TableCell align="center">Socio</TableCell>
                            <TableCell align="center">Acciones</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {entradas?.map((row) => (
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
                              <TableCell align="right">{row.cedula}</TableCell>
                              <TableCell align="right">{row.status}</TableCell>
                              <TableCell align="right">{row.fecha}</TableCell>
                              <TableCell align="right">{row.socio}</TableCell>
                              <TableCell align="right">
                                <IconButton onClick={()=> eliminarEntrada(row._id)} aria-label="delete">
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

export default Entradas