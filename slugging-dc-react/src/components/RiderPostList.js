import React, {Component} from 'react'
import {Link} from "react-router-dom"

class RiderPostList extends Component {

  render() {
      let posts = this.props.posts.map((post, i) => {
        let pathname = `/need-a-ride/${post._id}`
        return <div key={i}>
                  <Link to={pathname}>{post.destination}</Link>
               </div>
      })
      return (
          <div>
              {posts}
          </div>
      )
  }
}

export default RiderPostList;
