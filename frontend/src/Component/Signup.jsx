import React, { useState } from 'react'
import {Button,TextField,Box ,InputAdornment} from '@mui/material'
import EnhancedEncryptionOutlinedIcon from '@mui/icons-material/EnhancedEncryptionOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import {useSnackbar} from 'notistack'
import axios from 'axios';
import { config } from "../App";
import { useNavigate,Link } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();
 
  const { enqueueSnackbar } = useSnackbar();
    const [userData,setUserData]=useState({
        email:"",
        password:"",
        confirmPassword:""
    })
const handleInput=(e)=>{
const {id,value}=e.target;
setUserData({
    ...userData,
    [id]:value
})
}

const validateInput = (data) => {

  console.log('heeyy i am in validateInput function')
  if(data.email==="")
 {
  enqueueSnackbar("Email is a required field")
  return false;
 }
 
  
  else if(data.password==="")
  {
    enqueueSnackbar("Password is a required field");
  return false;
}
 
  else if(data.password!==data.confirmPassword)
 {
  enqueueSnackbar( "Password do not match");
  return false;
 }
   return true;
};

const signup=async(formData)=>{
  
  console.log('hello i m in starting of signup form')
    if(!validateInput(formData)){ // to validate or checkpoint the user input 
      return;
      }

    try {
   console.log(config.endpoint);
        const response = await axios.post(`${config.endpoint}/auth/signup`, {
      email: formData.email,
      password: formData.password,
    }, {
      headers: {
        'Content-Type': 'application/json',
      }
    });
    console.log(response.data);
      setUserData({
        email: "",
        password: "",
        confirmPassword:""
      });
   
     
      enqueueSnackbar("Registed successfully", { variant: "success" });
     
      navigate("/auth/signin");
    } catch (e) {
  
      if (e.response && e.response.status === 400) {
        return enqueueSnackbar(e.response.data.message, { variant: "error" });
      } else {
        enqueueSnackbar(
          "Something went wrong. check that the backend is running, reachable and return valid JSON.",
          { variant: "error" }
        );
      }
    }
  
}

const handleForm=(e)=>{
    e.preventDefault();
console.log(userData);
console.log('hello i am in handleForm ')
signup(userData);
}

  return (
    
    <div>
        <Box className="signup">
       <h2>SignUp</h2>
       <form className='form-container' action="" onSubmit={handleForm}>
       <TextField id="email" label="Email" variant="outlined" type='text' value={userData.email} onChange={handleInput} 
         InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <EmailOutlinedIcon />
              </InputAdornment>
            ),
          }} />
       <TextField id="password" label="Password" variant="outlined" type='password'value={userData.password} onChange={handleInput} 
         InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <EnhancedEncryptionOutlinedIcon />
              </InputAdornment>
            ),
          }} />
       <TextField id="confirmPassword" label="Confirm-Password" variant="outlined" type='password' value={userData.confirmPassword} onChange={handleInput} 
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <EnhancedEncryptionOutlinedIcon />
              </InputAdornment>
            ),
          }} />
       <Button variant="contained" type='submit' >Signup</Button>
       </form>
       <p className="secondary-action">
            Already have an account?{" "}
           
            <Link className="link" to="/auth/signin">Login here </Link>
          </p>
       </Box>
        </div>
        
  )
}

export default Signup