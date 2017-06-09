import React, {Component} from 'react'
import { StationList, Search} from '../components'
import '../css/Station.css'
import axios from 'axios'

class StationContainer extends Component {
  constructor(props){
    super(props)
    this.state = {
      stations: [],
      keyword: '',
      sortBy: '',
      line: ''
    }
    this.handleKeywordChange = this.handleKeywordChange.bind(this)
    this.handleSortByChange = this.handleSortByChange.bind(this)
    this.handleLineChange = this.handleLineChange.bind(this)
  }
  componentDidMount(){
    axios.get("http://localhost:3001/api/stations").then((response) => {
      this.setState({
        stations: response.data
      })
    })
  }
  handleKeywordChange(e){
    this.setState({
      keyword: e.target.value
    })
  }
  handleSortByChange(e){
    this.setState({
      sortBy: e.target.value
    })
  }
  handleLineChange(e){
    this.setState({
      line: e.target.value
    })
  }


    render() {
        return (
          <div className="stationBody">
            <div className="stationWrapper">
              <h1 className="stationTitle">Stations</h1>
              <Search
                sortBy={this.state.sortBy}
                keyword={this.state.keyword}
                handleKeywordChange={this.handleKeywordChange}
                handleSortByChange={this.handleSortByChange}
                handleLineChange={this.handleLineChange}
              />
              <div>
              <StationList
                keyword={this.state.keyword}
                sortBy={this.state.sortBy}
                line={this.state.line}
                stations={this.state.stations}
              />
              </div>
            </div>
          </div>
        )
    }


}

export default StationContainer;
