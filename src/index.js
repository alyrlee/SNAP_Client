import React from "react";
import ReactDOM from "react-dom";
import './index.css';
import App from "./App/App";
import { BrowserRouter, Router} from "react-router-dom";
import Header from "./Components/Headers/Header";
import history from "./Contexts/history";

ReactDOM.render(
  <BrowserRouter>
    <Router history={history}>
        <Header />
            <App />
    </Router>
  </BrowserRouter>,
  document.getElementById("root")
);

// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App/App';
// import {BrowserRouter} from 'react-router-dom';

// ReactDOM.render(
//     <BrowserRouter>
//         <App />
//     </BrowserRouter>,
//  document.getElementById('root'));
