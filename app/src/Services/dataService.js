export async function createClient(client){
  // executing function createClient on dataservice... will call electron api
  let result = await window.api.createClient(client);
  //return a promise
  return new Promise((resolve, reject)=>{resolve(result)})
}
export async function deleteClientById(id){
  let result = await window.api.deleteClientById(id);
  //return a promise
  return new Promise((resolve, reject)=>{resolve(result)})
}
export async function getClients(){
  // getting the clients from the electron backend that ask the database
  let clients = await window.api.getClients();
  // return a promise with the clients
  return new Promise((resolve, reject)=>{resolve(clients)})
}
export function getClientById(){

}