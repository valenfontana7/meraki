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
import ProductCategory from "./container/productCategory.jsx";
import EditCategory from "./container/EditCategory.jsx";
import Login from "./container/loginCont.jsx";
import Navbar from "./components/navBar.jsx";
import store from "./Redux/Store/store.js";
import { Provider } from "react-redux";

export default function App() {
  localStorage.setItem('user', { rol: 'admin'});
  return (
    <Provider store={store}>
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
              JSON.parse(localStorage.getItem("user")) &&
              JSON.parse(localStorage.getItem("user")).rol === "admin" ? (
                <AdminPanel />
              ) : (
                (window.location = "/")
              )
            }
          />
          <Route
            path="/admin/products/add"
            exact={true}
            render={() =>
              JSON.parse(localStorage.getItem("user")) &&
              JSON.parse(localStorage.getItem("user")).rol === "admin" ? (
                <FormProduct />
              ) : (
                (window.location = "/")
              )
            }
          />
          <Route
            path="/admin/categories/add"
            exact={true}
            render={() =>
              JSON.parse(localStorage.getItem("user")) &&
              JSON.parse(localStorage.getItem("user")).rol === "admin" ? (
                <FormCategory />
              ) : (
                (window.location = "/")
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
              return JSON.parse(localStorage.getItem("user")) &&
                JSON.parse(localStorage.getItem("user")).rol === "admin" ? (
                <EditProduct producto={p} />
              ) : (
                (window.location = "/")
              );
            }}
          />
          <Route
            path="/admin/categories/edit/:id"
            exact={true}
            render={(p) => {
              return JSON.parse(localStorage.getItem("user")) &&
                JSON.parse(localStorage.getItem("user")).rol === "admin" ? (
                <EditCategory category={p} />
              ) : (
                (window.location = "/")
              );
            }}
          />
          <Route
            path="/products/categoria/:nombreCat"
            exact={true}
            render={(c) => {
              return <ProductCategory nombrecat={c.match.params.nombreCat} />;
            }}
          />
          <Route
            path="/users/login"
            exact={true}
            render={(u) => {
              return <Login u={u} />
            }}
          />
        </div>
      </main>
    </BrowserRouter>
    </Provider>
  );
}
