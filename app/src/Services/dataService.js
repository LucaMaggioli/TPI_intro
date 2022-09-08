export async function createClient(client){
  console.log("executing function createClient on dataservice... will call electron api, received client: ")
  console.log(client)
  // executing function createClient on dataservice... will call electron api
  let result = await window.api.createClient(client);
  //return a promise
  return new Promise((resolve, reject)=>{resolve(result)})
}
export function getClients(){

}
export function getClientById(){

}