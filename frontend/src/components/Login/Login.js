import React from 'react';
import LoginForm from '../LoginForm/LoginForm';

function Login({ onLogin }) {
  return (
    <div className="login">
      <h1 className="login__header">Login</h1>
      <LoginForm onLogin={onLogin} />
    </div>
  );
}

export default Login;
