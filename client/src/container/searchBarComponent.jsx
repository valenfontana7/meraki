import React, { useState } from "react";
import sBar from "./css/searchBarComponent.module.css";
import SearchIcon from "@material-ui/icons/Search";
import { listProduct } from "../Redux/Products/Actions/productActions";
import { useDispatch } from "react-redux";

export default function SearchBarComponent() {
  const dispatch = useDispatch();
  const [estado, setEstado] = useState({
    search: "",
  });

  const handleInputChange = (e) => {
    e.preventDefault();
    setEstado({ ...estado, search: e.target.value });
    dispatch(listProduct(estado.search));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(listProduct());
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className={sBar.bar}>
          <button className={sBar.boton} type="submit">
            <SearchIcon className={sBar.btnImage} />
          </button>
          <input
            className={sBar.search}
            type="text"
            placeholder="Buscar producto..."
            value={estado.search}
            onChange={handleInputChange}
          ></input>
        </div>
      </form>
    </div>
  );
}
