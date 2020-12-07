import React from "react";
import pCard from "./css/productCard.module.css";
import { Link } from "react-router-dom";
var placeholder = "/imagenes/Placeholder.png";
function ProductCard(props) {
  return (
    <Link
      to={{
        pathname: "/product/" + props.producto.item_id,
        state: props.producto,
      }}
      style={{textDecoration: 'none'}}
    >
      <div className={pCard.card}>
        <div className={pCard.image}>
          {props.producto.img ? (
            <img
              //src={`/imagenes/uploads/${props.producto.img}`}
              src={props.producto.img}
              alt=""
              lazyload="true"
            ></img>
          ) : (
            <img src={`${placeholder}`} alt="productCardImage"></img>
          )}
        </div>
        <div className={pCard.productData}>
          <span className={pCard.name}>{props.producto.name.length > 25 ? (props.producto.name.substring(0,25) + " ...") : props.producto.name}</span>
          <span className={pCard.price}> $ {props.producto.price}</span>
          <div>
          {props.producto.stock !== 0 ? (
            <span className={pCard.carrito}>
                  <img
                    src={`imagenes/carrito-de-compras.png`}
                    alt="carrito"
                  />
            </span>
          ) : (
            <div className={`alert-danger ${pCard.nostock}`}> Sin Stock!</div>
          )}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;
