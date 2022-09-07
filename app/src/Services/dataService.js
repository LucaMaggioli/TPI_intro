let invoices = [
  {
    name: "Santa Monica",
    number: 1995,
    amount: "$10,800",
    due: "12/05/1995",
  },
  {
    name: "Stankonia",
    number: 2000,
    amount: "$8,000",
    due: "10/31/2000",
  },
  {
    name: "Ocean Avenue",
    number: 2003,
    amount: "$9,500",
    due: "07/22/2003",
  },
  {
    name: "Tubthumper",
    number: 1997,
    amount: "$14,000",
    due: "09/01/1997",
  },
  {
    name: "Wide Open Spaces",
    number: 1998,
    amount: "$4,600",
    due: "01/27/1998",
  },
];

// let clients = [
//     {
//         id: 0,
//         name:"Nagravision SA",
//         address:"Rte de geneve 22",
//         npa:"1021",
//         projects: [],
//         invoices:[]
//     },
//     {
//         id: 1,
//         name:"Kudelski SA",
//         address:"Rte de geneve 24",
//         npa:"1021",
//         projects: [],
//         invoices:[]
//     },
//     {
//       id: 2,
//       name:"Marco Carb. SA",
//       address:"Rte de Bussigny 33",
//       npa:"1020",
//       projects: [
//           {id:2, name:"E-commerce", desc:"Vente de chaussettes parfumées"}
//       ],
//       invoices:[]
//   }, {
//     id: 2,
//     name:"Marco Carb. SA",
//     address:"Rte de Bussigny 33",
//     npa:"1020",
//     projects: [
//         {id:2, name:"E-commerce", desc:"Vente de chaussettes parfumées"}
//     ],
//     invoices:[]
// }, {
//   id: 2,
//   name:"Marco Carb. SA",
//   address:"Rte de Bussigny 33",
//   npa:"1020",
//   projects: [
//       {id:2, name:"E-commerce", desc:"Vente de chaussettes parfumées"}
//   ],
//   invoices:[]
// }, {
//   id: 2,
//   name:"Marco Carb. SA",
//   address:"Rte de Bussigny 33",
//   npa:"1020",
//   projects: [
//       {id:2, name:"E-commerce", desc:"Vente de chaussettes parfumées"}
//   ],
//   invoices:[]
// },   {
//   id: 2,
//   name:"Marco Carb. SA",
//   address:"Rte de Bussigny 33",
//   npa:"1020",
//   projects: [
//       {id:2, name:"E-commerce", desc:"Vente de chaussettes parfumées"}
//   ],
//   invoices:[]
// }, {
//   id: 2,
//   name:"Marco Carb. SA",
//   address:"Rte de Bussigny 33",
//   npa:"1020",
//   projects: [
//       {id:2, name:"E-commerce", desc:"Vente de chaussettes parfumées"}
//   ],
//   invoices:[]
// }, {
//   id: 2,
//   name:"Marco Carb. SA",
//   address:"Rte de Bussigny 33",
//   npa:"1020",
//   projects: [
//       {id:2, name:"E-commerce", desc:"Vente de chaussettes parfumées"}
//   ],
//   invoices:[]
// }, {
//   id: 2,
//   name:"Marco Carb. SA",
//   address:"Rte de Bussigny 33",
//   npa:"1020",
//   projects: [
//       {id:2, name:"E-commerce", desc:"Vente de chaussettes parfumées"}
//   ],
//   invoices:[]
// }, {
//   id: 2,
//   name:"Marco Carb. SA",
//   address:"Rte de Bussigny 33",
//   npa:"1020",
//   projects: [
//       {id:2, name:"E-commerce", desc:"Vente de chaussettes parfumées"}
//   ],
//   invoices:[]
// }, {
//   id: 2,
//   name:"Marco Carb. SA",
//   address:"Rte de Bussigny 33",
//   npa:"1020",
//   projects: [
//       {id:2, name:"E-commerce", desc:"Vente de chaussettes parfumées"}
//   ],
//   invoices:[]
// }, {
//   id: 2,
//   name:"Marco Carb. SA",
//   address:"Rte de Bussigny 33",
//   npa:"1020",
//   projects: [
//       {id:2, name:"E-commerce", desc:"Vente de chaussettes parfumées"}
//   ],
//   invoices:[]
// }, {
//   id: 2,
//   name:"Marco Carb. SA",
//   address:"Rte de Bussigny 33",
//   npa:"1020",
//   projects: [
//       {id:2, name:"E-commerce", desc:"Vente de chaussettes parfumées"}
//   ],
//   invoices:[]
// }, {
//   id: 2,
//   name:"Marco Carb. SA",
//   address:"Rte de Bussigny 33",
//   npa:"1020",
//   projects: [
//       {id:2, name:"E-commerce", desc:"Vente de chaussettes parfumées"}
//   ],
//   invoices:[]
// }, {
//   id: 2,
//   name:"Marco Carb. SA",
//   address:"Rte de Bussigny 33",
//   npa:"1020",
//   projects: [
//       {id:2, name:"E-commerce", desc:"Vente de chaussettes parfumées"}
//   ],
//   invoices:[]
// }, {
//   id: 2,
//   name:"Marco Carb. SA",
//   address:"Rte de Bussigny 33",
//   npa:"1020",
//   projects: [
//       {id:2, name:"E-commerce", desc:"Vente de chaussettes parfumées"}
//   ],
//   invoices:[]
// },
//     {
//       id: 3,
//       name:"Yann Bern. SA",
//       address:"Ch. de la campagne 22",
//       npa:"1007",
//       projects: [
//           {id:0, name:"Shield TV config", desc:"Brieve lorem ipsum"},
//           {id:1, name:"Wow dounjeon", desc:"Brieve lorem ipsum"}
//       ],
//       invoices:[
//         {id:0, name:"first Invoice", amount:555.12, date:new Date('2022-09-06')},
//         {id:1, name:"invoice for wow doungeon", amount:750.05, date:new Date(2022, 9, 9)}
//       ]
//   },    {
//     id: 4,
//     name:"Yann Bern. SA",
//     address:"Ch. de la campagne 22",
//     npa:"1007",
//     projects: [
//         {id:0, name:"Shield TV config", desc:"Brieve lorem ipsum"},
//         {id:1, name:"Wow dounjeon", desc:"Brieve lorem ipsum"}
//     ],
//     invoices:[]
// }
//   ];
let testClient = {
    id: 0,
    name:"Marco Carb. SA",
    address:"Rte de Bussigny 33",
    npa:"1020",
    projects: [
        {id:2, name:"E-commerce", desc:"Vente de chaussettes parfumées"}
    ],
    invoices:[]
}

var clients = localStorage.getItem('clients');
console.log("clients from dataservice")
console.log(JSON.parse(clients))
if (clients === null || clients === undefined) {
  clients = [testClient]
  localStorage.setItem('clients', JSON.stringify(clients)) 
}

export async function getClients(){
    // return clients;
    // let clients = await window.api.getClients();
    // let clients = localStorage.getItem('clients');
    // console.log(clients)
    // if (clients === null) {
    //   clients = []
    //   localStorage.setItem('clients', clients) 
    // }

    console.log((JSON.parse(clients)))
    return new Promise((resolve, reject) => {resolve(JSON.parse(clients))})
}
export function getClientById(id){
  let clients = JSON.parse(localStorage.getItem('clients'))
  let client = clients.find(
      (client)=> client.id === id
  );
  client===undefined ? client = {
        id: clients.length + 1,
        name:"",
        address:"",
        npa:"",
        projects: [],
        invoices:[]
      }
    :
      client = client
  return new Promise((resolve, reject)=> resolve(client))
}
export function createClient(client){
  let clients = JSON.parse(localStorage.getItem('clients'))
  let id = clients.length + 1
  client.id = id
  clients.push(client)
  localStorage.setItem('clients', JSON.stringify(clients)) 
  return new Promise((resolve,reject)=>{resolve(JSON.stringify(client))})
}
export function editClientById(id, newClient){
    let oldClient = clients.find(
        (client)=> client.id === id
    );
    oldClient.name = newClient.name;
    oldClient.address = newClient.address;
    oldClient.npa = newClient.npa;
}
export function getInvoices() {
  return invoices;
}