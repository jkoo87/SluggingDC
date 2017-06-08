import React, {Component} from 'react'
import { CommentCreate, CommentEdit } from '../components'
import axios from 'axios'

class Comment extends Component {
  constructor(props){
    super(props)
    this.state = {
      comments: [],
      isUpdate: false
      }
    this.handleCreate = this.handleCreate.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleToggle = this.handleToggle.bind(this)
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
    axios.post(`http://localhost:3001/api/stations/${this.props.id}/comments/`,
      {
        name: comment.name,
        content: comment.content
      }
    ).then((response) => {
        this.setState({
          comments: response.data.comments,
      })
    })
  }

  handleEdit(comment) {
    axios.put(`http://localhost:3001/api/stations/${this.props.id}/comments/${comment.commentId}`,
      {
        name: comment.name,
        content: comment.content
      }
    ).then((response) => {
        this.setState({
          comments: response.data.comments
      })
    })
  }

  handleDelete(id) {
    setTimeout(()=>{
      axios.delete(`http://localhost:3001/api/stations/${this.props.id}/comments/${id}`,
      ).then((response) => {
          this.setState({
            comments: response.data.comments
        })
        this.handleToggle()
      })
    },3000)
  }

  handleToggle(index){
    if(this.state.isEditing === index)
      index = undefined;
    this.setState({
      isEditing: index,
      isUpdate: !this.state.isUpdate
    })
  }


    render() {
        // console.log(new Date())
        const blank = (<div></div>)

        let viewComments= this.state.comments.map((comment, i)=>{
          return <div key={i}>
                    <li>{comment.content}({comment.name}) {comment.updatedAt} <button onClick={() => {this.handleToggle(i)}}>Edit</button></li>
                    {this.state.isEditing === i ? <CommentEdit
                                            onEdit = {this.handleEdit}
                                            onDelete = {this.handleDelete}
                                            comment= {comment}
                                            isUpdate={this.state.isUpdate}
                                         /> : blank}

                 </div>
        })

        return (
            <div>
                <h2>Comment</h2>
                <CommentCreate
                  onCreate = {this.handleCreate}
                />
                <ul>
                {viewComments}
                </ul>
            </div>
        );
    }
}

export default Comment;
