import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import './Login.css';
import axios from "axios";
import { Navigate, useNavigate } from 'react-router-dom'; 

const Login = () => {
  const navigate=useNavigate();
  const [form, setForm] = useState({ name: "", password: "" });
  

  const handleForm = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = `http://localhost:3000/login/${form.name}/${form.password}`;
      const response = await axios.get(url);
      console.log(response.data.message);

      if (response.data.message === "successfully logged in") {
        alert("Login successfully");
     navigate("/show-friend", { state: { refresh: true } });
      } else {
        alert(response.data.message); 
      }
    } catch (error) {
      console.error(error);
      alert("Login failed");
      form.name=""
      form.password=""
    }
  }

  return (
    <form onSubmit={handleSubmit} className='loginform'>
      <h2 className='loginh2'>Welcome Back!</h2>
      <p className='loginp1'>Log in to manage your friends</p>

      <label className='loginlabel'>Username</label>
      <div className="input-group mb-3">
        <span className="input-group-text"><i className="bi bi-envelope"></i></span>
        <input
          type="text"
          className="form-control"
          placeholder="Username"
          value={form.name}
          name="name"
          onChange={handleForm}
        />
      </div>

      <label className='loginlabel'>Password</label>
      <div className="input-group mb-3">
        <span className="input-group-text"><i className="bi bi-lock"></i></span>
        <input
          type="password"
          className="form-control"
          placeholder="Password"
          value={form.password}
          name="password"
          onChange={handleForm}
        />
      </div>

      <button type="submit" className='btn btn-secondary loginbtn'>Login</button>
    </form>
  );
}

export default Login;
