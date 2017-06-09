import React, {Component} from 'react'
import {Link} from "react-router-dom"

class RiderPostList extends Component {

  render() {
      // for(let i= 0; i < this.props.posts.length; i++){
      //   this.props.postExpired(this.props.posts[i])
      // }

      let posts = null
      posts = this.props.posts.filter(
        (post) => {
          console.log(this.props.line, "post",post.line)
          if(this.props.line === post.line){
          return (post.destination.toLowerCase()
            .indexOf(this.props.keyword.toLowerCase()) > -1)
          } else if (this.props.line === ''|| this.props.line === "all"){
            return (post.destination.toLowerCase()
              .indexOf(this.props.keyword.toLowerCase()) > -1)
          }
          return posts
        }
      )

      posts = posts.filter((post)=>{
        const timeNow = new Date()
        const getExpiredTime= new Date(post.updatedAt)
        getExpiredTime.setMinutes ( getExpiredTime.getMinutes() + post.leaving )
          return (timeNow < getExpiredTime)
        })

      const postList = posts.map((post, i) => {
        let pathname = `/need-a-ride/${post._id}`
        return <div key={i}>
                  <Link to={pathname}>{post.destination}</Link>
               </div>
      })

      return (
          <div>
              {postList}
          </div>
      )
  }
}

export default RiderPostList;
