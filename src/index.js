// import React from "react";
// import ReactDOM from "react-dom";
// // import './index.css';
// import App from "./App/App";
// import "./App/App.css";
// import { BrowserRouter, Router, Link, Route, Switch } from "react-router-dom";
// import Header from "./Components/Headers/Header";
// import "./Components/Headers/Header.css";
// import history from "./Contexts/history";

// ReactDOM.render(
//   <BrowserRouter>
//     <Router history={history}>
//       <Link>
//         <Header />
//         <Switch>
//           <Route>
//             <App />
//           </Route>
//         </Switch>
//       </Link>
//     </Router>
//   </BrowserRouter>,
//   document.getElementById("root")
// );

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App/App';
import {BrowserRouter} from 'react-router-dom';

ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
    , document.getElementById('root'));
