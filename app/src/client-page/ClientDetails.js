import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getClientById } from "../Services/dataService";

export default function ClientDetails(){
    const [client, setClient] = useState()
    let params = useParams();
    let locClient = getClientById(parseInt(params.clientId))
    // console.log(params.clientId)
    // console.log(locClient)
    // useEffect(()=>{
    //     setClient(locClient);
    // });

    return(<>
        <h3>CLient details:</h3>
        <p>Id : {params.clientId}</p>
        {/* <ul>
            <li>{locClient.id}</li>
            <li>{locClient.name}</li>
            <li>{locClient.address}</li>
            <li>{locClient.npa}</li>
            <li>{locClient.projects}</li>
            <li>{locClient.invoices}</li>
        </ul> */}
        <ul>
            <li>{locClient.id}</li>
            <li>{locClient.name}</li>
            <li>{locClient.address}</li>
            <li>{locClient.npa}</li>
            {(locClient.projects.length > 0) && <ul>{locClient.projects.map((project)=>(<li key={project.id}>{project.name}</li>))}</ul>}
            {(locClient.invoices.length > 0 ) && <li>{locClient.invoices}</li>}
        </ul>
        </>)
}