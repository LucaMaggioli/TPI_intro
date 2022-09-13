export async function getProjects(){
    // getting the clients from the electron backend that ask the database
    let projects = await window.api.getProjects();
    // return a promise with the clients
    return new Promise((resolve)=>{resolve(projects)})
}

export async function createProject(project){
    // executing function createClient on dataservice... will call electron api
    let result = await window.api.createProject(project);
    //return a promise
    return new Promise((resolve)=>{resolve(result)})
  }
  export async function deleteProjectById(id){
    let result = await window.api.deleteProjectById(id);
    //return a promise
    return new Promise((resolve)=>{resolve(result)})
  }
  
  export async function getClientById(id){
    // getting the client by id from the electron backend that ask the database
    let client = await window.api.getClientById(id);
    // return a promise with the clients
    return new Promise((resolve)=>{resolve(client)})
  }
  
  export async function editProject(editedProject){
    // modify the client from the electron backend that tell the database
    let result = await window.api.editProject(editedProject);
    // return a promise with the clients
    return new Promise((resolve)=>{resolve(result)})
  }