import React, {Component} from 'react'
import { RiderComment } from '../components'
import axios from 'axios'

class RiderPost extends Component {
  constructor(props){
  super(props)
  this.state = {
    post: [],
    }
  }
  componentDidMount(){
    axios.get(`http://localhost:3001/api/riderPosts/${this.props.match.params.id}`).then((response) => {
      this.setState({
        post: response.data
      })
    })
  }


    render() {
        return (
            <div>
              <h1>Destination: {this.state.post.destination}</h1>
              <h2>NOTICE: {this.state.post.notice}</h2>
              <p>Name: {this.state.post.name}</p>
              <p>I can take up to {this.state.post.count} people</p>
              <p>Departure Time: {this.state.post.leaving} minutes</p>
              <p>Picup Location: {this.state.post.from}</p>
              <p>Description: {this.state.post.description} </p>
              <RiderComment
                id={this.props.match.params.id}
              />
            </div>
        )
    }
}

export default RiderPost
