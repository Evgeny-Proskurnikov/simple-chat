import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from '../Login/Login';
import Chat from '../Chat/Chat';

function App() {
  // const [loggedIn, setLoggedIn] = React.useState(false);

  return (
    <Switch>
      <Route path='/' exact component={Login}/>
      <Route path='/chat' component={Chat}/>
    </Switch>
  );
}

export default App;
