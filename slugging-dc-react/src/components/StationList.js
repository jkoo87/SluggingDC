import React, {Component} from 'react'
import {Link} from "react-router-dom"
import '../css/Station.css'
import loadingImg from '../css/img/loading.gif'

class StationList extends Component {


  render() {
    let stations = null
    let matchStations = []

    if(this.props.loading !== false){
      stations = <div><img className="loading" src={loadingImg} alt={loadingImg}/> </div>
    } else if (this.props.station === undefined) {
        this.props.stations.sort((a,b)=>{return a-b})
        stations = this.props.stations.filter(
          (station) => {
            if(this.props.line === station.line ){
            return station.name.toLowerCase()
              .indexOf(this.props.keyword.toLowerCase()) > -1
            } else if (this.props.line === "all" || this.props.line === "") {
                return station.name.toLowerCase()
                  .indexOf(this.props.keyword.toLowerCase()) > -1
              }
              return stations
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
          <div className="stationListWrapper">
              {stations}
          </div>
      )
  }
}

export default StationList;
