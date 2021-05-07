import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Navbar from './Navbar/Navbar.js'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import Home from './Home/Home';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Navbar />

      <div id="contentPane">
        <Switch>
          <Route path="/projects">
            <div>
              <h1>Projects</h1>
            </div>
          </Route>

          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>

  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
