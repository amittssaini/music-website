const userModel = require('../Models/user.model')
//const bcrypt = require('bcrypt')
const bcrypt=require('bcryptjs')
class Auth{
    // this is method which is used for creating the new user 
    signup=async(user)=>{
       try {
        const hashedPassword= await this.encryptPassword(user.password)
         const newUser = new userModel({...user,password:hashedPassword})
         const result =  await newUser.save();
         console.log('fetching result')
         console.log(result);
         return result;
       } catch (error) {
        return { success: false, message: error.message };
       }
    }
       // this is method i.e. use for checking the user are present  in the database or not
    singin=async(signinData)=>{
        try {
            const {email,password} = signinData;
           const user = await this.findUser(email);
           
            if(user)
            {
              const result=await  this.verifyPassword(password,user.password)
              if(result)
              {
                return{
                    Sigin :true,
                    email:user.email
                }
              }
              else{
                return{
                    sigin:false,
                    password:" password Does not match"
                }
              }

            }
            return "User Does not Find"
        } catch (error) {
            return { success: false, message: error.message };
        }

    }

    findUser=async(email)=>{
        try {
            const user = await userModel.findOne({email})
            return user;
        } catch (error) {
            
            return { success: false, message: error.message };
        }
    } 

    verifyPassword=async(password,hashedPassword)=>{
         const result = await bcrypt.compare(password,hashedPassword)
         return result;
    }


     encryptPassword=async(password)=>{
        const salt =await bcrypt.genSalt();
                const hashedPassword =await bcrypt.hash(password,salt);
console.log(hashedPassword);
return hashedPassword;
    }
}

module.exports = Auth;