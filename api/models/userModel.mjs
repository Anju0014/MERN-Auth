import mongoose from 'mongoose';
const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    profilePicture:{
        type:String,
        default:"https://www.google.com/imgres?q=default%20instagram%20user%20profile%20free&imgurl=https%3A%2F%2Fstatic.vecteezy.com%2Fsystem%2Fresources%2Fthumbnails%2F020%2F765%2F399%2Fsmall_2x%2Fdefault-profile-account-unknown-icon-black-silhouette-free-vector.jpg&imgrefurl=https%3A%2F%2Fwww.vecteezy.com%2Ffree-vector%2Fdefault-profile-picture&docid=--oA6_9U9ufzsM&tbnid=bowkO_GA3uhk3M&vet=12ahUKEwiP2YnG9PaKAxX3SmwGHYwDIWsQM3oECBoQAA..i&w=400&h=400&hcb=2&ved=2ahUKEwiP2YnG9PaKAxX3SmwGHYwDIWsQM3oECBoQAA"
    },

    },
    {timestamps:true}
)

const User=mongoose.model('User',userSchema)

export default User