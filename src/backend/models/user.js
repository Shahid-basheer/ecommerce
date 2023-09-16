import mongoose from "mongoose";
var bcrypt = require("bcryptjs")
const UsersSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true,"Name is required"]
    },
    email:{
        type:String,
        required:[true,"Email is required"],
        unique:true
    },
    password:{
        type:String,
        required:[true,"Password is required"],
        minLength:[6,"password must be longer than 6 digit or character"],
        select:false
    },
    avatar:{
        public_id:String,
        url:String
    },
    role:{
        type:String,
        default:"user"
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})
UsersSchema.pre("save",async function(next){
if(!this.isModified("password")){
    next()
}
this.password = await bcrypt.hash(this.password,10)
})

export default mongoose.models.Users || mongoose.model("Users",UsersSchema)