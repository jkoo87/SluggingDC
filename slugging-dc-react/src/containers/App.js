import React, { Component } from 'react';
import '../css/App.css';
import { About, Home, StationContainer, ContactUs } from './'
import { Station } from '../components'
// import axios from 'axios'
import {
  BrowserRouter as Router,
  Route,
  Link
} from "react-router-dom"

class App extends Component {
  render() {
    return (
      <Router>
        <div>

        <nav>
          <div className="navContainer">
            <Link to="/">Slugging DC</Link>
            <Link to="/about">About</Link>
            <Link to="/stations">Stations</Link>
            <Link to="/contact-us">Contact Us</Link>
          </div>
        </nav>

          <main>
            <Route exact path="/" component={Home} />
            <Route exact path="/about" component={About} />
            <Route exact path="/stations" component={StationContainer} />
            <Route exact path="/contact-us" component={ContactUs} />
          </main>

        </div>
      </Router>
    );
  }
}

export default App;
