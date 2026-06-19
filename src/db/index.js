import mongoose from 'mongoose' 
import { db_name } from '../constant.js'

const ConnectDB = async () => {
    try {
        const mongoUri = process.env.MONGODB_URI  

        if (!mongoUri) {
            throw new Error('MONGODB_URI is missing in .env')
        }
         console.log("we reached ")
        const connectionStat = await mongoose.connect(`mongodb://ashojsamrat_db_user:ashok7061@ac-3edjn5v-shard-00-00.iznyeuu.mongodb.net:27017,ac-3edjn5v-shard-00-01.iznyeuu.mongodb.net:27017,ac-3edjn5v-shard-00-02.iznyeuu.mongodb.net:27017/?ssl=true&replicaSet=atlas-sqwyw9-shard-0&authSource=admin&appName=Ashok` )    

        console.log(`connection made with mongo DB host : ${connectionStat.connection.host}`)
    } catch (error) {
        console.error(`Error occurred while connecting with MongoDB: ${error.message}`)
        process.exit(1)
    }
}
export default ConnectDB ; 


