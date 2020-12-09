import React, { useEffect, useState } from "react";
import { detailsProduct } from "../Redux/Products/Actions/productActions";
import cComponent from "./css/productComponent.module.css";
import { useSelector, useDispatch } from "react-redux";
import { setComment, fetchComments, deleteComment } from '../Redux/Review/Actions/reviewAction';
import axios from 'axios';
import DeleteIcon from '@material-ui/icons/Delete';
var placeholder = "/imagenes/Placeholder.png";

function ProductComponent(props) {
  const [comentario, setearComentario] = useState({
    person: '',
    title: '',
    description: '',
    id_item: props.producto.match.params.id
  })
  const [msg, setMsg] = useState([]);
  const [error, setError] = useState([]);
  const productDetails = useSelector((state) => state.productDetails);
  const { productDet, loadingDet, errorDet } = productDetails;
  const commentList = useSelector((state) => state.commentList);
  const { comments, loadingCom } = commentList;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(detailsProduct(props.producto.match.params.id));
  }, [dispatch, props.producto.match.params.id]);

  const showComments = (e) => {
    e.preventDefault();
    dispatch(fetchComments(props.producto.match.params.id));
    if(document.getElementById('comments').classList.contains('hidden')){
      document.getElementById('comments').classList.remove('hidden');
    } else {
      document.getElementById('comments').classList.add('hidden');
    }
  }

  const handleInputChange = (e) => {
    setearComentario({
      ...comentario,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
  if(comentario.title.length < 3) {
    setMsg([]);
    setError([...error, "El título debe tener al menos 3 caracteres"]);
    return;
  } if(Number(comentario.title)){
    setMsg([]);
    setError([...error, "El titulo no puede expresarse en números"]);
    return;
  } if(comentario.title.length > 30) {
    setMsg([]);
    setError([...error, "El titulo del comentario no puede tener más de 30 caracteres"]);
    return;
  } if(comentario.description.length < 10) {
    setMsg([]);
    setError([...error, "El comentario debe tener al menos 10 caracteres"]);
    return;
  } if(Number(comentario.description)){
    setMsg([]);
    setError([...error, "El comentario no puede expresarse en números"]);
    return;
  } if(comentario.description.length > 255) {
    setMsg([]);
    setError([...error, "El comentario no puede tener más de 255 caracteres"]);
    return;
   } if(comentario.person.length > 20) {
    setMsg([]);
    setError([...error, "El nombre no puede exceder los 20 caracteres"]);
    return;
   }
      await axios
    .post(`/products/comments`, {
      title: `${comentario.title}`,
      description: `${comentario.description}`,
      id_item: `${comentario.id_item}`,
      person: `${comentario.person}`,
    })
    .then((data) => {
     dispatch(setComment(data.data.rows[0]));
    });
    setError([]);
    setMsg([...msg, "El comentario fue creado con éxito"]);
  }

  const handleCommentDelete = (e, id) => {
  e.preventDefault();
  if(window.confirm("Estas seguro/a de borrar este comentario?")) {
    dispatch(deleteComment(id));
    setMsg([msg, "El comentario se ha eliminado con éxito!"]);
  }
  }

  return (
    <div className={`${cComponent.master}`} style={{paddingTop: '65px'}}>
      <div className={cComponent.cards}>
        {loadingDet ? (
          <div className="alert alert-success">Cargando...</div>
        ) : errorDet ? (
          <div>{errorDet}</div>
        ) : (
          <div className={`${cComponent.carritoPage}`}>
            <div className={`${cComponent.cards}`}>
              <div className={cComponent.stcolumn}>
              {productDet.img ? (
            <img
              //src={`/imagenes/uploads/${productDet.img}`}
              className={cComponent.cardImage}
              src={productDet.img}
              alt="productCompImage"
              lazyload="true"
            ></img>
          ) : (
            <img className={cComponent.cardImage} src={`${placeholder}`} alt="productCompImage"></img>
          )}
                <div className={`${cComponent.cardDet}`}>
                  {productDet.name}
                  <h4 className={cComponent.cardCat}>{productDet.category}</h4>
                  <div className={cComponent.cardDesc}>
                    <p>
                      <i className={cComponent.cardDesc}>
                        {productDet.description}
                      </i>
                    </p>
                  </div>
                  
                </div>
              </div>
              <div className={cComponent.ndcolumn}>
                <div className={`${cComponent.cardPrice}`}>
                  <h5>Precio</h5>
                  <span>$ {productDet.price}</span>
                </div>
                {productDet.stock > 0 && (
                  <a target='_blank' rel="noreferrer" href='https://wa.link/u096wf'>
                  <button
                    className={` ${cComponent.addcart}`}
                  >
                    Comprar
                  </button>
                  </a>
                )}
                {productDet.stock > 0 && (
                    <div className={`${cComponent.qty}`}>
                      <label htmlFor="stock">Stock: </label>
                  <h5>{productDet.stock}</h5>
                    </div>
                  )}
                      <button onClick={showComments} className={cComponent.addreview}>
                        Ver comentarios
                      </button>
              </div>
            </div>
          </div>
        )}
        
      </div>
      <div id='comments' className={`container hidden ${cComponent.comments}`}>
        {msg !== [] && msg.map((msg, i) => (<div key={i} className="alert alert-success alert-dismissible fade show" role="alert">
            {msg}
        <button type="button" className="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
        </div>))} 
            {error !== [] && error.map((error, i) => (<div key={i} className="alert alert-danger alert-dismissible fade show" role="alert">
            {error}
        <button type="button" className="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
        </div>))}
            <div className={`${cComponent.create}`}>
              <form onSubmit={handleSubmit}>
              <div className={cComponent.formContent}>
                <div className={cComponent.person}>
                <label htmlFor="person">Nombre</label>
                <input value={comentario.person} onChange={handleInputChange} placeholder='(Opcional)' name='person' className={cComponent.personInput} type="text"/>
                </div>
                <div className={cComponent.comment}>
                <label htmlFor="title">Titulo</label>
                <input value={comentario.title} onChange={handleInputChange} name='title' className={cComponent.titleInput} type="text"/>
              </div>
                <div className={cComponent.comment}>
                <label htmlFor="description">Comentario</label>
                <input value={comentario.description} onChange={handleInputChange} name='description' className={cComponent.commentInput} type="text"/>
              </div>
              <button type='submit' className='btn btn-secondary'>
                Enviar comentario
              </button>
                </div>
              </form>
            </div>
            <div className={`${cComponent.box}`}>
                {!loadingCom ? (comments && comments.length > 0 ? comments.map((comment) => (
                  <div key={comment.item_comment_id} className={cComponent.comentario}>
                  <div className={cComponent.cuerpoComentario}>
                <h4>
                  {comment.title}
                </h4>
                <p>
                  {comment.description}
                </p>
                </div>
                <div>
                  <h5>Autor: </h5>
                <span>{comment.person ? comment.person : "Anónimo"}</span>
                </div>
                {localStorage.getItem('N4jQctA') && (
                <button className='btn' onClick={(e) => handleCommentDelete(e, comment.item_comment_id)}>
                <DeleteIcon/>
                </button>
                )}
                </div>
                  )
                  ): (<div className={cComponent.comentario}>
                    <div className={cComponent.cuerpoComentario}>
                    <h5>No hay comentarios acerca de este producto aún, sé el primero. </h5>
                  </div>
                  </div>)) : (<div className='alert alert-success'>Cargando...</div>)}
            </div>
        </div>
    </div>
  );
}

export default ProductComponent;
