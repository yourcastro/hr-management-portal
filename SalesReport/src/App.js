import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './App.css';
import UploadUser from './uploadUser';

function App() {


  function myFunction() {
    var x = document.getElementById("myLinks");
    if (x.style.display === "block") {
      x.style.display = "none";
    } else {
      x.style.display = "block";
    }
  }

  return (
    <div className="App">
      <ul className="headerMenuContainer desktop-container">
        <li><a className="active" href="/">Sales Report</a></li>
      </ul>
         
      <BrowserRouter>
        <Switch>
          <Route path="/">
            <UploadUser />
          </Route>
        </Switch>
      </BrowserRouter>

    </div>
  );
}

export default App;
