import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { todoService } from '../services/todoService';

function CreateTodo() {
    const [ todo, setTodo] = useState({
        title: "",
        description: "",
        done: "",
        
    });
    const navigate = useNavigate();
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setTodo(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value
        }));
    };
    
    const handleSubmit = async (e) => {
        console.log(todo.title);
        e.preventDefault();

        try {
            await todoService.createTodo({todo});
            console.log('Todo created successfully');
            setTodo({ title: '', description: '', done: false });
            navigate('/todos');
        } catch (error) {
            console.error('Error creating todo:', error);
        }
    };
  
    return (
        <div className='container mt-5'>
            <h2>Créer un nouveau produit</h2>
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="todoName" className="form-label">Titre</label>
                <input 
                    type="text" 
                    className="form-control" 
                    id="productName" 
                    name="title" 
                    value={todo.title} 
                    onChange={handleChange} 
                />
            </div>
            <div className="mb-3">
                <label htmlFor="todoDescription" className="form-label">Description</label>
                <input 
                    type="text" 
                    className="form-control" 
                    id="todoDescription" 
                    name="description" 
                    value={todo.description} 
                    onChange={handleChange} 
                />
            </div>
            <div className="mb-3 form-check">
                    <input 
                        type="checkbox" 
                        className="form-check-input" 
                        id="todoDone" 
                        name="done" 
                        checked={todo.done} 
                        onChange={handleChange} 
                    />
                    <label className="form-check-label" htmlFor="todoDone">
                        Fait
                    </label>
                </div>
            <button type="submit" className="btn btn-primary">Créer</button>
        </form> 
        </div>
    )
}

export default CreateTodo;