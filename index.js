const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const path = require("path")
const multer = require("multer");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const morgan = require("morgan");

const PORT =  process.env.PORT || 3002

// Middleware

//app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  if ("OPTIONS" == req.method) {
    res.sendStatus(200);
  } else {
    next();
  }
});
app.use(express.json());
app.use("/imagenes", express.static("imagenes"));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(cookieParser("secretcode"));
app.use(morgan("dev"));

if (process.env.NODE_ENV === "production") {
  console.log("en produccion")
  app.use(express.static(path.join(__dirname, "client/build")));
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
    const allItems = await pool.query("SELECT * FROM item ORDER BY item_id");
    res.json(allItems.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// Obtener items por búsqueda

app.get("/search", async(req, res) => {
  try {
    const valor = req.query.query.toLowerCase();
    const items = await pool.query("SELECT * FROM item WHERE LOWER(name) LIKE '%' || $1 || '%' OR LOWER(description) LIKE '%' || $1 || '%' ORDER BY item_id", [valor]);
    res.send(items.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// Obtener items por categoría

app.get("/catfilter", async(req, res) => {
  try {
    const valor = req.query.query;
    const items = await pool.query("SELECT * FROM item WHERE category_id = $1 ORDER BY item_id", [valor]);
    res.send(items.rows);
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
      [description, Number(category_id) || null, name, price, stock, img]
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
    const { description, name, price, stock, img } = req.body;
    const category_id = Number(req.body.category_id) || null;
    const updateItem = await pool.query(
      "UPDATE item SET description = $1, category_id = $2, name = $3, price = $4, stock = $5, img = $6 WHERE item_id = $7",
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
    const deleteItem = await pool.query("DELETE FROM item WHERE item_id = $1", [
      id,
    ]);
    res.json('El producto fue eliminado con exito');
  } catch (err) {
    console.error(err.message);
  }
});

// Autenticacion

app.post("/auth", async(req, res) => {
  const pass = await pool.query("SELECT ps_code FROM password_admin WHERE ps_code = $1", [req.body.password]);
  if(pass.rows[0]){
    res.json("Autenticacion exitosa");
  } else {
    res.json("Contraseña incorrecta");
  }
})

// CATEGORIAS 

// Obtener categorias

app.get('/categories', async(req, res) => {
  try {
    const allCategories = await pool.query("SELECT * FROM category");
    res.json(allCategories.rows);
  } catch (err) {
    console.error(err.message);
  }
})

// Crear categorías

app.post('/categories', async(req, res) => {
    try {
      const { name} = req.body;
      const newCategory = await pool.query(
        "INSERT INTO category (name) VALUES($1) RETURNING * ",
        [name]
      );
      res.json(newCategory.rows[0]);
    } catch (err) {
      console.error(err.message);
    }
})

// Eliminar una categoria

app.delete("/category/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteCategory = await pool.query("DELETE FROM category WHERE category_id = $1", [
      id,
    ]);
    res.json('La categoria fue eliminada con exito');
  } catch (err) {
    console.error(err.message);
  }
});

// Editar una categoría

app.put("/category/:id", async(req,res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const updateCat = await pool.query("UPDATE category SET name = $1 WHERE category_id = $2", [name, id]);
    if(updateCat){
      res.send("La categoría fue actualizada con éxito");
    }
  } catch (err) {
    console.log(err.message);
  }
})

// COMMENTS

// Obtener todos los comentarios de un producto

app.get('/product/:id/comments', async(req,res) => {
  try {
    const pId = req.params.id;
    const productComments = await pool.query("SELECT * FROM item_comment WHERE id_item = $1", [pId]);
    res.send(productComments.rows);
  } catch (err) {
    console.error(err.message);
  }
})

// Crear un comentario

app.post('/products/comments', async(req, res) => {
  try {
    const {person, title, description, id_item} = req.body
    const newComment = await pool.query("INSERT INTO item_comment(person, title, description, id_item) VALUES($1, $2, $3, $4) RETURNING *", [
      person, title, description, id_item
    ]);
    res.send(newComment);
  } catch (err) {
    console.error(err.message);
  }
  
})

// Borrar un comentario

app.delete('/products/comment/:id', async(req, res) => {
  try {
    const { id } = req.params;
    const deleteComment = await pool.query("DELETE FROM item_comment WHERE item_comment_id = $1", [Number(id)]);
    res.send("El comentario fue eliminado con éxito");
  } catch (err) {
    console.error(err.message);
  }
})

// UPLOAD

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./client/public/imagenes/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext !== ".jpg" || ext !== ".png") {
      cb(res.status(400).end("only jpg, png are allowed"), false);
    }
    cb(null, true);
  },
});

var upload = multer({ storage: storage }).single("file");

app.post("/product/upload", (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      res.json({ success: false, err: err });
    } else {
      res.json({
        success: true,
        image: res.req.file.path,
        fileName: res.req.file.filename,
      });
    }
  });
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build/index.html"))
})

// Inicializacion
app.listen(PORT, () => {
  console.log(`El servidor se encuentra corriendo en el puerto ${PORT}`);
});
