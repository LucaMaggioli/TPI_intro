export async function createClient(client){
  // executing function createClient on dataservice... will call electron api
  let result = await window.api.createClient(client);
  //return a promise
  return new Promise((resolve)=>{resolve(result)})
}
export async function deleteClientById(id){
  let result = await window.api.deleteClientById(id);
  //return a promise
  return new Promise((resolve)=>{resolve(result)})
}
export async function getClients(){
  // getting the clients from the electron backend that ask the database
  let clients = await window.api.getClients();
  // return a promise with the clients
  return new Promise((resolve)=>{resolve(clients)})
}
export async function getClientById(id){
  // getting the client by id from the electron backend that ask the database
  let client = await window.api.getClientById(id);
  // return a promise with the clients
  return new Promise((resolve)=>{resolve(client)})
}

export async function editClient(editedClient){
  // modify the client from the electron backend that tell the database
  let result = await window.api.editClient(editedClient);
  // return a promise with the clients
  return new Promise((resolve)=>{resolve(result)})
}

export async function getProjectsForClient(id){
    // modify the client from the electron backend that tell the database
    let result = await window.api.getClientProjects(id);
    // return a promise with the clients
    return new Promise((resolve)=>{resolve(result)})
}