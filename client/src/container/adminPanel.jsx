import React from "react";
import AddProduct from "./adminAddProduct.jsx";
import AddCategory from "./adminAddCategory.jsx";
import aPanel from "./css/adminPanel.module.css";
import { Link } from "react-router-dom";

class AdminPanel extends React.Component {
  render() {
    return (
      <div className={`${aPanel.centrar}`}>
        <div className={`container`}>
          <AddCategory />
          <AddProduct />
        </div>
      </div>
    );
  }
}

export default AdminPanel;
