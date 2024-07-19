import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import TodoList from './components/TodoList';
import CreateTodos from './components/CreateTodos';
import Header from './shared/Header';
import PrivateRoute from './helpers/PrivateRoute';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Login />} />

        
        <Route path="/todos" element={
          <PrivateRoute>
            <TodoList />
          </PrivateRoute>
        } />

        
        <Route path="/create-todos" element={
          <PrivateRoute>
            <CreateTodos />
          </PrivateRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;
