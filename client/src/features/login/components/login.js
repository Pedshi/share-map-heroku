import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, authReducerName } from '../';
import { Redirect } from 'react-router-dom';
import { renderStatusEffect } from '../../../common';
import '../styles/_login.scss';

function Login() {

  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const { authenticated, status } = useSelector(state => state[authReducerName]);
  const dispatch = useDispatch();
  
  const onSubmitHandler = (event) => {
    event.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  return (
    <div className="login">
      <div className="login__first-col">
        <h1>Log in to your account</h1>
        <div className="login__form-container">
          <form onSubmit={onSubmitHandler}>
            <label htmlFor="email"> Email Address </label>
            <br/>
            <input type="email" 
              id="email"
              value={email}
              onChange={e => setEmail(e.target.value)} />
            <br/>
            <label htmlFor="password"> Password </label>
            <br/>
            <input type="password" 
              id="password"
              value={password}
              onChange={e => setPassword(e.target.value)}/>
            <br/>
            <div className="form-button-wrapper">
              <input type="submit" value="Login"/>
            </div>
          </form>
          {renderStatusEffect(status, 'User credentials wrong!')}
          {authenticated && (
            <Redirect to="/place/create"/>
          )}
        </div>
      </div>
      <div className="login__second-col"> </div>
    </div>
  );
}

export default Login;