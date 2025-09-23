import { ThemeProvider } from "@emotion/react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  CssBaseline,
  Grid,
  Paper,
  Toolbar,
  Typography,
  createTheme,
} from "@mui/material";

import { amber, indigo } from "@mui/material/colors";
import AppBarHeader from "../../components/AppBarHeader";
import Footer from "../../components/Footer";
import { CSVLink } from "react-csv";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { obtenerDeportesAction } from "../../actions/deporteAction";

const Reportes = () => {
  const defaultTheme = createTheme({
    palette: {
      primary: indigo,
      secondary: amber,
    },
  });
  // Utilizar el dispath y te crea una funcion
  const dispatch = useDispatch();
  //trae los deportes
  const { deportes } = useSelector((state) => state.deportes);
  console.log(deportes);

  // obtener los deportes
  useEffect(() => {
    //Consultar a la api
    dispatch(obtenerDeportesAction());
  }, []);

  // const headers = [
  //   { label: "ID", key: "_id" },
  //   { label: "Nombre", key: "nombre" },
  //   { label: "Descripcion", key: "descripcion" },
  // ];

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
            <Paper sx={{ mt: 4, mb: 4, mr: 2, ml: 2, minHeight: "75vh" }}>
              <Container sx={{ p: 4 }}>
                <Grid container spacing={6}>
                  <Grid item lg={2} alignContent={"center"}>
                    <Card sx={{ minWidth: 275 }}>
                      <CardContent>
                        <Typography
                          color="text.secondary"
                          gutterBottom
                          variant="h6"
                          sx={{ fontWeight: 700 }}
                        >
                          Reporte de Deportes
                        </Typography>
                        <Typography>
                          Aqui puede descargar el Reporte del modulo de Deportes
                        </Typography>
                        <Button sx={{ mt: 2 }} variant="contained">
                          <CSVLink
                            data={deportes}
                            filename="ReporteDeportes.csv"
                          >
                            DESCARGAR
                          </CSVLink>
                        </Button>
                      </CardContent>
                    </Card>
                    <Card sx={{ minWidth: 275 }}>
                      <CardContent>
                        <Typography
                          color="text.secondary"
                          gutterBottom
                          variant="h6"
                          sx={{ fontWeight: 700 }}
                        >
                          Reporte de Socios
                        </Typography>
                        <Typography>
                          Aqui puede descargar el Reporte del modulo de Socios
                        </Typography>
                        <Button sx={{ mt: 2 }} variant="contained">
                          <CSVLink
                            data={deportes}
                            filename="my-file.csv"
                          >
                            DESCARGAR
                          </CSVLink>
                        </Button>
                      </CardContent>
                    </Card>
                    <Card sx={{ minWidth: 275 }}>
                      <CardContent>
                        <Typography
                          color="text.secondary"
                          gutterBottom
                          variant="h6"
                          sx={{ fontWeight: 700 }}
                        >
                          Reporte de Churuatas
                        </Typography>
                        <Typography>
                          Aqui puede descargar el Reporte del modulo de Churuatas
                        </Typography>
                        <Button sx={{ mt: 2 }} variant="contained">
                          <CSVLink
                            data={deportes}
                            filename="my-file.csv"
                          >
                            DESCARGAR
                          </CSVLink>
                        </Button>
                      </CardContent>
                    </Card>
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

export default Reportes;
