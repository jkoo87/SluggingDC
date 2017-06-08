import React, { Component } from 'react';
import axios from 'axios'


class PostEdit extends Component {
  constructor(props){
    super(props)
    this.state = {
      stations: [],
      notice: this.props.post.notice,
      destination: this.props.post.destination,
      name: this.props.post.name,
      count: this.props.post.count,
      leaving: this.props.post.leaving,
      from: this.props.post.from,
      description: this.props.post.description,
      postId: this.props.post._id
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)
  }
  componentDidMount(){
    axios.get("http://localhost:3001/api/stations").then((response) => {
      this.setState({
        stations: response.data
      })
    })
  }

  handleChange(e){
    let nextState= {}
    nextState[e.target.name] = e.target.value
    this.setState(nextState)
  }

  handleSubmit(e){
    e.preventDefault()
    const post = {
      notice: this.state.notice,
      destination: this.state.destination,
      name: this.state.name,
      count: this.state.count,
      leaving: this.state.leaving,
      from: this.state.from,
      description: this.state.description,
      postId: this.state.postId
    }
    this.props.onEdit(post)
    this.setState({
      notice: this.state.notice,
      destination: post.destination,
      name: post.name,
      count: post.count,
      leaving: post.leaving,
      from: post.from,
      description: post.description
    })
  }
  handleDelete(){
    this.props.onDelete(this.state.postId)
    this.setState({
      postId: this.props.postId
    })
  }
  handleKeyPress(e){
    if(e.charCode === 13){
      this.handleClick()
    }
  }

  render(){
    const morningStationList = []

    this.state.stations.filter((station) =>{
        if (station.morning === true){
          morningStationList.push(station.name)
        }
        return morningStationList
    })

    const destinations = morningStationList.map((destination, i) => {
      return  <option key={i} value={destination}>{destination}</option>
    })

    return(
      <form className="commentForm" onSubmit={this.handleSubmit}>
        <p>
          <select name="destination" value={this.state.destination}  onChange={this.handleChange} required>
            <option value="">Destination</option>
            {destinations}
          </select>
        </p>
        <p><input
          type="text"
          name='notice'
          value={this.state.notice}
          onChange={this.handleChange}
          required
          /></p>
        <p><input
          type="text"
          name='name'
          value={this.state.name}
          onChange={this.handleChange}
          required
          /></p>
        <p>
          <select name="count" value={this.state.count} onChange={this.handleChange} required>
            <option value="">How many people</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </p>
        <p><input
          type="text"
          name='from'
          value={this.state.from}
          onChange={this.handleChange}
          required
          /></p>
        <p>
          <select name="leaving" value={this.state.leaving} onChange={this.handleChange} required>
            <option value="">Leaving after..</option>
            <option value="1">1 minute</option>
            <option value="10">10 minutes</option>
            <option value="15">15 minutes</option>
            <option value="30">30 minutes</option>
            <option value="40">40 minutes</option>
            <option value="50">50 minutes</option>
            <option value="60">1 hour</option>
          </select>
        </p>
        <p><textarea
          name='description'
          value={this.state.description}
          onChange={this.handleChange}
          required
          />
        </p>
        <p><input type="submit" value="Post" /></p>
        <button onClick={this.handleDelete}>Delete</button>
      </form>
    )
  }
}



export default PostEdit
