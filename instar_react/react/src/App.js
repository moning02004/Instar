import React, { useEffect } from 'react';
import Header from './components/Header';
import DashBoard from './pages/DashBoard';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import NotFound from './pages/NotFound';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import UserRouter from './router/UserRouter';
import { PostRouter } from './router/PostRouter';
import './pages/post/Post.css'
import './pages/user/User.css'
import PostList from './components/PostList';
import AuthService from './services/AuthService';

function App() {

  useEffect( () => {
    AuthService.checkToken();
}, [])


  return (
    <div style={{marginTop: '4rem'}}>
      {(AuthService.isAuthenticated()) && <Header />}
      
      <BrowserRouter>
        {(!AuthService.isAuthenticated() && window.location.pathname !== '/register') && <Redirect path="/login" to={{pathname: "/login"}} />}
        <Switch>
          <Route exact path="/" component={DashBoard} />
          <Route path="/explorer" render={() => <PostList type="explorer" />} />
          <Route path="/heart" render={() => <PostList type="heart" />} />
          
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/user" component={UserRouter} />
          <Route path="/post" component={PostRouter} />
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>


    </div>
  );
}

export default App;