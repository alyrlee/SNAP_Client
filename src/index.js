import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App/App';
import {BrowserRouter, Route} from 'react-router-dom';
import NavBar from "./Components/Headers/Header";


ReactDOM.render(
  <BrowserRouter>
          <Route path="/" component={App}/>
          <NavBar />
    </BrowserRouter>,
  document.getElementById('root')
);
