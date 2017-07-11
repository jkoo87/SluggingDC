import React, {Component} from 'react'
import {Link} from "react-router-dom"
import '../css/RiderPostList.css'
import $ from 'jquery'

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
        let timeNow = new Date()
        let getExpiredTime= new Date(post.updatedAt)
        getExpiredTime.setMinutes ( getExpiredTime.getMinutes() + post.leaving )
          return (timeNow < getExpiredTime)
      })


      let postList = posts.map((post, i) => {

        let getExpiredTime= new Date(post.updatedAt)
        getExpiredTime.setMinutes ( getExpiredTime.getMinutes() + post.leaving )
        let countDownDate = new Date(getExpiredTime).getTime()
        let countId = "countId"+ i

        let x = setInterval(function() {
            let now = new Date().getTime()
            let distance = countDownDate - now
            // let days = Math.floor(distance / (1000 * 60 * 60 * 24));
            let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            let seconds = Math.floor((distance % (1000 * 60)) / 1000);
            $("#"+countId).html(hours + "h "
            + minutes + "m " + seconds + "s ")
            if (distance < 0) {
                 clearInterval(x);
                 $("#"+countId).html("EXPIRED");
             }
            }, 1000)


        let pathname = `/need-a-ride/${post._id}`
        return <div key={i}>
                  <Link to={pathname}><p className="destinationTitle">{post.destination}</p><p>Leaving after<br/><span id={countId}></span></p><p>{post.count} seat(s) left</p></Link>
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
