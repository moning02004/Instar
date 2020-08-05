import React from 'react';
import './App.css';
import Header from './components/Header';
import DashBoard from './pages/DashBoard';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import NotFound from './pages/NotFound';
import Login from './pages/user/Login';
import Register from './pages/user/Register';

function App() {
  let [user, setUser] = React.useState(sessionStorage.getItem('auth'))
  
  const login = (user) => {
    setUser(user)
    window.location.href = '/'
  }
  return (
    <div style={{marginTop: '3rem'}}>
      {(user) && <Header />}

      <BrowserRouter>
        {(user == null && window.location.pathname !== '/register') && <Redirect path="/login" to={{pathname: "/login"}} />}
        <Switch>
          <Route exact path="/" render={() => <DashBoard isLogin={user}/>}></Route>
          <Route path="/login" render={() => <Login onLogin={login}/>}></Route>
          <Route path="/register" component={Register}></Route>
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;