import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App/App';
import {BrowserRouter, Route} from 'react-router-dom';
import Header from "./Components/Headers/Header";


ReactDOM.render(
  <BrowserRouter>
          <Route path="/" component={App}/>
          <Header />
    </BrowserRouter>,
  document.getElementById('root')
);
