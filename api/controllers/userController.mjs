import { errorHandler } from "../utils/error.mjs"

export const check= (req,res)=>{
    res.json({
        message:'API IS WORKING'
    })
}

export const updateUser= async (req,res,next)=>{
    if(req.user.id!==req.params.id){
        return next(errorHandler(401,'You can update only your Account!'))
    }

    try{
        if(req.body.password){
            req.body.password=bcryptjs.hashSync(req.body.password,10);
        }
        const updateUser=await User.findByIdAndUpdate(
            req.params.id,
            {
                $set:{
                    Username:req.body.username,
                    email:req.body.email,
                    password:req.body.password,
                    profilePicture:req.body.profilePicture,
                }
            },{new:true}
        )
        const {password,...rest}=updatedUser._doc;
        res.status(200).json(rest);


    }catch(error){
        next(error)
    }


}