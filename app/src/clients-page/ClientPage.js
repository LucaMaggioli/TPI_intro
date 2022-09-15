import { Box } from "@mui/system";
import Footer from "../shared-components/Footer";
import Header from "../shared-components/Header";
import { Event, Group } from '@mui/icons-material';
import { useEffect, useState } from "react";
import Element from "../shared-components/Element";
import { getClients, deleteClientById, createClient, editClient, getProjectsForClient } from "../Services/clientDataService";
import { useNavigate } from "react-router-dom";

const listStyle = {display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gridGap:6, overflow:'auto', height:'70vh', margin:6}
const clientFields = ['id', 'name', 'email', 'address', 'city', 'npa', 'phone']

export default function ClientPage(){
    const [dataLoaded, setDataLoaded] = useState();
    const [clientsLoaded, setClientsLoaded] = useState(0);
    const [addMode, setAddMode] = useState(false);
    const [clients, setClients] = useState();

    let navigate = useNavigate();

    useEffect(()=>{
        getClients().then(data=>{
            setClients(data);
            setProjectsForClients(data).then((clients)=>{
                setClients(clients);
            });
            setDataLoaded(true)
        })
    }, [])


    // Functions block
    function handleBackEvent(){
        addMode ? setAddMode(false) : navigate('/calendar')
    }
    function handleCreateClient(client){
        createClient(client).then(result=>{
            if (result){
                getClients().then(clients=>{
                    setClients(clients)
                    setAddMode(false)
                })  
            }
        });
    }
    function handleEditClient(client){
        editClient(client).then(result=>{
            if(result){
                getClients().then(clients=>{
                    setClients(clients)
                })        
            }
        })
    }
    function handleDeleteClient(client){
        let confirmed = window.confirm(`Are you sure you want to delete '${client['name']}' ?`)
        if(confirmed){
            confirmed = window.confirm(`this operation is unrepairable, click OK to confirm`)
        }
        if(confirmed){
            deleteClientById(client.id).then(result=>{
                if(result){
                    getClients().then(clients=>{
                        setClients(clients)
                    })
                }
            })
        }
    }
    function setProjectsForClients(clients){
        return new Promise((resolve)=>{
            let clientsWithProjects = []
            clients.map(client=>{
                getProjectsForClient(client.id).then(projects=>{
                    if(projects.length > 0){
                        let clientWithProjects = {...client}
                        clientWithProjects.projects = projects
                        clientsWithProjects.push(clientWithProjects)
                        setClientsLoaded(clientsLoaded + 1)
                    }
                    else{
                        clientsWithProjects.push(client)
                    }
                })
            })
            resolve(clientsWithProjects)
        })
    }

    // Return block
    return (<Box>
        <Header icon={addMode?<Group/>:<Event/>} backEvent={handleBackEvent}/>
        <Box style={listStyle}>
            {dataLoaded && !addMode && clients.map(client=>{
                return(
                        <Element key={client.id}
                        ignoreFields={['id']}
                        fields={clientFields}
                        element={client}
                        onEditElement={handleEditClient}
                        onDeleteElement={handleDeleteClient}
                        />
            )})}
            {dataLoaded && addMode &&
            <Element key={clients[0].id}
                ignoreFields={['id']}
                fields={clientFields}
                element={clients[0]}
                createMode={true}
                onCreate={handleCreateClient}/>}
        </Box>
        <Footer onAdd={()=>{setAddMode(true)}}/>
    </Box>)
}