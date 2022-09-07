import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Add } from '@mui/icons-material';
import { Box, Typography, IconButton } from "@mui/material";
import Filter from "./Filter";

const FooterStyle = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent:'left',
    alignItems:'center',
    gridGap:'4em',
    margin:'2vh 2vw 2vh 2vw',
}

const circleButton = {
    backgroundColor: '#BDBDBD'
  }

export default function Footer(props){
    
    function handleFilters(filters){
        console.log(`filters returned in footers: ${filters}`)
    }

    return (
        <Box style={FooterStyle}>
            <IconButton style={circleButton} variant='outlined'><Add/></IconButton>
            <IconButton style={circleButton} variant='outlined'><Add/></IconButton>
            <Filter onFiltersModified={handleFilters}/>
            <IconButton style={circleButton} variant='outlined'><Add/></IconButton>
        </Box>
    );
}