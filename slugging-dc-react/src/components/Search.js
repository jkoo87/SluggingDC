import React, {Component} from 'react'
import '../css/Search.css'

class Search extends Component {

  render() {
    const allLines = ["Springfield/Lorton Lines", "Woodbridge/Dale City", "Stafford Lines", "Fredericksburg Lines", "I-66/Manassas Lines", "Washington DC Lines"]
    const showLines = allLines.map((line, i) => {
      if(this.props.sortBy === "am" && line !== allLines[allLines.length-1]){
        return  (<option key={i} value={line}>{line}</option>)
      } else if(this.props.sortBy === "pm" && line === allLines[allLines.length-1]){
        return  (<option key={i} value={line}>{line}</option>)
      } else if(this.props.sortBy === "all" || this.props.sortBy === ""){
        return (<option key={i} value={line}>{line}</option>)
      }
        return showLines
      })

  return (
      <div className="searchWrapper">

          <select name="Sort By City Lines" onChange={this.props.handleLineChange} required>
            <option value="all">Sort By City Lines</option>
            {showLines}
          </select>
          <input
            name='keyword'
            placeholder='Search Station'
            value={this.props.keyword}
            onChange={this.props.handleKeywordChange}/>
      </div>
    )
  }
}

export default Search
