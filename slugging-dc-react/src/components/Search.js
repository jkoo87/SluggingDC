import React, {Component} from 'react'

class Search extends Component {

  render() {
  return (
      <div>
          <select name="sortBy" onChange={this.props.handleSortByChange} required>
            <option value="all">Sort By</option>
            <option value="all">All Stations</option>
            <option value="am">AM Stations</option>
            <option value="pm">PM Stations</option>
          </select>
          <input
            name='keyword'
            placeholder='Search'
            value={this.props.keyword}
            onChange={this.props.handleKeywordChange}/>
      </div>
    )
  }
}

export default Search;
