import React, {Component} from 'react'

class Search extends Component {

  render() {
  return (
      <div>
          <input
            name="keyword"
            placeholder="Search"
            value={this.props.keyword}
            onChange={this.props.handleChange}/>
      </div>
    )
  }
}

export default Search;
