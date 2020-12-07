import React, { useState } from "react";
import cComponent from "./css/formCategory.module.css";
import { Link } from "react-router-dom";
import axios from "axios";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

export default function FormCategory() {
  const [input, setInput] = useState({
    name: "",
  });

  const handleInputChange = function (e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = function (e) {
    e.preventDefault();
    axios
      .post("/categories", {
        name: `${input.name}`,
      })
      .then((data) => {
        return data;
      });
    return (window.location = "/admin");
  };

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
          <h3>Añadir Categoria</h3>
        </div>
        <form className={cComponent.form} onSubmit={handleSubmit}>
          <div className={cComponent.name}>
            <label htmlFor="name">Nombre de categoria: </label>
            <input
              placeholder="Nombre"
              name="name"
              value={input.name}
              type="text"
              onChange={handleInputChange}
            />
          </div>
          <button type="submit" className={cComponent.botonAdd}>
            Añadir a Categorias
          </button>
        </form>
      </div>
    </div>
  );
}
