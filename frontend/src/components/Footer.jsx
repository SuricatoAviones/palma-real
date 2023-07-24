import Typography from '@mui/material/Typography';
import { Link } from "react-router-dom"

const Footer = (props) => {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href="https://mui.com/">
          Palma Real Country Club
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
  )
}

export default Footer