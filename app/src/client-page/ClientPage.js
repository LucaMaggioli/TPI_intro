import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";

import Box from '@mui/material/Box';
import { Event, Group } from '@mui/icons-material';

import { getClients, getClientById, createClient, deleteClientById } from '../Services/dataService';
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

  function addClient(){
    setCreatingNewClient(true)
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

  function handleDetete (id){
    deleteClientById(id).then(result=>{
      if(result){
        console.log(`client with id ${id} succesfully deleted`)
        clients.map((client)=>{
          if(client.id === id){
            let index = clients.indexOf(client)
            let newClients = [...clients.slice(0, index), ...clients.slice(index+1, clients.length)]
            setClients(newClients);
          }
        })
      }
    })
  }

  function handleCreateClient (newClient){
    // send the new created client from ClientDetails component to dataService
    createClient(newClient).then((result)=>{
      // receiving the result of createClient dataService function
      console.log(result);
      if(result){
        setClients(clients => [...clients, newClient])
      }
    }).catch(err=>{
      console.log("error occured while adding client")
      console.error(err)
    })
    
    setCreatingNewClient(false)
  }

  return(
    <Box style={clientPageStyle}>
      <Header icon={headerIcon} backEvent={handleHeaderBackEvent}></Header>
      {dataLoaded && !creatingNewClient && <ClientList clients={clients} onDelete={handleDetete}/>}
      {creatingNewClient && <ClientDetails createMode={creatingNewClient} onCreateClient={handleCreateClient} />}
      <Footer onAdd={addClient}/>
    </Box>
  )
}