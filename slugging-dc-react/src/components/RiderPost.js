import React, {Component} from 'react'
import { RiderComment, RiderPostEdit } from '../components'
import axios from 'axios'

class RiderPost extends Component {
  constructor(props){
  super(props)
  this.state = {
    post: [],
    carType: [],
    isEdit: false
    }
  this.handleEdit = this.handleEdit.bind(this)
  this.handleDelete = this.handleDelete.bind(this)
  this.handleToggle = this.handleToggle.bind(this)
  this.postExpired = this.postExpired.bind(this)
  }
  componentDidMount(){
    axios.get(`https://sluggingdc.herokuapp.com/api/riderposts/${this.props.match.params.id}`).then((response) => {
      this.setState({
        post: response.data,
        // carType: response.data.carType
      })
    }, (errorResponse) => {
      console.log(errorResponse)
    })
  }

  handleEdit(post) {
    axios.put(`https://sluggingdc.herokuapp.com/api/riderposts/${post.postId}`,
      {
        notice: post.notice,
        destination: post.destination,
        name: post.name,
        count: post.count,
        leaving: post.leaving,
        from: post.from,
        description: post.description
      }
    ).then((response) => {
        this.setState({
          post: response.data
      })
      this.handleToggle()
    })
  }

  handleDelete(id) {
    axios.delete(`https://sluggingdc.herokuapp.com/api/riderposts/${id}`,
    ).then((response) => {
      alert("Post has been deleted")
      this.props.history.push(`/need-a-ride`)
    })
  }
  handleToggle(){
    this.setState({
      isEdit: !this.state.isEdit
    })
  }

  postExpired(){
    if(this.state.post.updatedAt !== undefined || this.state.post.updatedAt !== null){
      const timeNow = new Date()
      const getExpiredTime= new Date(this.state.post.updatedAt)
      getExpiredTime.setMinutes ( getExpiredTime.getMinutes() + this.state.post.leaving );
      if(timeNow >= getExpiredTime){
        this.handleDelete(this.state.post._id)
      }
    } else {this.props.history.push(`/need-a-ride`)}
  }



    render() {
        this.postExpired()
        const getExpiredTime= new Date(this.state.post.updatedAt)
        getExpiredTime.setMinutes ( getExpiredTime.getMinutes() + this.state.post.leaving );
        const departureHour = JSON.stringify(getExpiredTime.getHours())
        const departureMinutes = JSON.stringify(getExpiredTime.getMinutes())

        const blank = (<div></div>)
        const showEdit =  this.state.isEdit? <RiderPostEdit post={this.state.post} onEdit={this.handleEdit} onDelete={this.handleDelete}/> : blank

        return (
            <div>
              <h1>Destination: {this.state.post.destination}<button onClick={this.handleToggle}>Edit Post</button></h1>
              {showEdit}
              <h2>NOTICE: {this.state.post.notice}</h2>
              <p>Name: {this.state.post.name}</p>
              <p>Line: {this.state.post.line}</p>
              <p>I can take up to {this.state.post.count} people</p>
              <p>Departure Time: {departureHour}:{departureMinutes}</p>
              <p>Pickup Location: {this.state.post.from}</p>
              <p>Description: {this.state.post.description} </p>
              <RiderComment
                id={this.props.match.params.id}
              />
            </div>
        )
    }
}

export default RiderPost
