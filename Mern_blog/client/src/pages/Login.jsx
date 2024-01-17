import React, { useState } from 'react'
import { Box, Typography, Button, TextField } from "@mui/material"
import { useNavigate } from 'react-router-dom'
import {useDispatch} from 'react-redux'
import axios from 'axios'
import toast from "react-hot-toast";
import {login} from '../redux/authSlice'
 
const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: ""
  })

  const navigate = useNavigate(); 
  const dispatch=useDispatch();
  
  const handleChange = (e) => {
    setInput((input) => (
      { ...input, [e.target.name]: e.target.value }
    ));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
     axios.post("/api/v1/user/login",{email: input.email, password: input.password})
      .then((res) => {
				console.log("waqar",res?.data?.user._id)
        if (res.status === 200 && res.data.success){
				localStorage.setItem('userId',res?.data?.user._id)
        toast.success("Login Successfully")
			  dispatch(login())
        navigate('/');
        }
      })
      .catch((err) => {
        console.log("Error is",err);
      });
    console.log(input);
    setInput({email:"", password:""});
  }

	return (
		<>
		<form onSubmit={handleSubmit}>
        <Box
          maxWidth={600}
          display="flex"
          flexDirection={"column"}
          alignItems="center"
          justifyContent={"center"}
          margin="auto"
          marginTop={5}
          boxShadow="10px 10px 20px #ccc"
          padding={3}
          borderRadius={5}
        >
          <Typography
            variant="h4"
            sx={{ textTransform: "uppercase" }}
            padding={3}
            textAlign="center"
          >
            Login 
          </Typography>
          <TextField
            fullWidth
            placeholder="email"
            name="email"
            margin="normal"
            type={"email"}
            required
            value={input.email}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            placeholder="password"
            name="password"
            margin="normal"
            type={"password"}
            required
            value={input.password}
            onChange={handleChange}
          />

          <Button
            size='large'
            type="submit"
            sx={{ borderRadius: 3, marginTop: 3, width:"85%" }}
            variant="contained"
            color="primary"
          >
            Submit
          </Button>
          <Button
            onClick={() => navigate("/register")}
            sx={{ borderRadius: 3, marginTop: 3 }}
          >
            Not a User? Please Register
          </Button>
        </Box>
      </form>
    </>
	)
}

export default Login