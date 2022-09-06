import { useEffect, useState } from 'react';
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";

import Box from '@mui/material/Box';
import { Event, Group } from '@mui/icons-material';

import { getClients } from '../Services/dataService';
import Header from './../shared-components/Header'
import ClientList from './ClientList';


export default function ClientPage(){
  let clients = getClients();

  let location = useLocation();
  let pathMatchUserDetails = location.pathname.match('/client/[0-9]') !== null;
  let headerIcon = pathMatchUserDetails?<Group/>:<Event/>
  let link = pathMatchUserDetails?'/client':'/calendar'

  const clientPageStyle = {
    display:'grid',
    overflow:'none',
    height:'100%',
    // gridTemplateRows:'1fr 4fr'
  }
  const listStyle={
    height: '450px',
    overflow: 'auto'
  }

  return(
    <Box style={clientPageStyle}>
      <Header icon={headerIcon} link={link}></Header>
      {!pathMatchUserDetails && <Box style={listStyle}><ClientList clients={clients}></ClientList></Box>}
      <Outlet/>
    </Box>
  )
}