import React from "react";
import cComponent from "./css/catalogComponent.module.css";
import ProductCard from "../components/productCard";
import { useEffect } from "react";
import { listProduct } from "../Redux/Products/Actions/productActions";
import { useSelector, useDispatch } from "react-redux";

function CatalogComponent() {
  const productList = useSelector((state) => state.productList);
  const { products, loading, error } = productList;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listProduct());
  }, [dispatch]);
  return (
    <div className={cComponent.catalog}>
      {loading ? (
        <div className={`alert alert-success ${cComponent.alerta}`}>
          Cargando...
        </div>
      ) : error ? (
        <div className={`alert alert-danger ${cComponent.alerta}`}>
          Se produjo un error, por favor inténtelo de nuevo más tarde.
        </div>
      ) : products.length > 0 ? (
        products.map((product) => {
          return (
            <div key={product.item_id} className={cComponent.pCard}>
                <ProductCard producto={product} />
            </div>
          );
        })
      ) : (
        <div className={`alert alert-secondary ${cComponent.alerta}`}>
          Oops! Parece que no hay productos :(
        </div>
      )}
    </div>
  );
}
export default CatalogComponent;
