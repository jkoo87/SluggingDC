import React, {Component} from 'react'
import { RiderPostList, RiderPostCreate  } from '../components'
import axios from 'axios'


class RidePostContainer extends Component {
  constructor(props){
    super(props)
    this.state = {
      stations:[],
      posts: [],
      isCreate: false
    }
    this.handleCreate = this.handleCreate.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleToggle = this.handleToggle.bind(this)
    this.postExpired = this.postExpired.bind(this)

  }
  componentDidMount(){
    axios.get("http://localhost:3001/api/riderposts").then((response) => {
      this.setState({
        posts: response.data
      })
    })
  }
  handleCreate(post) {
    axios.post(`http://localhost:3001/api/riderposts/`,
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
      this.handleToggle()
      this.props.history.push(`/need-a-ride/${response.data._id}`)
      alert("Post has been successfully created")
    })
  }
  handleDelete(id) {
    axios.delete(`http://localhost:3001/api/riderposts/${id}`,
    ).then((response) => {
      this.props.history.push(`/need-a-ride`)
    })
  }
  handleToggle(){
    this.setState({
      isCreate: !this.state.isCreate
    })
  }
  postExpired(post){
    const timeNow = new Date()
    const getExpiredTime= new Date(post.updatedAt)
    getExpiredTime.setMinutes ( getExpiredTime.getMinutes() + post.leaving );
    if(timeNow >= getExpiredTime){
      this.handleDelete(post._id)
    }
  }




    render() {
        const blank = (<div></div>)
        const showCreate =  this.state.isCreate? <RiderPostCreate posts={this.state.stations} onCreate={this.handleCreate}/> : blank

        return (
          <div>
            <h1>Need A Ride?<button onClick={this.handleToggle}>Create New Post</button></h1>
            {showCreate}
            <RiderPostList
              posts={this.state.posts}
              postExpired={this.postExpired}
            />
          </div>
        )
    }


}

export default RidePostContainer;
