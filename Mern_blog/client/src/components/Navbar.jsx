import React, { useState } from "react";
import {
  Box,
  Typography,
  AppBar,
  Toolbar,
  Button,
  Tab,
  Tabs,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector , useDispatch} from "react-redux";
import { logout } from "../redux/authSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const navigate=useNavigate()
  const dispatch=useDispatch();
  const [value, setValue] = useState();
  let { isLogin } = useSelector((state) => state.auth);
  isLogin=isLogin || localStorage.getItem("userId")
  function handleLogout(){
    try{
     dispatch(logout())
     toast.success("User Logout Successfully")
     navigate('/login')
     localStorage.clear()
    }catch(error){
     console.log("Logout Error is",error)
    }
  }
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h4">My Blog App</Typography>
        <Box display={"flex"} marginX={"auto"}>
          {isLogin && (
              <Tabs
              textColor="inherit"
              value={value}
              onChange={(e, val) => setValue(val)}
            >
              <Tab label="Blogs" LinkComponent={Link} to="/blogs" />
              <Tab label="My Blogs" LinkComponent={Link} to="/myblog" />
              <Tab label="Create Blog" LinkComponent={Link} to="/createblog" />
            </Tabs>
          )}
        </Box>
        <Box display="flex" marginLeft="auto">
          {!isLogin && (
            <>
              <Button sx={{ margin: 1, color: "white" }}>
                <Link to="/login">Login</Link>
              </Button>
              <Button sx={{ margin: 1, color: "white" }}>
                <Link to="/register">Register</Link>
              </Button>
            </>
          )}
          {
            isLogin && 
          <Button sx={{ margin: 1, color: "white" }}>
            <Link to="/logout" onClick={handleLogout}>Logout</Link>
          </Button>
           }
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
