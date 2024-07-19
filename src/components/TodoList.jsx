import React, { useEffect, useState } from "react";
import { todoService } from "../services/todoService";


function TodoList() {
    const [todos, setTodos] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        todoService.getAllTodos().then(response => {
            console.log(response)
            setTodos(response.data);
        })
        .catch(error => {
            setError('Erreur lors de la récupération des toso');
        })
    }, []);

    const loadTodos = () => {
        todoService.getAllTodos()
          .then(response => {
            setTodos(response.data);
          })
          .catch(error => {
            setError('Erreur lors de la récupération des todos.');
          });
      };
      const [selectedTodo, setSelectedTodo] = useState(null);

    const updateTodo = (todoData) => {
        
        todoService.updateTodo(todoData)
          .then(() => {
            loadTodos();
            setSelectedTodo(null);
          })
          .catch(error => {
            setError('Erreur lors de la mise à jour de la todo.');
          });
      };
    
      const deleteTodo = (todoId) => {
        todoService.deleteTodo(todoId)
          .then(() => {
            loadTodos(); 
          })
          .catch(error => {
            setError('Erreur lors de la suppression de la todo.');
          });
      };
    

    return (
        <div className="container">
            <div class="row my-3">
            <div class="col-8 offset-2 rounded p-3">
                 <h1 class="fw-light text-center">- Todos List -</h1>
                 {error && <div className="alert alert-danger" role="alert">
        {error}
      </div>}
            <hr/>
            <table class="table align-middle table-striped text-center">
                <thead>
                <tr>
                    <th>#</th>
                    <th>Titre</th>
                    <th>Description</th>
                    <th>Done</th>
                    
                </tr>
                </thead>
                <tbody>
                    {todos.map((todo, index) => (
                        <tr key={todo.id}>
                            <th>{index + 1}</th>
                            <td>{todo.title}</td>
                            <td>{todo.description}</td>
                            <td>{todo.done}</td>
                            <td>
                                <button className="btn btn-danger mr-4" onClick={() => deleteTodo(todo.id)}>Supprimer</button>
                                <button className='btn btn-success' onClick={() => setSelectedTodo(todo)}>Update</button>
                        
                            </td>
                        </tr>
                    ))}
                </tbody>
                </table>
            </div>
            </div>
        </div>
    )
}
export default TodoList;