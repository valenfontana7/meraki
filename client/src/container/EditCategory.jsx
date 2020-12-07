import React, { useState, useEffect } from "react";
import cComponent from "./css/EditCategory.module.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { editCategory } from "../Redux/Categories/Actions/categoryActions";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
// Formulario del producto

export default function EditCategory(props) {
  // Estados locales
  const dispatch = useDispatch();

  const [categoryInput, setCategoryInput] = useState({
    name: "",
  });

  // Eventos que se realizan
  const category = props.category.location.state;
  const handleCategoryInputChange = function (e) {
    setCategoryInput({
      name: e.target.value,
    });
  };

  const handleSubmit = function (e) {
    e.preventDefault();
    dispatch(editCategory(categoryInput.name, category.category_id));
  };

  // Peticion de categoria

  useEffect(() => {
    setCategoryInput({
      name: category.name,
    });
  }, [category.name]);

  // Todo lo que voy a renderizar en la pagina
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
          <h3>Editar Categoria</h3>
        </div>
        <form className={cComponent.form} onSubmit={handleSubmit}>
          <div className={cComponent.name}>
            <label htmlFor="name">Nombre de categoria: </label>
            <input
              placeholder="Nombre"
              name="name"
              value={categoryInput.name}
              type="text"
              onChange={handleCategoryInputChange}
            />
          </div>
          <button type="submit" className={cComponent.botonAdd}>
            Guardar cambios
          </button>
        </form>
      </div>
    </div>
  );
}
