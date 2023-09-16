import mongoose from "mongoose";
const dbConnect = ()=>{
    if(mongoose.connection.readyState>=1){
        return;
    }
    mongoose.connect(process.env.DB_URL).then(res=>console.log("Connection established "))
    .catch(err=>console.log("error occured",err))
}

export default dbConnect;