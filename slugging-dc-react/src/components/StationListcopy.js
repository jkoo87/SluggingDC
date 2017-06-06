import React, {Component} from 'react'
import {Link} from "react-router-dom"

class StationList extends Component {

  render() {
    console.log("StationList",this.props.stations)
    let stations = null
    let matchStations = []
    if (this.props.station === undefined) {
      stations = this.props.stations.map((station, i) => {

        let pathname = `/stations/${station.name}`
        console.log("LINKTO",this.props.stations, station)
        return <div key={i}>
                  <Link to={{pathname, state: {stations: this.props.stations, station: station}}}>{station.name}</Link>
               </div>
      })
    } else {
        for (let i = 0; i < this.props.station.returningStations.length; i++){
          this.props.stations.filter((station) =>{
              console.log("station: ",station.name,"vs", this.props.station.returningStations[i])
              if (station.name.toLowerCase() === this.props.station.returningStations[i].toLowerCase()){
                matchStations.push(station)
              }
              return matchStations
          })
        }
        console.log('matchmatch',matchStations)
        stations = matchStations.map((station, i) => {
          let pathname = `/stations/${station.name}`
          console.log("LINKTO2",this.props.stations, station)
          return <div key={i}>
                    <Link to={{pathname, state: {stations: this.props.stations, station}}}>{station.name}</Link>
                 </div>
      })

    }

      return (
          <div>
              {stations}
          </div>
      )
  }
}

export default StationList;
