import React, {Component} from 'react'

class RideSearch extends Component {

  render() {
    const allLines = ["Springfield/Lorton Lines", "Woodbridge/Dale City", "Stafford Lines", "Fredericksburg Lines", "I-66/Manassas Lines"]
    const showLines = allLines.map((line, i) => {
        return (<option key={i} value={line}>{line}</option>)
      })

  return (
      <div>
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

export default RideSearch
