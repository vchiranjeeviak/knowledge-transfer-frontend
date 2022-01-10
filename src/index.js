import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import Home from './components/UI/Home';
import Signup from './components/logical/Signup';
import Signin from './components/logical/Signin';
import Signout from './components/logical/Signout';
import Profile from './components/logical/Profile';
import Cart from './components/logical/Cart'
import Sellbooks from './components/logical/Sellbooks';
import Addedbooks from './components/logical/Addedbooks';
import Buybooks from './components/logical/Buybooks';

const routing = (<BrowserRouter>
  <Routes>
    <Route path='/' exact element={<Home />}></Route>
    <Route path='/signup' element={<Signup />}></Route>
    <Route path='/signin' element={<Signin />}></Route>
    <Route path='/signout' element={<Signout />}></Route>
    <Route path='/profile' element={<Profile />}></Route>
    <Route path='/cart' element={<Cart />}></Route>
    <Route path='/sellbooks' element={<Sellbooks />}></Route>
    <Route path='/addedbooks' element={<Addedbooks />}></Route>
    <Route path='/buybooks' element={<Buybooks />}></Route>
  </Routes>
</BrowserRouter>);

ReactDOM.render(
  routing,
  document.getElementById('root')
);
