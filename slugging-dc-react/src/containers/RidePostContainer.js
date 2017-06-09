import React, {Component} from 'react'
import { RiderPostList, RiderPostCreate, RideSearch  } from '../components'
import axios from 'axios'
import '../css/needRide.css'


class RidePostContainer extends Component {
  constructor(props){
    super(props)
    this.state = {
      stations:[],
      posts: [],
      isCreate: false,
      line: '',
      keyword:''
    }
    this.handleCreate = this.handleCreate.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleToggle = this.handleToggle.bind(this)
    this.postExpired = this.postExpired.bind(this)
    this.handleKeywordChange = this.handleKeywordChange.bind(this)
    this.handleLineChange = this.handleLineChange.bind(this)

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
        line: post.line,
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
  handleLineChange(e){
    this.setState({
      line: e.target.value
    })
  }
  handleKeywordChange(e){
    this.setState({
      keyword: e.target.value
    })
  }

  postExpired(post){
    const timeNow = new Date()
    const getExpiredTime= new Date(post.updatedAt)
    getExpiredTime.setMinutes ( getExpiredTime.getMinutes() + post.leaving )
    if(timeNow >= getExpiredTime){
      this.handleDelete(post._id)
    }
  }


    render() {
        const blank = (<div></div>)
        const showCreate =  this.state.isCreate? <RiderPostCreate posts={this.state.stations} onCreate={this.handleCreate}/> : blank

        return (
          <div className="riderPostContainer">
              <div className="riderPostWrapper">
                <h1 className="riderPostTitle">Need A Ride?</h1>
                <button className="createButton" onClick={this.handleToggle}>Create New Post</button>

                {showCreate}
                <RideSearch
                  line={this.state.line}
                  keyword={this.state.keyword}
                  handleKeywordChange={this.handleKeywordChange}
                  handleLineChange={this.handleLineChange}
                />
                <RiderPostList
                  line={this.state.line}
                  keyword={this.state.keyword}
                  posts={this.state.posts}
                  postExpired={this.postExpired}
                />
              </div>
          </div>
        )
    }


}

export default RidePostContainer;
