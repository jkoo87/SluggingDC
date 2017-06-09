import React, {Component} from 'react'
import {Link} from "react-router-dom"
import '../css/RiderPostList.css'

class RiderPostList extends Component {

  render() {
      // for(let i= 0; i < this.props.posts.length; i++){
      //   this.props.postExpired(this.props.posts[i])
      // }

      let posts = null
      posts = this.props.posts.filter(
        (post) => {
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
        const getExpiredTime= new Date(post.updatedAt)
        getExpiredTime.setMinutes ( getExpiredTime.getMinutes() + post.leaving );
        const departureHour = JSON.stringify(getExpiredTime.getHours())
        const departureMinutes = JSON.stringify(getExpiredTime.getMinutes())
        let pathname = `/need-a-ride/${post._id}`
        return <div key={i}>
                  <Link to={pathname}>{post.destination}<br />Leaving {departureHour}:{departureMinutes}<br/>(Up to {post.count} ppl)</Link>
               </div>
      })

      return (
          <div className="riderListWrapper">
              {postList}
          </div>
      )
  }
}

export default RiderPostList;
