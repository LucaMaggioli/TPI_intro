import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

import { getClientById, editClientById } from "../Services/dataService";


    const cardStyle = {
        width:'40vw',
        height:'66vh',
        margin:'2em',
    }
    const projButtonStyle = {
        width: '30vw',
        height: 'auto',
        margin: '6px',
        color: ''
    }
    const subBox = {
        height: '16vh',
        overflow: 'scroll',
        overflowX: 'hidden'
    }


export default function ClientDetails(props){
    const [client, setClient] = useState(null)
    const [editMode, setEditMode] = useState(false)
    const [createMode, setCreateMode] = useState(false)
    const [editedClient, setEditedClient] = useState({...client})


    useEffect(()=>{
        setClient(props.client)
        setCreateMode(props.createMode)
    },[])

    function handleSave(){
        console.log(`send patch client with new client: `)
        console.log(editedClient)
        props.onEditClient(editedClient)
    }
    function handleDiscard(){
        setEditedClient({...client})
        setEditMode(false)
    }
    function handleEdit(){
        setEditMode(true)
        setEditedClient({...client})
    }
    function handleCreate(){
        console.log(`send create client with new client: `)
        console.log(editedClient)
        props.onCreateClient(editedClient)
    }
    function handleNameChanges(e){
        let newCli = {...editedClient}
        newCli.name = e.target.value
        setEditedClient(newCli);
        console.log(editedClient)
    }
    function handleMailChanges(e){
        let newCli = {...editedClient}
        newCli.email = e.target.value
        setEditedClient(newCli);
        console.log(editedClient)
    }

    return (<>
            <Card sx={cardStyle}>
                <CardContent sx={{display:'flex', flexDirection:'column', gridGap:'8px'}}>
                    {client !== null && !editMode && !createMode && <Box>
                            <Typography variant="h5" component="div"> {client.name} </Typography> 
                            <Typography sx={{ fontSize: 16 }} component="div"> {client.email} </Typography>
                    </Box>}
                    {(editMode || createMode) && <TextField id="cliName" label="name" variant="filled" value={editedClient.name} onChange={handleNameChanges} />}
                    {(editMode || createMode) && <TextField id="cliEmail" label="mail" variant="filled" value={editedClient.email} onChange={handleMailChanges} />}
                </CardContent>
                <CardActions>
                    {editMode &&
                    <Box sx={{display:'flex', flexDirection:'row', gridGap:'8px'}}>
                        <Button onClick={handleSave} size="small" variant='contained' color="success">Save</Button>
                        <Button onClick={handleDiscard} size="small" variant='contained' color="error">Discard</Button>
                    </Box>}
                    {client !== null && !editMode && !createMode &&
                        <Button onClick={handleEdit} size="small">Edit</Button>
                    }
                    {createMode &&
                        <Button onClick={handleCreate} size="small">Create</Button>
                    }
                </CardActions>
            </Card>
    </>)
}


//     const [editMode, setEditMode] = useState(false)
//     const [normalMode, setNormalMode] = useState(!editMode && !props.createMode)
    
//     const [client, setClient] = useState(null)
//     const [clientChanges, setClientChanges] = useState({...client})

//     useEffect(()=>{
//         setClient(props.client)
//     }, [])

//     function nameChanges(e){
//         let newCli = {...clientChanges}
//         newCli.name = e.target.value
//         setClientChanges(newCli);
//         console.log(clientChanges)
//     }
//     function addressChanges(e){
//         let newCli = {...clientChanges}
//         newCli.address = e.target.value
//         setClientChanges(newCli);
//         console.log(clientChanges)
//     }
//     function npaChanges(e){
//         let newCli = {...clientChanges}
//         newCli.npa = e.target.value
//         setClientChanges(newCli);
//         console.log(clientChanges)
//     }
//     function saveChanges(){
//         setClient(clientChanges);
//         editClientById(client.id, client)
//     }
//     function resetChanges(){
//         setClientChanges({...client});
//     }
//     function createClient(){
//         console.log(clientChanges)
//         props.onCreateClient(clientChanges)
//         resetChanges()
//     }

//     return(
//         <Box>
//             {client !== null &&
//                 <Card key={client.id} sx={cardStyle}>
//                     <CardContent>
//                         {editMode &&
//                             <TextField id="cliName" label="name" variant="filled" value={clientChanges.name} onChange={nameChanges} />
//                         }
//                         {props.createMode &&
//                             <TextField id="cliName" label="name" variant="filled" value={clientChanges.name} onChange={nameChanges} />
//                         }
//                         {normalMode &&
//                             <Typography variant="h5" component="div">
//                                 {client.name}
//                             </Typography>
//                         }
//                         {editMode &&
//                             <Box style={{display:'flex', flexDirection:'row', justifyContent:'center'}}>
//                                 <TextField id="cliAddress" label="address" variant="filled" value={clientChanges.address} onChange={addressChanges} />
//                                 <TextField id="cliNpa" label="npa" variant="filled" value={clientChanges.npa} onChange={npaChanges} />
//                             </Box>
//                         }
//                         {props.createMode &&
//                             <Box style={{display:'flex', flexDirection:'row', justifyContent:'center'}}>
//                                 <TextField id="cliAddress" label="address" variant="filled" value={clientChanges.address} onChange={addressChanges} />
//                                 <TextField id="cliNpa" label="npa" variant="filled" value={clientChanges.npa} onChange={npaChanges} />
//                             </Box>
//                         }
//                         {normalMode &&
//                             <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
//                                 {client.address} : {client.npa}
//                             </Typography>
//                         }

//                         {!props.createMode && 
//                         (client.projects.length > 0) &&
//                             <Box>
//                                 <Typography variant="paragraph">
//                                     Projects: 
//                                 </Typography>
//                                 <Box style={subBox}>
//                                 {client.projects.map((project)=>(
//                                     <Button style={projButtonStyle} variant="outlined" key={project.id}>#{project.id} - {project.name}</Button>
//                                 ))}
//                                 </Box>
//                             </Box>
//                         }
//                         {!props.createMode && 
//                         (client.invoices.length > 0) &&
//                             <Box>
//                                 <Typography variant="paragraph">
//                                     invoices: 
//                                 </Typography>
//                                 <Box style={subBox}>
//                                 {client.invoices.map((invoice)=>(
//                                     <Button style={projButtonStyle} variant="outlined" key={invoice.id}>
//                                         #{invoice.id} | {' '}
//                                         {invoice.date.getFullYear()}-
//                                         {invoice.date.getUTCMonth()}-
//                                         {invoice.date.getUTCDate()}
//                                         {' '}| {invoice.amount}CHF
//                                         </Button>
//                                 ))}
//                                 </Box>
//                             </Box>
//                         }
//                     </CardContent>
//                     <CardActions>
//                         {editMode &&
//                         <Box sx={{display:'flex', flexDirection:'row', gridGap:'8px'}}>
//                             <Button onClick={()=>{setEditMode(false); saveChanges()}} size="small" variant='contained' color="success">Save</Button>
//                             <Button onClick={()=>{setEditMode(false); resetChanges()}} size="small" variant='contained' color="error">Discard</Button>
//                         </Box>}
//                         {!editMode && !props.createMode &&
//                             <Button onClick={()=>setEditMode(true)} size="small">Edit</Button>
//                         }
//                         {props.createMode &&
//                             <Button onClick={createClient} size="small">Create</Button>
//                         }
//                     </CardActions>
//                 </Card>
//             }
//         </Box>
//     )
// }