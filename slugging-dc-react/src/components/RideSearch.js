import React, {Component} from 'react'

class RideSearch extends Component {

  render() {
    const allLines = ["Springfield/Lorton Lines", "Woodbridge/Dale City", "Stafford Lines", "Fredericksburg Lines", "I-66/Manassas Lines"]
    const showLines = allLines.map((line, i) => {
        return (<option key={i} value={line}>{line}</option>)
      })

  return (
      <div>
          <p>
          <select name="Sort By City Lines" onChange={this.props.handleLineChange} required>
            <option value="all">Sort By City Lines</option>
            {showLines}
          </select>
          </p>
          <p>
          <input
            name='keyword'
            placeholder='Search Station'
            value={this.props.keyword}
            onChange={this.props.handleKeywordChange}/>
          </p>
      </div>
    )
  }
}

export default RideSearch
