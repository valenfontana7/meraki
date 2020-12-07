import React from "react";
//import ListTodos from "./components/ListTodos";
import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";
import CatalogComponent from "./container/catalogComponent.jsx";
import FormProduct from "./container/formProducto.jsx";
import FormCategory from "./container/formCategory.jsx";
import ProductComponent from "./container/productComponent.jsx";
import HeaderInicio from "./components/headerInicio.jsx";
import AdminPanel from "./container/adminPanel.jsx";
import EditProduct from "./container/EditProduct.jsx";
import EditCategory from "./container/EditCategory.jsx";
import AdminLogin from "./container/loginCont.jsx";
import Navbar from "./components/navBar.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Route path="/" render={() => <HeaderInicio />} />
      <Route path="/" render={() => <Navbar />} />
      <main className="main">
        <div className="content">
          <Route path="/" exact={true} render={() => <CatalogComponent />} />
          <Route
            path="/admin"
            exact={true}
            render={() =>
              !localStorage.getItem("N4jQctA") ?
                <AdminLogin /> : <AdminPanel />
            }
          />
          <Route
            path="/admin/products/add"
            exact={true}
            render={() =>
              localStorage.getItem("N4jQctA") ? (
                <FormProduct />
              ) : (
                (window.location = "/admin")
              )
            }
          />
          <Route
            path="/admin/categories/add"
            exact={true}
            render={() =>
              localStorage.getItem("N4jQctA") ? (
                <FormCategory />
              ) : (
                (window.location = "/admin")
              )
            }
          />
          <Route
            path="/product/:id"
            exact={true}
            render={(p) => {
              return <ProductComponent producto={p} />;
            }}
          />
          <Route
            path="/admin/products/edit/:id"
            exact={true}
            render={(p) => {
              return localStorage.getItem("N4jQctA") ? (
                <EditProduct producto={p} />
              ) : (
                (window.location = "/admin")
              );
            }}
          />
          <Route
            path="/admin/categories/edit/:id"
            exact={true}
            render={(p) => {
              return localStorage.getItem("N4jQctA") ? (
                <EditCategory category={p} />
              ) : (
                (window.location = "/admin")
              );
            }}
          />
        </div>
      </main>
    </BrowserRouter>
  );
}