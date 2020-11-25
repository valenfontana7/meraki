import React, { Fragment, useEffect, useState } from "react";

export default function ListTodos() {
  const [allTodos, setAllTodos] = useState([]);
  const [editTodo, setEditTodo] = useState({});
  const [todo, setTodo] = useState({
    todo_id: "",
    description: "",
  });

  const handleInputChange = (e, id) => {
    setTodo({
      ...todo,
      [e.target.name]: e.target.value,
      todo_id: id,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { description } = todo;
      const body = { description: description };
      const response = await fetch(`http://localhost:3002/todos`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(body),
      });
      if (response.status === 200) {
        setAllTodos([...allTodos, await response.json()]);
        document.getElementsByClassName("create")[0].value = "";
        setTodo({
          todo_id: "",
          description: "",
        });
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(async () => {
    const response = await fetch(`http://localhost:3002/todos`);
    const jsonData = await response.json();
    await setAllTodos(jsonData);
  }, []);

  const deleteTodo = async (id) => {
    try {
      const response = await fetch(`http://localhost:3002/todo/` + id, {
        method: "DELETE",
        headers: { "Content-type": "application/json" },
      });
      if (response.status === 200) {
        setAllTodos(allTodos.filter((todo) => todo.todo_id !== id));
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleEdit = (todo) => {
    setEditTodo(todo);
  };

  const modifyTodo = async (e, id) => {
    e.preventDefault();
    try {
      const body = { description: editTodo.description };
      const response = await fetch(
        `http://localhost:3002/todo/` + editTodo.todo_id,
        {
          method: "PUT",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(body),
        }
      );
      if (response.status === 200) {
        setAllTodos([
          ...allTodos.map((todo) => {
            if (todo.todo_id == id) {
              todo.description = editTodo.description;
              return todo;
            } else {
              return todo;
            }
          }),
        ]);
      }
      $("#exampleModal").modal("hide");
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleEditInputChange = (e) => {
    setEditTodo({
      ...editTodo,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Fragment>
      <h1 className="text-center mt-5">Lista de tareas</h1>
      <form onSubmit={handleSubmit} className="d-flex mt-5">
        <input
          onChange={(e) => handleInputChange(e)}
          className="create form-control"
          type="text"
          value={todo.description}
          name="description"
        />
        <button type="submit" className="btn btn-success">
          Agregar
        </button>
      </form>
      {allTodos &&
        allTodos.map((el) => {
          let id = el.todo_id;
          return (
            <div key={id} className="card">
              <div className="card-body d-flex justify-content-between">
                {el.description}
                <div className="botones">
                  <button
                    onClick={() => deleteTodo(id)}
                    className="btn btn-danger"
                  >
                    <svg
                      width="1em"
                      height="1em"
                      viewBox="0 0 16 16"
                      className="bi bi-trash-fill"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7z"
                      />
                    </svg>
                  </button>
                  <button
                    className="btn btn-secondary"
                    data-toggle="modal"
                    data-target="#exampleModal"
                    data-whatever="@mdo"
                    type="button"
                    onClick={() => handleEdit(el)}
                  >
                    <svg
                      width="1em"
                      height="1em"
                      viewBox="0 0 16 16"
                      className="bi bi-pencil-square"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                      <path
                        fillRule="evenodd"
                        d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                      />
                    </svg>
                  </button>
                  {/* MODAL EDITAR */}
                  {editTodo && (
                    <div
                      className="modal fade"
                      id="exampleModal"
                      tabIndex="-1"
                      aria-labelledby="exampleModalLabel"
                      aria-hidden="true"
                    >
                      <div className="modal-dialog">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">
                              Editar tarea
                            </h5>
                            <button
                              type="button"
                              className="close"
                              data-dismiss="modal"
                              aria-label="Close"
                            >
                              <span aria-hidden="true">&times;</span>
                            </button>
                          </div>
                          <div className="modal-body">
                            <form>
                              <div className="form-group">
                                <label
                                  htmlFor="message-text"
                                  className="col-form-label"
                                >
                                  Descripcion:
                                </label>
                                <textarea
                                  className="form-control"
                                  id="message-text"
                                  value={editTodo.description}
                                  name="description"
                                  onChange={handleEditInputChange}
                                ></textarea>
                              </div>
                            </form>
                          </div>
                          <div className="modal-footer">
                            <button
                              type="button"
                              className="btn btn-danger"
                              data-dismiss="modal"
                            >
                              Volver
                            </button>
                            <button
                              onClick={(e) => modifyTodo(e, editTodo.todo_id)}
                              type="button"
                              className="btn btn-info"
                            >
                              Guardar cambios
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
    </Fragment>
  );
}
