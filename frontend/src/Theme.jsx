import { indigo,amber } from '@mui/material/colors';
import {  createTheme, ThemeProvider } from '@mui/material/styles';
const defaultTheme = createTheme({
    palette: {
      
    
          primary: indigo,
          secondary: amber,
        
      
    },
  });
const Theme = () => {
  return (
    <>
        <ThemeProvider theme={defaultTheme} />
    </>
  )
}

export default Theme