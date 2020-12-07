import React, { useState, useEffect } from "react";
import cComponent from "./css/editProduct.module.css";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { editProduct } from "../Redux/Products/Actions/productActions";
import { listCategory } from "../Redux/Categories/Actions/categoryActions";
import FileUpload from "../components/utils/FileUpload";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Select from "react-select";

// Formulario del producto

export default function EditProduct(props) {
  // Estados locales
  const categoryList = useSelector((state) => state.categoryList);
  const { categories, loadingCat, errorCat } = categoryList;
  const dispatch = useDispatch();

  const [productInput, setProductInput] = useState({
    item_id: "",
    name: "",
    category_id: "",
    description: "",
    stock: "",
    price: "",
    img: "",
  });

  // Eventos que se realizan

  const handleProductInputChange = function (e) {
    var Product = e.target.value;
    setProductInput({
      ...productInput,
      [e.target.name]: Product,
    });
  };

  const handleCategoryInputChange = function (e) {
    setProductInput({
      ...productInput,
      category_id: e.value,
    });
  };

  const handleSubmit = function (e) {
    e.preventDefault();
    dispatch(editProduct(productInput));
  };

  // const UpdateImages = (newImages) => {
  //   setProductInput({
  //     ...productInput,
  //     img: newImages,
  //   });
  // };

  // Peticion de producto y categoria
  useEffect(() => {
    dispatch(listCategory());
    setProductInput(props.producto.location.state);
  }, [dispatch, props.producto.location.state]);

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
          <h3>Modificar Producto</h3>
          {/* <FileUpload refreshFunction={UpdateImages} /> */}
          <input placeholder='Url de la Imagen' value={productInput.img} onChange={handleProductInputChange} type="text" name="img" id="img"/>
        </div>
        <form className={cComponent.form} onSubmit={handleSubmit}>
          <div className={cComponent.name}>
            <label htmlFor="name">Nombre de producto: </label>
            <input
              placeholder="Nombre"
              name="name"
              value={productInput.name}
              type="text"
              onChange={handleProductInputChange}
            />
          </div>
          <div className={cComponent.categories}>
            <span>Categoria: </span>
            {loadingCat ? (
              <div className="alert alert-success">Cargando...</div>
            ) : errorCat ? (
              <div className="alert alert-danger">
                Se produjo un error, por favor inténtelo de nuevo más tarde.
              </div>
            ) : categories.length > 0 ? (
              <Select
                defaultValue={{
                  label: categories && categories.filter((cat) => cat.category_id === productInput.category_id)[0]?.name,
                  value: productInput.category_id,
                }}
                onChange={handleCategoryInputChange}
                options={categories.map((opt) => ({
                  label: opt.name,
                  value: opt.category_id,
                }))}
              />
            ) : (
              <Select
                placeholder="Selecciona"
                onChange={handleCategoryInputChange}
                options={[
                  {
                    label:
                      "Oops! Parece que no hay categorías, intenta creando una.",
                    value:
                      "Oops! Parece que no hay categorías, intenta creando una.",
                  },
                ]}
              />
            )}
          </div>

          <button className={cComponent.botonAdd} type="submit">
            Editar producto
          </button>
          <div className={cComponent.description}>
            <span>Descripcion: </span>
            <textarea
              placeholder="Ingrese descripcion"
              rows="2"
              name="description"
              value={productInput.description}
              onChange={handleProductInputChange}
              id="Description"
            ></textarea>
          </div>
          <div className={cComponent.price}>
            <span>Precio: </span>
            <input
              placeholder="Diga un precio"
              name="price"
              value={productInput.price}
              type="real"
              onChange={handleProductInputChange}
              id="price"
            />
          </div>
          <div className={cComponent.stock}>
            <span>Cantidad: </span>
            <input
              placeholder="Especifique stock"
              name="stock"
              value={productInput.stock}
              type="number"
              onChange={handleProductInputChange}
              id="stock"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
