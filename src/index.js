import React from 'react';
import ReactDOM from 'react-dom';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Navbar from './Navbar/Navbar.js'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import Projects from './view-projects/Projects';
import Websites from './view-websites/Websites';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Navbar />
      <div id="contentPane">
        <Switch>
          <Route path="/websites">
            <Websites />
          </Route>

          <Route path="/"> {/* Keep at bottom  */}
            <Projects />
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
// reportWebVitals();
