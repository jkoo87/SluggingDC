import React, {Component} from 'react'
import { CommentCreate } from '../components'
import axios from 'axios'

class Comment extends Component {
  constructor(props){
    super(props)
    this.state = {
      comments: [],
      }
    this.handleCreate = this.handleCreate.bind(this)
  }
  componentDidMount(){
    axios.get(`http://localhost:3001/api/stations/${this.props.id}`,{
    }).then((response) => {
        this.setState({
          comments: response.data.comments
        })
      })
  }

  handleCreate(comment) {
    console.log("comment", comment)

  axios.post(`http://localhost:3001/api/stations/${this.props.id}/comments/`,
    {
      name: comment.name,
      content: comment.content
    }
  ).then((response) => {
    this.setState({
      comments: response.data.comments,
      // hasSearched: true
    })
      console.log(response)
  })

}



    render() {
            console.log(this.props.id)


        let viewComments= this.state.comments.map((comment, i)=>{
          return <div key={i}>
                    <li>{comment.content}</li>
                 </div>
        })

        return (
            <div>
                <h2>Comment</h2>
                <button onClick={this.handleToggle}>+</button>

                <CommentCreate
                  onCreate = {this.handleCreate}
                />
                {viewComments}
            </div>
        );
    }
}

export default Comment;
