import { useEffect, useState } from 'react';
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";

import Box from '@mui/material/Box';
import { Event, Group } from '@mui/icons-material';

import { getClients } from '../Services/dataService';
import Header from './../shared-components/Header'
import Footer from './../shared-components/Footer'
import ClientList from './ClientList';


export default function ClientPage(){
  const [clients, setClients] = useState([])

  getClients().then((result)=>setClients(result));
  console.log("clients")
  console.log(clients)

  let location = useLocation();
  let pathMatchUserDetails = location.pathname.match('/client/[0-9]') !== null;
  let headerIcon = pathMatchUserDetails?<Group/>:<Event/>
  let link = pathMatchUserDetails?'/client':'/calendar'

  const clientPageStyle = {
    display:'grid',
    overflow:'none',
    height:'100%',
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
      <Footer/>
    </Box>
  )
}