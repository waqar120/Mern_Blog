import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Blogs from './pages/Blogs';
import UserBlog from './pages/UserBlog';
import CreateBlog from './pages/CreateBlog';
import BlogDetail from './pages/BlogDetail';
import { Toaster } from 'react-hot-toast'

function App() {
  return (
    <>
    <Navbar/>
     <Toaster/>
      <Routes>
        <Route path="/" element={<Blogs/>} />
        <Route path="/blogs" element={<Blogs/>} />
        <Route path="/myblog" element={<UserBlog/>}/>
        <Route path="/blogdetail/:id" element={<BlogDetail/>}/>
        <Route path="/createblog" element={<CreateBlog/>}/>
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
      </Routes>
    </>
  );
}

export default App;

