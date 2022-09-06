import { useState } from "react";
import { NavLink } from "react-router-dom";
import { ArrowBackIos } from '@mui/icons-material';
import { Typography } from "@mui/material";

export default function Header(props){

    const HeaderStyle = {
        // height: '10vh',
        // width: '100vw',
        display: 'flex',
        flexDirection: 'row',
        justifyContent:'left',
        alignItems:'center',
        marginLeft:'2vw'
    }
    
    return (<div style={HeaderStyle}>
            <Typography variant="h4">
                <NavLink to={props.link}>
                    <ArrowBackIos></ArrowBackIos>
                    {props.icon}
                </NavLink>
            </Typography>
        </div>);
}