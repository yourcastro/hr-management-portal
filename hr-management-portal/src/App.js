import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faCoffee } from '@fortawesome/free-solid-svg-icons'

import './App.css';
import UploadUser from './uploadUser';
import EmployeeDashboard from './employeeDashboard';
import EmployeeCRUD from './employeeCRUD';
import EmployeeAbout from './employeeAbout';

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
        <li><a className="active" href="/">HR Management Portal</a></li>
        <li className="floatRight"><a href="/upload">Upload Users</a></li>
        <li className="floatRight"><a href="/dashboard">Employee Dashboard</a></li>
      </ul>

      <div class="mobile-container">
        <div class="topnav">
          <a href="/" class="active">HR Management Portal</a>
          <div id="myLinks">
            <a href="/upload">Upload Users</a>
            <a href="/dashboard">Employee Dashboard</a>
          </div>
          <a href="#" class="icon" onClick={myFunction}>
             <FontAwesomeIcon icon={faBars} />
          </a>
        </div>
      </div>

      <BrowserRouter>
        <Switch>
          <Route path="/upload">
            <UploadUser />
          </Route>
          <Route path="/dashboard">
            <EmployeeDashboard />
          </Route>
          <Route path="/crud">
            <EmployeeCRUD />
          </Route>
          <Route path="/">
            <EmployeeAbout />
          </Route>
        </Switch>
      </BrowserRouter>

    </div>
  );
}

export default App;
