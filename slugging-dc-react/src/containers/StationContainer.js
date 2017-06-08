import React, {Component} from 'react'
import { StationList} from '../components'
import axios from 'axios'

class StationContainer extends Component {
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
            <h2>Stations</h2>
            <div>
            <StationList
              stations={this.state.stations}
            />

            </div>
          </div>
        )
    }


}

export default StationContainer;
