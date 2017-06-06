import React, {Component} from 'react'
import {Link} from "react-router-dom"

class StationList extends Component {

  render() {
    let stations = null
    let matchStation = null
    if (this.props.station === undefined) {
      stations = this.props.stations.map((station, i) => {
        let pathname = `/stations/${station.name}`
        return <div key={i}>
                  <Link to={{pathname, state: {stations: this.props.stations, station}}}>{station.name}</Link>
               </div>
      })
    } else {
      //   stations = this.props.stations.map((station, i) => {
      //               console.log(i, station)
      //         // console.log("hello", this.props.station.returningStations[0])
      //     matchStation = this.props.station.returningStations.filter((returningStation)=>{
      //       console.log(returningStation, station.name)
      //       return (returningStation === station.name)
      //     })
      //     console.log(matchStation)
      //
      //     let pathname = `/stations/${station.name}`
      //     return <div key={i}>
      //               <Link to={{pathname, state: {stations: this.props.stations, station}}}>{matchStation}</Link>
      //            </div>
      // })


            for (let i = 0; i < this.props.station.returningStations.length; i++){
            console.log(this.props.station.returningStations)
            matchStation =   this.props.stations.filter((station) =>{
                  return (station.name === this.props.station.returningStations[i])
              })
            }
            console.log('matchmatch',matchStation[0].name)

    }

      return (
          <div>
              {stations}
          </div>
      )
  }
}

export default StationList;
