import express from 'express' 
import cookieParser from 'cookie-parser';
import cors from 'cors'

const App = express() ;
// App.use(cors())    we have live like this also here all the request can be accessed but if you want specifiaclly then 
App.use((cors({
    origin : process.env.Cors_origin  ,   // if cors_origin=* allow all the site to access 
    credentials: true

}) ))
App.use(express.json({limit:"18KB"}))  // this we used to just handle the input if it in json format 
App.use(express.urlencoded({extended:true , limit:"18KB"})) ; // Advance Parsing 
App.use(express.static("public")) ; // any file like image for temporary 
App.use(cookieParser()) ; //  this is used so that i can keep some of my cookies in the user cookeis which server can access that
import { User_router } from './routes/user.routes.js'; // import router 

// router declaration 
App.use('/user' , User_router)  
export { App } 