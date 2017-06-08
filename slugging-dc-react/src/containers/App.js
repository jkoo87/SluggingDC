import React, { Component } from 'react';
import '../css/App.css';
import { About, Home, StationContainer, RidePostContainer, ContactUs } from './'
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
            <Route path="/about" component={About} />
            <Route exact path="/stations" component={StationContainer} />
            <Route exact path="/stations/:id" component={Station} />
            <Route exact path="/need-a-ride" component={RidePostContainer} />
            <Route exact path="/contact-us" component={ContactUs} />
          </main>

        </div>
      </Router>
    );
  }
}

export default App;
