
import bcrypt from "bcrypt"
export const register =async(req,res)=>{
    try{
        const{full_name,email,phone,dob,address,password,confirm_password}=req.body;
        if(! full_name|| !email || !phone || !dob || !address || !password || !confirm_password){
            return res.status(400).json({
                  message: "All fields are required"
            })
        }
         if (password !== confirm_password) {
      return res.status(400).json({
        message: "Passwords do not match"
      });
    }



    }catch(error){
        return res.status(400).json({
            message:"error not found"
        })
    }
}