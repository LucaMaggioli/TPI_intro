import { ArrowBackIos } from '@mui/icons-material';
import { Box, Typography } from "@mui/material";

export default function Header(props){

    const HeaderStyle = {
        display: 'flex',
        flexDirection: 'row',
        justifyContent:'left',
        alignItems:'center',
        marginLeft:'2vw'
    }
    
    return (<Box style={HeaderStyle}>
            <Typography variant="h4" onClick={()=>{props.backEvent()}}>
                <ArrowBackIos></ArrowBackIos>
                {props.icon}
            </Typography>
        </Box>);
}