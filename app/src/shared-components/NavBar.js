import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Event, Menu, SettingsSuggest, Group, Close } from '@mui/icons-material';

export default function NavBar(){
    const [isOpen, setIsOpen] = useState(false);

    const navbarStyle = {
        backgroundColor: 'rgb(215, 215, 215)',
        height: '60px',
        width: isOpen?'260px':'60px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent:'space-evenly',
        alignItems:'center',
        borderRadius:'50px'
    }
    
    let value = isOpen ? 
                <div style={navbarStyle}>
                <NavLink to="/calendar" style={({isActive})=>{return{color:isActive?'blue':'black'}}}><Event/></NavLink>
                <NavLink to="/clients" style={({isActive})=>{return{color:isActive?'blue':'black'}}}><Group/></NavLink>
                <NavLink to="/projects" style={({isActive})=>{return{color:isActive?'blue':'black'}}}><SettingsSuggest/></NavLink>
                <Close onClick={()=>setIsOpen(false)}/>
            </div>
        :
        <div style={navbarStyle}>
            <Menu onClick={()=>setIsOpen(true)}></Menu>
        </div>
    return value;
}