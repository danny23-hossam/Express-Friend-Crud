import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Allfriends.css';
import axios from 'axios';

const Allfriends = () => {
  
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch users whenever component mounts or refresh state changes
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:3000/friends");
        setUsers(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []); 

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  // Delete friend
  const handleDelete = async (index) => {
    try {
      await axios.get(`http://localhost:3000/friends/delete/${index}`);
      alert('Friend deleted successfully!');
      setUsers(prev => prev.filter((_, i) => i !== index));
    } catch (err) {
      alert("Error occurred");
      console.error(err.message);
    }
  };

  // Edit friend
  const handleEdit = (index, user) => {
    navigate("/add-friend", { state: { user, index, edit: true } });
  };

  return (
    <>
      <div className='friendsdiv'>
        <h2 className='h2'>👥 Friends</h2>
        <Link to="/add-friend" className='a'>Add a new friend</Link>
      </div>

      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Age</th>
            <th>Sex</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{user.firstname}</td>
              <td>{user.lastname}</td>
              <td>{user.age}</td>
              <td>{user.sex}</td>
              <td>
                <button className='btn btn-warning warn' onClick={() => handleEdit(index, user)}>Edit</button>
                <button className='btn btn-danger warn' onClick={() => handleDelete(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Allfriends;
