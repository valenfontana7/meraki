import React, { useState, useEffect } from "react";
import cComponent from "./css/formproducto.module.css";
import { Link } from "react-router-dom";
import axios from "axios";
import FileUpload from "../components/utils/FileUpload";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Select from "react-select";

export default function FormProducto() {
  const [input, setInput] = useState({
    name: "",
    category_id: "",
    description: "",
    price: "",
    stock: "",
    img: "",
  });

  // const [image, setImage] = useState({
  //   img: "",
  // });

  const [categories, setCategories] = useState([]);

  const handleInputChange = function (e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleCategoryInputChange = function (e) {
    setInput({
      ...input,
      category_id: categories.filter((cat)=> {
        return cat.name === e.value
      })[0].category_id,
    });
  };

  const handleSubmit = function (e) {
    e.preventDefault();
    console.log(input.category_id)
    axios
      .post("/items", {
        name: `${input.name}`,
        description: `${input.description}`,
        category_id: `${input.category_id}`,
        price: `${input.price}`,
        img: `${input.img}`,//`${image.img}` ,
        stock: `${input.stock}`,
      })
      .then((data) => {
        return data;
      });
    return (window.location = "/admin");
  };

  useEffect(() => {
    axios.get("/categories/").then((response) => {
      setCategories(response.data);
    });
  }, []);

  // const UpdateImages = (newImages) => {
  //   setImage({ img: newImages });
  // };

  return (
    <div className={cComponent.formPage}>
      <div className={cComponent.container}>
        <div className={cComponent.options}>
          <Link to="/admin">
            <button className={cComponent.botonBack}>
              <ArrowBackIcon />
            </button>
          </Link>
        </div>
        <div className={cComponent.upload}>
          <h3>Añadir Producto</h3>
           {/* <FileUpload refreshFunction={UpdateImages} />  */}
           <input placeholder='Url de la Imagen' value={input.img} onChange={handleInputChange} type="text" name="img" id="img"/>
        </div>
        <form className={cComponent.form} onSubmit={handleSubmit}>
          <div className={cComponent.name}>
            <label htmlFor="name">Nombre de producto: </label>
            <input
              placeholder="Nombre"
              name="name"
              value={input.name}
              type="text"
              onChange={handleInputChange}
            />
          </div>
          <div className={cComponent.categories}>
            <span>Categoria: </span>
            <Select
              placeholder="Elija categoría"
              onChange={handleCategoryInputChange}
              options={categories.map((opt) => ({
                label: opt.name,
                value: opt.name,
              }))}
            />
          </div>
          <button className={cComponent.botonAdd} type="submit">
            Añadir a Productos
          </button>
          <div className={cComponent.description}>
            <span>Descripcion: </span>
            <textarea
              placeholder="Ingrese descripcion"
              rows="2"
              name="description"
              value={input.description}
              onChange={handleInputChange}
              id="Description"
            ></textarea>
          </div>
          <div className={cComponent.price}>
            <span>Precio: </span>
            <input
              placeholder="Diga un precio"
              name="price"
              value={input.price}
              type="real"
              onChange={handleInputChange}
              id="price"
            />
          </div>
          <div className={cComponent.stock}>
            <span>Cantidad: </span>
            <input
              placeholder="Especifique stock"
              name="stock"
              value={input.stock}
              type="number"
              onChange={handleInputChange}
              id="stock"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
