import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

import Box from '@mui/material/Box';
import { Event, Group } from '@mui/icons-material';

import { getClients, getClientById, createClient, deleteClientById, editClient } from '../Services/clientDataService';
import Header from '../shared-components/Header'
import Footer from '../shared-components/Footer'
import ClientList from './ClientList';
import ClientDetails from './ClientDetails';


const clientPageStyle = {
  display:'grid',
  overflow:'none',
  height:'100%',
}


export default function ClientPage(){
  const [dataLoaded, setDataLoaded] = useState([])
  const [clients, setClients] = useState([])
  const [currentClient, setCurrentClient] = useState(null)
  const [createMode, setCreateMode] = useState(false)
  const [displayUserInfo, setDisplayUserInfo] = useState(false)
  

  useEffect(()=>{
    getClients().then((result)=>{
      setClients(result);
      console.log(result)
    });
    setDataLoaded(true)
  }, [])

  let navigate = useNavigate();
  let headerIcon = displayUserInfo || createMode?<Group/>:<Event/>

  function addClient(){
    setCreateMode(true)
    setCurrentClient(null)
  }

  function handleHeaderBackEvent(){
    if((displayUserInfo) || (createMode)){
      console.log("set states to null")
      setDisplayUserInfo(false);
      setCreateMode(false);
      setCurrentClient(null)
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
    
    setCreateMode(false)
  }

  function handleMoreInfo (id){
    getClientById(id).then((client)=>{
      // receiving the result of createClient dataService function
      console.log(client);
      if(client){
        setCurrentClient(client)
        setDisplayUserInfo(true)
      }
    }).catch(err=>{
      console.log(`error occured while get client by id ${id}`)
      console.error(err)
    })
  }

  function handleEdit(editedClient){
    editClient(editedClient).then((result)=>{
      if(result){
        clients.map((client)=>{
          if(client.id === editedClient.id){
            let index = clients.indexOf(client)
            let newClients = [...clients]
            //replacing the old client with the new client that we edited
            newClients.splice(index, 1, editedClient)
            setClients(newClients);
            setCurrentClient(null);
          }
        })
      }
    }).catch(err=>{
      console.log(`error occured while editing client ${editedClient.id}`)
      console.error(err)
    })
  }

  return(
    <Box style={clientPageStyle}>
      <Header icon={headerIcon} backEvent={handleHeaderBackEvent}></Header>
      {dataLoaded && !createMode && !displayUserInfo && <ClientList clients={clients} onDelete={handleDetete} onMoreInfo={handleMoreInfo}/>}
      {(createMode || currentClient!==null || displayUserInfo) && <ClientDetails createMode={createMode} client={currentClient} onCreateClient={handleCreateClient} onEditClient={handleEdit}/>}
      {(!createMode || !displayUserInfo) && <Footer onAdd={addClient}/>}
    </Box>
  )
}