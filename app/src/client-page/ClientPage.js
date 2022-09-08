import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";

import Box from '@mui/material/Box';
import { Event, Group } from '@mui/icons-material';

import { getClients, getClientById, createClient, initClient } from '../Services/dataService';
import Header from './../shared-components/Header'
import Footer from './../shared-components/Footer'
import ClientList from './ClientList';
import ClientDetails from './ClientDetails';


export default function ClientPage(){
  const [clients, setClients] = useState([])
  const [currentClient, setCurrentClient] = useState(null)
  const [isNewClient, setIsNewClient] = useState(false)
  const [displayUserInfo, setDisplayUserInfo] = useState(false)
  

  useEffect(()=>{
    getClients().then((result)=>setClients(result));
    console.log("clients")
    console.log(clients)
  }, [])

  let location = useLocation();
  let navigate = useNavigate();
  // let displayUserInfo = currentClient !== null;
  let headerIcon = displayUserInfo?<Group/>:<Event/>

  const clientPageStyle = {
    display:'grid',
    overflow:'none',
    height:'100%',
  }
  const listStyle={
    height: '450px',
    overflow: 'auto'
  }

  function addClient(){
    setCurrentClient({'id':-1})
    setIsNewClient(true)
    setDisplayUserInfo(true)
    // console.log("should navigate to new client")
    // getClientById(clients.length + 1)
    //   .then((result)=>{
    //     setCurrentClient(result)
    //     setIsNewClient(true)
    //   })
  }
  function displayInfo(id){
    console.log(`display info about id: ${id}`)
    getClientById(id).then((result)=>{
      setCurrentClient(result)
      setDisplayUserInfo(true)
    })
  }
  function handleHeaderBackEvent(){
    displayUserInfo ? setDisplayUserInfo(false) && setCurrentClient(null) : navigate('/calendar')

    // currentClient === null ? navigate('/calendar') : setCurrentClient(null);
  }
  function createClientHandler(newClient){
    createClient(newClient).then((result)=>{ 
      let client = result
      console.log(`added client succesfully: ${client}`)
      console.log(client)
      setClients((clients) => clients.concat(client))
      console.log(clients)
      setIsNewClient(false)
      setDisplayUserInfo(false)
    })
  }
  function handleCreateClient (newClient){
    // initClient()
    console.log("new created client from ClientDetails component")
    console.log(newClient)
  }

  return(
    <Box style={clientPageStyle}>
      <Header icon={headerIcon} backEvent={handleHeaderBackEvent}></Header>
      {/* {!displayUserInfo &&
        <Box style={listStyle}>
          <ClientList clients={clients} onMoreInfo={displayInfo}/>
          </Box>
      }
      {displayUserInfo && <ClientDetails client={currentClient} createMode={isNewClient} onCreateClient={createClientHandler}/>} */}
      <p>heyy</p>
      <ClientDetails client={{name:'pata',email:'ti'}} createMode={true} onCreateClient={handleCreateClient}/>
      {/* {!displayUserInfo && <Footer onAdd={addClient}/>} */}
      <Footer onAdd={addClient}/>
    </Box>
  )
}