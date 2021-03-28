import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App/App';
import {BrowserRouter, Route} from 'react-router-dom';
import Header from "./Components/Headers/Header";
import "./Components/Headers/Header.css";



ReactDOM.render(
  <BrowserRouter>
          <Route path="/" component={App}/>
          <Header />
    </BrowserRouter>,
  document.getElementById('root')
);
