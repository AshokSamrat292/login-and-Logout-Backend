// whenever we are connected with the database always use try catch since we will fetch information from there which is time 
// taking so always use async await 

import dotenv from 'dotenv'
import ConnectDB  from './db/index.js'
import { App } from './app.js';

dotenv.config({ path: './.env' })

ConnectDB().then(()=>{
     App.on("error" , (error)=>{
        console.log("error while opening :" , error)
     })
   
      App.listen(process.env.PORT  , ()=>{
        console.log("App listening on port no. : " , process.env.PORT) ; 
      })
}).catch((error)=>{
    console.error(error)
}); 






















// import express from 'express'
// const App = express() ; 
// (async ()=>{
//    try {
//          await mongoose.connect(`${process.env.Db_url}/${db_name}`) ; 
//          App.on("error" , (error)=>
//         {
//             console.log(`err: ${error}`)
//         })
//         App.listen(process.env.port , ()=>{
//            console.log("App listening on the port " + `${process.env.port}`)
//         })
//    }catch{

//    }
// })() ; // using arrow function using () it will automatically execute this function once run this program 