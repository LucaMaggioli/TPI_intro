import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

import { getClientById } from "../Services/dataService";

export default function ClientDetails(){
    const [editMode, setEditMode] = useState(false)
    
    let params = useParams();
    let client = getClientById(parseInt(params.clientId))

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

    return(
        <Box>
            <Card key={client.id} sx={cardStyle}>
                <CardContent>
                    {editMode?
                        <TextField id="filled-basic" label="Filled" variant="filled" />
                    :
                        <Typography variant="h5" component="div">
                            {client.name}
                        </Typography>
                    }
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        {client.address} : {client.npa}
                    </Typography>
                    {(client.projects.length > 0) &&
                        <Box>
                            <Typography variant="paragraph">
                                Projects: 
                            </Typography>
                            <Box style={subBox}>
                            {client.projects.map((project)=>(
                                <Button style={projButtonStyle} variant="outlined" key={project.id}>#{project.id} - {project.name}</Button>
                            ))}
                            </Box>
                        </Box>
                    }
                    {(client.invoices.length > 0) &&
                        <Box>
                            <Typography variant="paragraph">
                                invoices: 
                            </Typography>
                            <Box style={subBox}>
                            {client.invoices.map((invoice)=>(
                                <Button style={projButtonStyle} variant="outlined" key={invoice.id}>
                                    #{invoice.id} | {' '}
                                    {invoice.date.getFullYear()}-
                                    {invoice.date.getUTCMonth()}-
                                    {invoice.date.getUTCDate()}
                                    {' '}| {invoice.amount}CHF
                                    </Button>
                            ))}
                            </Box>
                        </Box>
                    }
                </CardContent>
                <CardActions>
                    {editMode?
                    <Box sx={{display:'flex', flexDirection:'row', gridGap:'8px'}}>
                        <Button onClick={()=>setEditMode(false)} size="small" variant='contained' color="success">Save</Button>
                        <Button onClick={()=>setEditMode(false)} size="small" variant='contained' color="error">Discard</Button>
                    </Box>
                    :
                        <Button onClick={()=>setEditMode(true)} size="small">Edit</Button>
                    }
                </CardActions>
            </Card>
        </Box>
    )
}