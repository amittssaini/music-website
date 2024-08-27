const Auth = require('../Services/auth.service');
//const bcrypt = require('bcrypt')
const authInstance = new Auth();
 // in this method we should register a new user we should fetch the credtinals and pass the service for creating the new user in the database
const postSignup = async(req,res)=>{
    try {
        const user = req.body;
        const result = await authInstance.signup(user);
        res.json(result);
    } catch (error) {
        return res.status(400).json({ message: "Email is already registered. Please use a different email." });

    }

}
// this is controller method which is used for login we will fetch the credentials and pass to the other level i.e. Services
const postSignin=async(req,res)=>{
    try {
        const user = req.body;
        const result = await authInstance.singin(user)
        res.json(result);
    } catch (error) {
        return res.status(400).json({ message: "Invalid email or password." });

    }
}
module.exports = {postSignup,postSignin}