import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserDetails } from '../helpers/user-details';
import authService from '../services/authService';

const Header = () => {
  const navigate = useNavigate();
  const userDetails = getUserDetails();

  
  const extractBeforeAt = (email) => {
    if (typeof email !== 'string') {
      return '';
    }
  
    const atIndex = email.indexOf("@");
    return atIndex !== -1 ? email.substring(0, atIndex) : email;
  };

  
  const isAdmin = () => {
    return userDetails && userDetails.role === 'ROLE_ADMIN';
  };

  
  const isLoggedIn = () => {
    const user = localStorage.getItem('user');
    return !!user && userDetails.id; 
  };

  
  const handleLogout = () => {
    authService.logout(); 
    navigate('/login'); 
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="#">Navbar</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/todos">Todo</a>
          </li>
          
            <li className="nav-item">
              <a className="nav-link" href="/create-todo">Create</a>
            </li>
         
        </ul>
        <div className="form-inline my-2 my-lg-0">
          {!isLoggedIn() ? (
            
            <>
              <li className="nav-item mr-4" style={{ listStyleType: 'none' }}>
                <button className="btn btn-outline-success me-2" onClick={() => navigate('/login')}>Connexion</button>
              </li>
              <li className="nav-item" style={{ listStyleType: 'none' }}>
                <button className="btn btn-outline-primary" onClick={() => navigate('/register')}>Créer un compte</button>
              </li>
            </>
          ) : (
            
            <li className="nav-item" style={{ listStyleType: 'none' }}>
              <span className="navbar-text mr-4">
                Bonjour, {extractBeforeAt(userDetails.email)}
              </span>
              <button className="btn btn-outline-danger" onClick={handleLogout}>Déconnexion</button>
            </li>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
