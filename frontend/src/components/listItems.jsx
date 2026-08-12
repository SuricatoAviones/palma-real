import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';

import Festival from '@mui/icons-material/Festival'
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { Link } from "react-router-dom"
import SportsHandballIcon from '@mui/icons-material/SportsHandball';
import StorefrontIcon from '@mui/icons-material/Storefront';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import HolidayVillageIcon from '@mui/icons-material/HolidayVillage';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import SecurityIcon from '@mui/icons-material/Security';

const MainListItems = () => (
  <React.Fragment>
    <Link to="/admin">
      <ListItemButton>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItemButton>
    
    </Link>

    <Link  to="/admin/alquileres">
      <ListItemButton>
        <ListItemIcon>
          < Festival/>
        </ListItemIcon>
        <ListItemText primary="Alquiler Churuatas" />
      </ListItemButton>
    </Link>

    <Link  to="/admin/deportes">
      <ListItemButton>
        <ListItemIcon>
          <SportsSoccerIcon />
        </ListItemIcon>
        <ListItemText primary="Deportes" />
      </ListItemButton>
    </Link>

  <Link  to="/admin/deportistas">   
    <ListItemButton>
      <ListItemIcon>
        <SportsHandballIcon />
      </ListItemIcon>
      <ListItemText primary="Deportistas" />
    </ListItemButton>
    </Link>

  <Link  to="/admin/socios">
    <ListItemButton>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Socios" />
    </ListItemButton>
    </Link>

    <Link to="/admin/locales">
      <ListItemButton>
        <ListItemIcon>
          <StorefrontIcon />
        </ListItemIcon>
        <ListItemText primary="Locales" />
      </ListItemButton>
    </Link>

  <Link to="/admin/entradas">
    <ListItemButton>
      <ListItemIcon>
        <ConfirmationNumberIcon />
      </ListItemIcon>
      <ListItemText primary="Entradas" />
    </ListItemButton>
    </Link>
    
  <Link to="/admin/churuatas">
    <ListItemButton>
      <ListItemIcon>
        <HolidayVillageIcon />
      </ListItemIcon>
      <ListItemText primary="Churuatas" />
    </ListItemButton>
    </Link>

    <Link to="/admin/vigilantes">
    <ListItemButton>
      <ListItemIcon>
        <SecurityIcon/>
      </ListItemIcon>
      <ListItemText primary="Vigilantes" />
    </ListItemButton>
    </Link>

    <Link to="/admin/reportes">
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Reporte" />
    </ListItemButton>
    </Link>

    <Link to="/">
    <ListItemButton>
      <ListItemIcon>
        <MeetingRoomIcon />
      </ListItemIcon>
      <ListItemText primary="Cerrar Sesion" />
    </ListItemButton>
    </Link>
  </React.Fragment>
);

export default MainListItems;

