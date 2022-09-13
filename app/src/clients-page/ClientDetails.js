import { useState, useEffect } from "react";

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

    const cardStyle = {
        width:'40vw',
        height:'66vh',
        margin:'2em',
    }

export default function ClientDetails(props){
    const [client, setClient] = useState(null)
    const [editMode, setEditMode] = useState(false)
    const [createMode, setCreateMode] = useState(false)
    const [editedClient, setEditedClient] = useState()

    const [compoLoaded, setCompoLoaded] = useState(false)


    useEffect(()=>{ 
        console.log("client in clientDetail component")
        console.log(props.client)
        setClient(props.client)
        setCreateMode(props.createMode)

        if(props.createMode){
            setEditedClient({
                name:'',
                email:'',
                address:'',
                city:'',
                npa:'',
                phone:'',
            })//should be 'new client()' object with ts.. but lmao.-
        }
        setCompoLoaded(true)
    },[])

    function handleSave(){
        console.log(`send patch client with new client: `)
        console.log(editedClient)
        props.onEditClient(editedClient)
        setClient({...editedClient})
        setEditMode(false)
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
    function handleClientChanges(event, field){
        let newValue = event.target.value
        console.log(newValue, field)
        console.log(editedClient)
        let newCli = {...editedClient}
        console.log(editedClient)
        
        if (field === 'name'){newCli.name = newValue}
        if (field === 'email'){newCli.email = newValue}
        if (field === 'address'){newCli.address = newValue}
        if (field === 'city'){newCli.city = newValue}
        if (field === 'npa'){newCli.npa = newValue}
        if (field === 'phone'){newCli.phone = newValue}

        setEditedClient(newCli);
    }

    return (<>
            <Card sx={cardStyle}>
                {compoLoaded && 
                    <CardContent sx={{display:'flex', flexDirection:'column', gridGap:'8px'}}>
                        {client !== null && !editMode && !createMode && <Box>
                                <Typography variant="h5" component="div"> {client.name} </Typography> 
                                <Typography sx={{ fontSize: 16, margin: 4 }} variant="p" component="div">Mail :  {client.email} </Typography>
                                <Typography sx={{ fontSize: 16, margin: 4 }} variant="p" component="div">Address :  {client.address} </Typography>
                                <Typography sx={{ fontSize: 16, margin: 4 }} variant="p" component="div">City :  {client.city} </Typography>
                                <Typography sx={{ fontSize: 16, margin: 4 }} variant="p" component="div">NPA :  {client.npa} </Typography>
                                <Typography sx={{ fontSize: 16, margin: 4 }} variant="p" component="div">Phone :  {client.phone} </Typography>
                        </Box>}
                        {(editMode || createMode) && <TextField id="name" label="name" variant="filled" value={editedClient.name} onChange={(e)=>{handleClientChanges(e, 'name')}} />}
                        {(editMode || createMode) && <TextField id="email" label="email" variant="filled" value={editedClient.email} onChange={(e)=>{handleClientChanges(e, 'email')}} />}

                        {(editMode || createMode) && <TextField id="address" label="address" variant="filled" value={editedClient.address} onChange={(e)=>{handleClientChanges(e, 'address')}} />}
                        {(editMode || createMode) && <TextField id="city" label="city" variant="filled" value={editedClient.city} onChange={(e)=>{handleClientChanges(e, 'city')}} />}
                        {(editMode || createMode) && <TextField id="npa" label="npa" variant="filled" value={editedClient.npa} onChange={(e)=>{handleClientChanges(e, 'npa')}} />}

                        {(editMode || createMode) && <TextField id="phone" label="phone" variant="filled" value={editedClient.phone} onChange={(e)=>{handleClientChanges(e, 'phone')}} />}
                    </CardContent>
                } 
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