import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Addfriend.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from "axios";

const Addfriend = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { user: editUser, index, edit } = location.state || {};

  const [user, setUser] = useState({
    firstname: editUser?.firstname || "",
    lastname: editUser?.lastname || "",
    age: editUser?.age || "",
    sex: editUser?.sex || "",
  });

  const handleForm = (e) => {
    const { name, value } = e.target;
    setUser(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user.firstname || !user.lastname || !user.age || !user.sex) {
      alert("Enter all inputs");
      return;
    }

    try {
      const url = edit
        ? `http://localhost:3000/friends/update/${index}?firstname=${user.firstname}&lastname=${user.lastname}&age=${user.age}&sex=${user.sex}`
        : `http://localhost:3000/friends/add?firstname=${user.firstname}&lastname=${user.lastname}&age=${user.age}&sex=${user.sex}`;

      const response = await axios.get(url);
      console.log("Response from backend:", response.data);
      alert(edit ? "Friend updated successfully!" : "Friend added successfully!");

      if (!edit) {
        setUser({ firstname: "", lastname: "", age: "", sex: "" });
      }
      navigate("/show-friend");
     
    } catch (error) {
      console.error("Error:", error);
      alert("Failed. Check backend connection.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form container-fluid">
      <h2 className="h2">{edit ? "✏️ Edit Friend" : "👥 Add Friend"}</h2>

      <div className="formdiv">
        <label htmlFor="firstname" className="label">First Name:</label>
        <input type="text" name="firstname" value={user.firstname} onChange={handleForm} />
      </div>

      <div className="formdiv">
        <label htmlFor="lastname" className="label">Last Name:</label>
        <input type="text" name="lastname" value={user.lastname} onChange={handleForm} />
      </div>

      <div className="formdiv">
        <label htmlFor="age" className="label">Age:</label>
        <input type="number" name="age" value={user.age} onChange={handleForm} />
      </div>

      <div className="formdiv">
        <label htmlFor="sex" className="label">Sex:</label>
        <select id="sex" name="sex" className="form-select" value={user.sex} onChange={handleForm}>
          <option value="">Select sex</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>

      <div className="divbtn">
        <button className="btn btn-secondary link" type="submit">
          {edit ? "Update Friend" : "Add a new friend"}
        </button>
        <button className="btn btn-secondary">
          <Link to="/show-friend" className="link">Show Friends</Link>
        </button>
      </div>
    </form>
  );
};

export default Addfriend;
