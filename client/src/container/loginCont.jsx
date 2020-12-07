import React, { useState } from 'react';
import aLogin from './css/loginCont.module.css';
import axios from 'axios';

function LoginCont() {
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setPassword(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/auth', {password: password})
    .then((res)=> {
        if(res.data === "Autenticacion exitosa") {
            localStorage.setItem('N4jQctA', true);
            setError('');
            setMsg(res.data); 
            setTimeout(window.location = '/admin', 2500)
        }
        if(res.data === "Contraseña incorrecta") {
            setMsg('');
            setError(res.data);
        };
    })
}

    return (
        <div className={aLogin.page}>
        <div className={` ${aLogin.login}`}>
          <h1>Admin Panel</h1>
          {msg !== '' && (<div className='btn btn-success'>{msg}</div>)} 
            {error !== '' && (<div className='btn btn-danger'>{error}</div>)}
            <form onSubmit={handleSubmit}>
                <div className={`form-group ${aLogin.form}`}>
                    <label htmlFor="password">Contraseña</label>
                    <input onChange={handleInputChange} className='form-control col-md-8' name='password' type="password"/>
                    <button type='submit' className='btn btn-info mt-3'>Continuar</button>
                </div>
            </form> 
        </div>
        </div>
    )
}

export default LoginCont
