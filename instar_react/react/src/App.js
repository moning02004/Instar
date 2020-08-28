import React, { useEffect } from 'react';
import Header from './components/Header';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import NotFound from './pages/main/NotFound';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import UserRouter from './router/UserRouter';
import { PostRouter } from './router/PostRouter';
import './pages/post/Post.css'
import './pages/post/modal.css'
import './pages/user/User.css'
import AuthService from './services/AuthService';
import { DashBoard } from './pages/main/DashBoard';
import PostList from './pages/post/PostList';

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
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/explorer" render={() => <PostList type="explorer" />} />
          <Route path="/heart" render={() => <PostList type="heart" />} />
          <Route path="/user" component={UserRouter} />
          <Route path="/post" component={PostRouter} />
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>


    </div>
  );
}

export default App;