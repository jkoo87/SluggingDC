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
    this.handleToggle = this.handleToggle.bind(this)

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

  handleToggle(){
    this.setState({
      isCreate: !this.state.isCreate
    })
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
            />
          </div>
        )
    }


}

export default RidePostContainer;
