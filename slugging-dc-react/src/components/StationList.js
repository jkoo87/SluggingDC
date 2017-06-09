import React, {Component} from 'react'
import {Link} from "react-router-dom"

class StationList extends Component {

  render() {
    let stations = null
    let matchStations = []
    if (this.props.station === undefined) {
      stations = this.props.stations.filter(
        (station) => {
          return station.name.toLowerCase()
            .indexOf(this.props.keyword.toLowerCase()) > -1
        }
      )
      stations = stations.map((station, i) => {
        let pathname = `/stations/${station._id}`
        return <div key={i}>
                  <Link to={pathname}>{station.name}</Link>
               </div>
      })
    } else {
        for (let i = 0; i < this.props.returnStation.length; i++){
          this.props.stations.filter((station) =>{
              if (station.name.toLowerCase() === this.props.station.returningStations[i].toLowerCase()){
                matchStations.push(station)
              }
              return matchStations
          })
        }
        stations = matchStations.map((station, i) => {
          let pathname = `/stations/${station._id}`
          return <div key={i}>
                    <Link to={pathname}>{station.name}</Link>
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
