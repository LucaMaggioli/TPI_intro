import { Link, Outlet } from "react-router-dom";
import { getClients } from "../Services/dataService"

export default function ClientPage(){
    let clients = getClients();
    return(<div>
        <h2>Clients:</h2>
        <div style={{'display':'flex', 'flexDirection':'column'}}>
            {clients.map((client) => (
                <Link
                to={`/client/${client.id}`}
                key={client.id}>
                    {client.name}
                </Link>
            ))}
            <Outlet/>
        </div>
    </div>)
}