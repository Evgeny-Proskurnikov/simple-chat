import React, { useState } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
import Login from '../Login/Login';
import Chat from '../Chat/Chat';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

function App() {
  const history = useHistory();

  const [loggedIn, setLoggedIn] = useState(false);
  const [loginData, setLoginData] = useState({});
  const [messages, setMessages] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [currentRoom, setCurrentRoom] = useState([]);

  function onLogin(data) {
    setLoginData(data);
    setLoggedIn(true);
    history.push('/chat');
  }

  function onLeave() {
    setLoggedIn(false);
    setMessages([]);
  }

  function onMsgRecieve(data) {
    setMessages(data);
  }

  function onUserRecieve(data) {
    setCurrentUser(data);
  }

  function onRoomDataRecieve(data) {
    setCurrentRoom(data);
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
        messages={messages}
        onMsgRecieve={onMsgRecieve}
        onUserRecieve={onUserRecieve}
        currentUser={currentUser}
        onRoomDataRecieve={onRoomDataRecieve}
        currentRoom={currentRoom}
      />
    </Switch>
  );
}

export default App;
