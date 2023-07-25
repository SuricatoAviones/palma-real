/* import { Link } from "react-router-dom" */
import { useEffect, useState}  from 'react';

import {  createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import Box from '@mui/material/Box';

import Toolbar from '@mui/material/Toolbar';

/* import Typography from '@mui/material/Typography'; */

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import AppBarHeader from "../../components/AppBarHeader";
import Footer from "../../components/Footer";

import TableBasic from "../../components/Tables/TableBasic"
import axios from 'axios';





  
    

  


const defaultTheme = createTheme();

const Deportes = () => {

    const [deportes, setDeportes] = useState([]);
    const endpoint =  `${import.meta.env.VITE_BACKEND_URL}/api/deportes`

    const getData = async () =>{
        await axios.get(endpoint).then((res) =>{
            const data = res.data
            console.log(data)
            setDeportes(data)
        })
    }

    useEffect(()=>{
        getData()
    }, [])

    const columnas = [
        {
            name:"id",
            label:"ID"
        },
        {
            name:"nombre",
            label:"NOMBRE"
        },
        {
            name:"descripcion",
            label:"DESCRIPCION"
        },

    ]


  return (
    <>
    <ThemeProvider theme={defaultTheme}>
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <AppBarHeader></AppBarHeader>
          <Box
            component="main"
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === 'light'
                  ? theme.palette.grey[100]
                  : theme.palette.grey[900],
              flexGrow: 1,
              height: '100vh',
              overflow: 'auto',
            }}
          >
            <Toolbar />
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
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
                   <TableBasic
                   title={"a"}
                   data= {deportes}
                   columns ={columnas} />
                  </Paper>
                </Grid>                
              </Grid>
              <Footer sx={{ pt: 4 }} />
            </Container>
          </Box>
        </Box>
      </ThemeProvider>   
    
    </>
  )
}

export default Deportes