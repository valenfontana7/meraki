import React, { useEffect } from "react";
import sBar from "./css/sideBarComponent.module.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listCategory } from "../Redux/Categories/Actions/categoryActions";
import { listByCategory, listProduct } from "../Redux/Products/Actions/productActions";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import axios from "axios";

function SideBarComponent(props) {
  const dispatch = useDispatch();
  const categoryList = useSelector((state) => state.categoryList);
  const { categories, loadingCat, errorCat } = categoryList;

  useEffect(() => {
    dispatch(listCategory());
  }, [dispatch]);

  function logOut () {
    return localStorage.removeItem('N4jQctA');
  }

  const catSearch = (e, id) => {
    e.preventDefault();
    if(id){
      dispatch(listByCategory(id));
    } else {
      dispatch(listProduct());
    }
    
  }

  return (
    <div>
      <div>
        
        <button className={sBar.closeButton} onClick={props.onclose}>
          x
        </button>

        <div className={`${sBar.admin}`}>
              <Link to="/admin">
                <button onClick={props.onclose} className={` ${sBar.boton} `}>
                  <SupervisorAccountIcon className={sBar.imgBotones} />
                </button>
              </Link>
              {localStorage.getItem('N4jQctA') && (<button onClick={()=> {
            logOut();
            window.location = '/'
          }} className={`${sBar.boton}`}>
            <ExitToAppIcon className={sBar.imgBotones} />
          </button>)}
        </div>
        <div className="dropdown">
          <button
            className={`${sBar.filtro} dropdown-toggle`}
            type="button"
            id="dropdownMenuButton"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Filtrar por categoria:
          </button>

          <div
            className="dropdown-menu scrollable-menu"
            aria-labelledby="dropdownMenuButton"
          >
            {loadingCat ? (
              <div className="alert alert-success">Cargando...</div>
            ) : errorCat ? (
              <div className="alert alert-danger">
                Se produjo un error, por favor inténtelo de nuevo más tarde.
              </div>
            ) : (
              categories.length > 0 && (
                <div>
              <button onClick={(e) => catSearch(e)} className={` dropdown-item`}>
              <p className={sBar.botoncat}>Todos</p>
            </button>
            {categories.map((cat) => (
                <div key={cat.category_id}>
                    <button onClick={(e) => catSearch(e,cat.category_id)} className={` dropdown-item`}>
                      <p className={sBar.botoncat}>{cat.name}</p>
                    </button>
                </div>
              ))}
            </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SideBarComponent;
