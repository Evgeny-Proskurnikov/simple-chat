import React, { useState } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
import Login from '../Login/Login';
import Chat from '../Chat/Chat';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

function App() {
  const history = useHistory();

  const [loggedIn, setLoggedIn] = useState(false);
  const [loginData, setLoginData] = useState({});
  // const [formLoadingState, setFormLoadingState] = useState(false);
  console.log(loggedIn)

  function onLogin(data) {
    console.log(data)
    setLoginData(data);
    setLoggedIn(true);
    history.push('/chat');
  }

  function onLeave() {
    setLoggedIn(false);
  }

  return (
    <Switch>
      <Route path='/' exact>
        <Login onLogin={onLogin} />
      </Route>
      <ProtectedRoute
        path='/chat'
        component={Chat}
        loggedIn={loggedIn}
        loginData={loginData}
        onLeave={onLeave}
      />
    </Switch>
  );
}

export default App;
