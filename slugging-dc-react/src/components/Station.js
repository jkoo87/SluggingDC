import React, {Component} from 'react'
import { StationList, Comment, Map } from '../components'
import axios from 'axios'
import '../css/StationDetail.css'


class Station extends Component {
  constructor(props){
    super(props)
    this.state = {
      stations: [],
      station: [],
      hours: [],
      returnStation: [],
      destinations: []
      }
  }

  componentDidMount(){
    axios.get("http://localhost:3001/api/stations").then((response) => {
      this.setState({
        stations: response.data
      })
    })
    axios.get(`http://localhost:3001/api/stations/${this.props.match.params.id}`,{
    }).then((response) => {
        this.setState({
          station: response.data,
          hours: response.data.hours,
          destinations: response.data.destinations,
          returnStation: response.data.returningStations
        })
      })
  }

  componentWillReceiveProps(nextProps) {
    axios.get("http://localhost:3001/api/stations/"+ nextProps.match.params.id,{
    }).then((response) => {
        this.setState({
          station: response.data,
          hours: response.data.hours,
          destinations: response.data.destinations,
          returnStation: response.data.returningStations
        })
      })
  }



  render() {
    const destin = this.state.destinations.map((destination, i) => {
      return <div key={i}>
                <li>{destination}</li>
             </div>
    })
    const blank = (<div></div>)
    const showMap = (this.state.station.map.lat?
                      <Map
                        containerElement={<div style={{height:300+'px'}} />}
                        mapElement={<div style={{height:300+'px'}} />}
                        address={this.state.station.map}
                      /> : blank
                    )
      return (
          <div className="stationDetailBody">
            <div className="stationDetailWrapper">
              <div className="stationDetailTitle">{this.state.station.name}</div>
              <h3>Location</h3>
              <p>{this.state.station.location}</p>
              <div className="mapDescriptionWrapper">
                <div>
                  <h3>Map</h3>
                  {showMap}
                </div>
                <div>
                  <h3>Description</h3>
                  <p>{this.state.station.description}</p>
                </div>
              </div>
              <h3>Tips to drivers</h3>
              <p>{this.state.station.driver}</p>
              <h3>Parking Info</h3>
              <p>{this.state.station.parking}</p>
              <h3>Hours</h3>
              <p>Best: {this.state.hours.best}</p>
              <p>Good: {this.state.hours.good} </p>
              <h3>Destinations</h3>
              <ul>{destin}</ul>
              <h3>Returning Stations</h3>
              <StationList
                stations={this.state.stations}
                station={this.state.station}
                returnStation={this.state.returnStation}
              />
              <Comment
                id={this.props.match.params.id}
              />
            </div>
          </div>
      );
  }
}

export default Station;
