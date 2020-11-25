const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const path = require("path")
const PORT =  process.env.PORT || 3002

// Middleware

app.use(cors());
app.use(express.json());


if (process.env.NODE_ENV === "production") {
  console.log("en produccion")
  app.use(express.static(path.join(__dirname, "client/dist")));
}

// Routes

// TAREAS

// Crear una tarea
app.post("/todos", async (req, res) => {
  try {
    const { description } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todo (description) VALUES($1) RETURNING * ",
      [description]
    );
    res.json(newTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// Obtener todas las tareas
app.get("/todos", async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT * FROM todo");
    res.json(allTodos.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// Obtener una tarea específica
app.get("/todo/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [
      id,
    ]);
    res.json(todo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// Actualizar una tarea
app.put("/todo/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const updateTodo = await pool.query(
      "UPDATE todo SET description = $1 WHERE todo_id = $2",
      [description, id]
    );
    res.json("La tarea fue modificada");
  } catch (err) {
    console.error(err.message);
  }
});

// Eliminar una tarea
app.delete("/todo/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [
      id,
    ]);
    res.json("La tarea fue eliminada");
  } catch (err) {
    console.error(err.message);
  }
});

// ITEMS

// Obtener todos los items

app.get("/items", async (req, res) => {
  try {
    const allItems = await pool.query("SELECT * FROM item");
    res.json(allItems.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// Obtener un item por ID

app.get("/item/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const item = await pool.query("SELECT * FROM item WHERE item_id = $1", [
      id,
    ]);
    res.json(item.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// Crear un item

app.post("/items", async (req, res) => {
  try {
    const { description, category_id, name, price, stock, img } = req.body;
    const newItem = await pool.query(
      "INSERT INTO item (description, category_id, name, price, stock, img) VALUES($1, $2, $3, $4, $5, $6) RETURNING * ",
      [description, category_id, name, price, stock, img]
    );
    res.json(newItem.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// Modificar un item

app.put("/item/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description, category_id, name, price, stock, img } = req.body;
    const updateItem = await pool.query(
      "UPDATE todo SET (description, category_id, name, price, stock, img) VALUES($1, $2, $3, $4, $5, $6) WHERE todo_id = $7 RETURNING *",
      [description, category_id, name, price, stock, img, id]
    );
    res.json("El item fue modificado");
  } catch (err) {
    console.error(err.message);
  }
});

// Eliminar un item

app.delete("/item/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteItem = await pool.query("DELETE FROM todo WHERE todo_id = $1 RETURNING *", [
      id,
    ]);
    res.json("El item fue eliminado");
  } catch (err) {
    console.error(err.message);
  }
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/dist/index.html"))
})

// Inicializacion
app.listen(PORT, () => {
  console.log(`El servidor se encuentra corriendo en el puerto ${PORT}`);
});
