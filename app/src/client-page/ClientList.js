import { NavLink } from "react-router-dom";
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
    gridTemplateColumns:'repeat(3, 1fr)',
    gridGap:'2em',
    justifyItems: 'center',
    margin: '2em',
    padding: '2em'
}
const cardStyle = {
    margin:0
}

export default function ClientList(props){
    let clients = props.clients

    return (
        <Box style={cardContainerStyle}>
            {clients.map((client) => (
                <Card key={client.id} sx={cardStyle}>
                    <CardContent>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            {client.name}
                        </Typography>
                        <Typography variant="h5" component="div">
                            be{bull}nev{bull}o{bull}lent
                        </Typography>
                        <Typography variant="body2">
                            well meaning and kindly.
                            <br />
                            {'"a benevolent smile"'}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <NavLink to={`/client/${client.id}`}><Button size="small">More Info</Button></NavLink>
                    </CardActions>
                </Card>
            ))}
        </Box>
    )
}