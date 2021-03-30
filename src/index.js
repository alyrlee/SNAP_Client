import React from "react";
import ReactDOM from "react-dom";
import './index.css';
import App from "./App/App";
import { BrowserRouter, Router} from "react-router-dom";
import history from "./Contexts/history";

ReactDOM.render(
  <BrowserRouter>
    <Router history={history}>
            <App />
    </Router>
  </BrowserRouter>,
  document.getElementById("root")
);

