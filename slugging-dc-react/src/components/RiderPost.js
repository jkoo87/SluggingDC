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
    axios.get(`http://localhost:3001/api/riderPosts/${this.props.match.params.id}`).then((response) => {
      this.setState({
        post: response.data,
        carType: response.data.carType

      })
    })
  }

  handleEdit(post) {
    axios.put(`http://localhost:3001/api/riderposts/${post.postId}`,
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
    axios.delete(`http://localhost:3001/api/riderposts/${id}`,
    ).then((response) => {
      alert("Post has been successfully deleted")
      this.props.history.push(`/need-a-ride`)
    })
  }
  handleToggle(){
    this.setState({
      isEdit: !this.state.isEdit
    })
  }

  postExpired(){
    const timeNow = new Date()
    const getExpiredTime= new Date(this.state.post.updatedAt)
    getExpiredTime.setMinutes ( getExpiredTime.getMinutes() + this.state.post.leaving );
    if(timeNow >= getExpiredTime){
      console.log("chnage!")
      this.handleDelete(this.state.post._id)
    }
  }



    render() {
        this.postExpired()

        const blank = (<div></div>)
        const showEdit =  this.state.isEdit? <RiderPostEdit post={this.state.post} onEdit={this.handleEdit} onDelete={this.handleDelete}/> : blank
        return (
            <div>
              <h1>Destination: {this.state.post.destination}<button onClick={this.handleToggle}>Edit Post</button></h1>
              {showEdit}
              <h2>NOTICE: {this.state.post.notice}</h2>
              <p>Name: {this.state.post.name}</p>
              <p>I can take up to {this.state.post.count} people</p>
              <p>Departure Time: {this.state.post.leaving} minutes</p>
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
