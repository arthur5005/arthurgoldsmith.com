import React from 'react';
import './App.css';
import Home from './pages/home';
import SiteTerminal from './components/site-terminal';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

function App() {
  return (
    <Router>
      <div class="ag-site-container">
        <div class="ag-terminal-container">
          <SiteTerminal />
        </div>
        <div class="ag-content-container">
          <Switch>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
