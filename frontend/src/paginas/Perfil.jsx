import { ThemeProvider } from "@emotion/react"
import { Box, Button, Container, CssBaseline, FormControl, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, Paper,  Toolbar, Typography, createTheme } from "@mui/material"
import AppBarHeader from "../components/AppBarHeader"
import Footer from "../components/Footer"
import { amber, indigo } from "@mui/material/colors"
import React from "react"
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Link } from "react-router-dom"


const Perfil = () => {
  
  const defaultTheme = createTheme({
    palette: {
      primary: indigo,
      secondary: amber,
    },
  });


  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
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
              <Grid container spacing={3}>
                {/* Chart */}
                <Grid item xs={12} md={8} lg={9}>
                  <Paper
                    sx={{
                      p: 2,
                      display: 'flex',
                      flexDirection: 'column',
                      height: 240,
                      
                    }}
                  >
                    <Typography variant="h7" gutterBottom textAlign="center">
                      Nombre: Administrador
                    </Typography>
                    <Typography variant="h7" gutterBottom textAlign="center">
                      Realizar Cambio de Contraseña:
                    </Typography>
                    <div>

                    <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                      <InputLabel htmlFor="outlined-adornment-password">Contraseña</InputLabel>
                      <OutlinedInput
                        id="outlined-adornment-password"
                        type={showPassword ? 'text' : 'password'}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        }
                        label="Contraseña"
                      />
                    </FormControl>
                    <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                      <InputLabel htmlFor="outlined-adornment-password">Confirmar Contraseña</InputLabel>
                      <OutlinedInput
                        id="outlined-adornment-password"
                        type={showPassword ? 'text' : 'password'}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        }
                        label="Confirmar Contraseña"
                      />
                    </FormControl>
        
                      </div>
                      <Link to="/admin">
                      <Button  >Guardar Cambios</Button>
                      </Link>
                  </Paper>
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

export default Perfil