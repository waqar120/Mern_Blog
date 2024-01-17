import React, { useState } from 'react'
import { Box, Typography, Button, TextField } from "@mui/material"
import { useNavigate } from 'react-router-dom'
import toast from "react-hot-toast";
import axios from 'axios'

const Register = () => {
  const [input, setInput] = useState({
    name: "",
    email: "",
    password: ""
  })

  const navigate = useNavigate(); // Move navigate here
  
  const handleChange = (e) => {
    setInput((input) => (
      { ...input, [e.target.name]: e.target.value }
    ));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    axios.post("/api/v1/user/register", { username: input.name, email: input.email, password: input.password })
      .then((res) => {
        if (res.status === 200 && res.data.successs)
        toast.success("User Registered Successfully")
        navigate('/login');
      })
      .catch((err) => {
        console.error(err);
      });
    console.log(input);
    setInput({ name: "", email: "", password: "" });
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
            Register
          </Typography>
          <TextField
            fullWidth
            placeholder="name"
            name="name"
            margin="normal"
            type={"text"}
            required
            value={input.name}
            onChange={handleChange}
          />
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
            sx={{ borderRadius: 3, marginTop: 3, width: "85%" }}
            variant="contained"
            color="primary"
          >
            Submit
          </Button>
          <Button
            onClick={() => navigate("/login")}
            sx={{ borderRadius: 3, marginTop: 3 }}
          >
            Already Registered? Please Login
          </Button>
        </Box>
      </form>
    </>
  )
}

export default Register
