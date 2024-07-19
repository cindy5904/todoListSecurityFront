import React, { useState, useEffect } from 'react';

function UpdateTodo({ todo, onSave, onCancel }) {
 
  const [title, setTitle] = useState(todo?.title || '');
  const [description, setDescription] = useState(todo?.description || '');
  const [done, setDone] = useState(todo?.done || false);

  useEffect(() => {
    setTitle(todo?.title || '');
    setDescription(todo?.description || '');
    setDone(todo?.done || false);
  }, [todo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ id: todo.id, title, description, done });
  };

  return (
    <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Update Todo</h5>
            <button type="button" className="close" onClick={onCancel}>
              <span>&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Title</label>
                <input
                  type="text"
                  className="form-control"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <input
                  type="text"
                  className="form-control"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="form-group form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="done"
                  checked={done}
                  onChange={(e) => setDone(e.target.checked)}
                />
                <label className="form-check-label" htmlFor="done">
                  Done
                </label>
              </div>
              <button type="submit" className="btn btn-primary">Save changes</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateTodo;
