import React, { Component } from 'react';
import '../css/App.css';
import { About, Home, StationContainer, ContactUs } from './'
import { Header, Station} from '../components'
import {
  BrowserRouter as Router,
  Route
} from "react-router-dom"

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Header />
          <main>
            <Route exact path="/" component={Home} />
            <Route exact path="/about" component={About} />
            <Route exact path="/stations" component={StationContainer} />
            <Route exact path="/stations/:id" component={Station} />
            <Route exact path="/contact-us" component={ContactUs} />
          </main>

        </div>
      </Router>
    );
  }
}

export default App;
