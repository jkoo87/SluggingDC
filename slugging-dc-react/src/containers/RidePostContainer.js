import React, {Component} from 'react'
// import { StationList } from '../components'
import axios from 'axios'

class RidePostContainer extends Component {
  constructor(props){
  super(props)
  this.state = {
    stations: []
  }
  }
  componentDidMount(){
    axios.get("http://localhost:3001/api/stations").then((response) => {
      this.setState({
        stations: response.data
      })
    })
  }


    render() {
        return (
          <div>
            <h1>Need A Ride?</h1>
            <div>

            </div>
          </div>
        )
    }


}

export default RidePostContainer;
