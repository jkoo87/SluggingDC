import React, {Component} from 'react'
import { StationList } from '../components'


class Station extends Component {
  constructor(props){
  super(props)
  this.state = {
    stations:  this.props.location.state.stations,
    station: this.props.location.state.station
    }
  }


  render() {
    console.log("Station:", this.props)
      return (
          <div>
              <h1>{this.state.station.name}</h1>
              <p>{this.state.station.map}</p>
              <h3>Location</h3>
              <p>{this.state.station.location}</p>
              <h3>Description</h3>
              <p>{this.state.station.description}</p>
              <h3>Tips to drivers</h3>
              <p>{this.state.station.driver}</p>
              <h3>Parking Info</h3>
              <p>{this.state.station.parking}</p>
              <h3>Hours</h3>
              <p>Best: {this.state.station.hours.best}</p>
              <p>Best: {this.state.station.hours.good}</p>
              <h3>Returning Stations</h3>
              <StationList
                stations={this.state.stations}
                station={this.state.station}
              />

          </div>
      );
  }
}

export default Station;
