import React, {Component} from 'react'
import { StationList, Search} from '../components'
import axios from 'axios'

class StationContainer extends Component {
  constructor(props){
    super(props)
    this.state = {
      stations: [],
      keyword: ''
    }
    this.handleChange = this.handleChange.bind(this)
  }
  componentDidMount(){
    axios.get("http://localhost:3001/api/stations").then((response) => {
      this.setState({
        stations: response.data
      })
    })
  }
  handleChange(e){
    this.setState({
      keyword: e.target.value
    })
  }


    render() {
        return (
          <div>
            <h2>Stations</h2>
            <Search
              keyword={this.state.keyword}
              handleChange={this.handleChange}
            />
            <div>
            <StationList
              keyword={this.state.keyword}
              stations={this.state.stations}
            />

            </div>
          </div>
        )
    }


}

export default StationContainer;
