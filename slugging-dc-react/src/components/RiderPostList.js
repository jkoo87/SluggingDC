import React, {Component} from 'react'
import {Link} from "react-router-dom"
import '../css/RiderPostList.css'
import $ from 'jquery'
import loadingImg from '../css/img/loading.gif'

class RiderPostList extends Component {


  constructor(props) {
    super(props)
    this.timers = []
  }
  deleteTimer(){
    this.timers.forEach((timer)=>{
      clearInterval(timer)
    })
  }

  componentWillUnmount(){
    this.deleteTimer();

  }

  render() {
      let timers = this.timers
      this.deleteTimer()

      let posts = null
      let postList = null

      if(this.props.loading !== false){
        postList = <div><img className="loading" src={loadingImg} alt={loadingImg}/> </div>
      } else {
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


          postList = posts.map((post, i) => {

            let getExpiredTime= new Date(post.updatedAt)
            getExpiredTime.setMinutes ( getExpiredTime.getMinutes() + post.leaving )
            let countDownDate = new Date(getExpiredTime).getTime()
            let countId = "countId"+ i

            let x = setInterval(function() {
                let now = new Date().getTime()
                let distance = countDownDate - now
                let days = Math.floor(distance / (1000 * 60 * 60 * 24));
                let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                let seconds = Math.floor((distance % (1000 * 60)) / 1000);

                if (days === 0 && hours === 0 && minutes === 0){
                  $("#"+countId).html(seconds + "s ")
                } else if (days === 0 && hours === 0){
                  $("#"+countId).html(minutes + "m " + seconds + "s ")
                } else if (days === 0){
                  $("#"+countId).html(hours + "h " + minutes + "m " + seconds + "s ")
                } else{$("#"+countId).html(days + "d " + hours + "h " + minutes + "m " + seconds + "s ")}

                if (distance < 0) {
                     clearInterval(x);
                     $("#"+countId).html("EXPIRED");
                 }
                }, 1000)
                timers.push(x)



            let pathname = `/need-a-ride/${post._id}`
            return <div key={i}>
                      <Link to={pathname}><p className="destinationTitle">{post.destination}</p><p>Leaving after<br/><span id={countId}></span></p><p>{post.count} seat(s) left</p></Link>
                   </div>
          })
        }

      return (
        <div>
          <div className="riderListWrapper">
              {postList}
          </div>
          <p className="notice">* Expired posts will be deleted from the list *</p>
        </div>
      )
  }
}

export default RiderPostList;
