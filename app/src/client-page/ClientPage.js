import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";

import Box from '@mui/material/Box';
import { Event, Group } from '@mui/icons-material';

import { getClients, getClientById, createClient } from '../Services/dataService';
import Header from './../shared-components/Header'
import Footer from './../shared-components/Footer'
import ClientList from './ClientList';
import ClientDetails from './ClientDetails';




const clientPageStyle = {
  display:'grid',
  overflow:'none',
  height:'100%',
}
const listStyle={
  height: '450px',
  overflow: 'auto'
}


export default function ClientPage(){
  const [dataLoaded, setDataLoaded] = useState([])
  const [clients, setClients] = useState([])
  const [currentClient, setCurrentClient] = useState(null)
  const [isNewClient, setIsNewClient] = useState(false)

  const [creatingNewClient, setCreatingNewClient] = useState(false)
  const [displayUserInfo, setDisplayUserInfo] = useState(false)
  

  useEffect(()=>{
    getClients().then((result)=>{
      setClients(result);
      console.log(result)
    });
    setDataLoaded(true)
  }, [])

  let navigate = useNavigate();
  let headerIcon = displayUserInfo || creatingNewClient?<Group/>:<Event/>
  // useEffect(()=>{
  //   headerIcon = displayUserInfo || creatingNewClient?<Group/>:<Event/>
  // }, [creatingNewClient, displayUserInfo])

  console.log(`displayUserInfo : ${displayUserInfo}, creatingNewClient: ${creatingNewClient}`)

  function addClient(){
    setCreatingNewClient(true)
  }
  function displayInfo(id){
    console.log(`display info about id: ${id}`)
    getClientById(id).then((result)=>{
      setCurrentClient(result)
      setDisplayUserInfo(true)
    })
  }
  function handleHeaderBackEvent(){
    if((displayUserInfo) || (creatingNewClient)){
      console.log("set states to null")
      setDisplayUserInfo(false);
      setCreatingNewClient(false);
    }
    else{
      navigate('/calendar')
    }
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
    createClient(newClient).then((result)=>{
      // receiving the result of createClient dataService function
      console.log("receiving the result of createClient dataService function")
      console.log(result);
    })
    setCreatingNewClient(false)
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
      {/* {dataLoaded && !CreatingNewClient && <Box style={clientListStyle}>
        {console.log("In renderer clients ts")}
        {console.log(clients)}
        {clients.map((client)=>{
          {console.log(client)}
          return(<ClientDetails client={client}/>)
        })}
      </Box>} */}
      {dataLoaded && !creatingNewClient && <ClientList clients={clients}/>}
      {creatingNewClient && <ClientDetails createMode={creatingNewClient} onCreateClient={handleCreateClient}/>}
      <Footer onAdd={addClient}/>
    </Box>
  )
}