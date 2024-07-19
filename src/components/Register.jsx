import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';

const Register = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    roles: 'ROLE_USER', 
  });

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { name, email, password, roles } = userData;
      await authService.register(name, email, password, roles); 
      console.log('Utilisateur inscrit avec succès');
      navigate('/login'); 
    } catch (error) {
      console.error('Erreur lors de l\'inscription:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Inscription</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Nom</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={userData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Mot de passe</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={userData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="role" className="form-label">Rôle</label>
          <select
            className="form-control"
            id="roles"
            name="roles"
            value={userData.roles}
            onChange={handleChange}
            required
          >
            <option value="ROLE_USER">Utilisateur</option>
            <option value="ROLE_ADMIN">Administrateur</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">S'inscrire</button>
      </form>
    </div>
  );
};

export default Register;
