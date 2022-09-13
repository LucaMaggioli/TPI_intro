import { Box } from "@mui/system";
import Footer from "../shared-components/Footer";
import Header from "../shared-components/Header";
import { Event, Group } from '@mui/icons-material';
import { useEffect, useState } from "react";
import Element from "./Element";


export default function ProjectPage(){
    const [diaplayList, setDisplayList] = useState();

    useEffect(()=>{
        
    }, [])

    function handleBackEvent(){

    }

    return (<Box>
        <Header icon={<Event/>} backEvent={handleBackEvent}/>
        {<Element ignoreFields={['id']} fields={['id', 'name', 'description', 'startDate']} element={{'id':1,'name':'Pkp project de la dead', 'description':'a brief description', 'startDate':'13/09/2022'}}/>}
        <Footer/>
    </Box>)
}