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
      line: '',
      loading: true
    }
    this.handleKeywordChange = this.handleKeywordChange.bind(this)
    this.handleSortByChange = this.handleSortByChange.bind(this)
    this.handleLineChange = this.handleLineChange.bind(this)
  }
  componentDidMount(){
    axios.get("https://sluggingdc.herokuapp.com/api/stations/").then((response) => {
      this.setState({
        stations: response.data,
        loading: false
      })
    })
    .catch(error => {
      console.log(error);
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
              <h1 className="stationTitle">Slug Lines</h1>
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
                loading={this.state.loading}
              />
              </div>
            </div>
          </div>
        )
    }


}

export default StationContainer;
