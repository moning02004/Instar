import React from 'react';
import './App.css';
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
import PostList from './components/user/PostList';


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
          <Route path="/explorer" render={() => <PostList />}></Route>
          <Route path="/login" render={() => <Login onLogin={login}/>}></Route>
          <Route path="/register" component={Register}></Route>
          <Route path="/user" component={UserRouter}></Route>
          <Route path="/post" component={PostRouter}></Route>
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;