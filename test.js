import mongoose from "mongoose";

const URI = "mongodb://atlas-sql-6a11dbbcacf958ad8dcb57c2-embvio.a.query.mongodb.net/sample_mflix?ssl=true&authSource=admin";

mongoose.connect(URI)
.then(() => console.log("CONNECTED"))
.catch(err => console.log(err));