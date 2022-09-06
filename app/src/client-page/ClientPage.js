import { Link, Outlet } from "react-router-dom";
import { getClients } from "../Services/dataService"
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const bull = (
    <Box
      component="span"
      sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
      •
    </Box>
  );
const cardContainerStyle = {
  display:'grid',
  gridTemplateColumn:'repeat(3, 1fr)'
}

export default function ClientPage(){
    let clients = getClients();
    return(<div>
        <h2>Clients:</h2>
        <div style={{'display':'flex', 'flexDirection':'column'}}>
            {clients.map((client) => (
                <Card key={client.id} sx={{ width: '20vw' }}>
                 <CardContent>
                   <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                     {client.name}
                   </Typography>
                   <Typography variant="h5" component="div">
                     be{bull}nev{bull}o{bull}lent
                   </Typography>
                   <Typography sx={{ mb: 1.5 }} color="text.secondary">
                     adjective
                   </Typography>
                   <Typography variant="body2">
                     well meaning and kindly.
                     <br />
                     {'"a benevolent smile"'}
                   </Typography>
                 </CardContent>
                 <CardActions>
                   <Button size="small">Learn More</Button>
                 </CardActions>
               </Card>
                // <Link
                // to={`/client/${client.id}`}
                // key={client.id}>
                //     {client.name}
                // </Link>
            ))}
            {/* <Outlet/> */}
        </div>
    </div>)
}