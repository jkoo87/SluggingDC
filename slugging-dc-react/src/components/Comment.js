import React, {Component} from 'react'
import { CommentCreate, CommentEdit } from '../components'
import axios from 'axios'
import '../css/StationDetail.css'

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
    axios.get(`https://sluggingdc.herokuapp.com/api/stations/${this.props.id}`,{
    }).then((response) => {
        this.setState({
          comments: response.data.comments
        })
      })
  }


  handleCreate(comment) {
    axios.post(`https://sluggingdc.herokuapp.com/api/stations/${this.props.id}/comments/`,
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
    axios.put(`https://sluggingdc.herokuapp.com/api/stations/${this.props.id}/comments/${comment.commentId}`,
      {
        name: comment.name,
        content: comment.content
      }
    ).then((response) => {
        this.setState({
          comments: response.data.comments
      })
      this.handleToggle()
    })
  }

  handleDelete(id) {
      axios.delete(`https://sluggingdc.herokuapp.com/api/stations/${this.props.id}/comments/${id}`,
      ).then((response) => {
          this.setState({
            comments: response.data.comments
        })
        this.handleToggle()
      })
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

        const blank = (<div></div>)

        let viewComments= this.state.comments.map((comment, i)=>{
          return <div key={i}>
                    <div>{comment.content}({comment.name}) {comment.updatedAt} <button onClick={() => {this.handleToggle(i)}}>Edit</button></div>
                    {this.state.isEditing === i ? <CommentEdit
                                            onEdit = {this.handleEdit}
                                            onDelete = {this.handleDelete}
                                            comment= {comment}
                                            isUpdate={this.state.isUpdate}
                                         /> : blank}

                 </div>
        })

        return (
            <div className="commentWrapper">
                <h1>Comment</h1>
                <CommentCreate
                  onCreate = {this.handleCreate}
                />
                <div className="commentViewWrapper">
                {viewComments}
                </div>
            </div>
        );
    }
}

export default Comment;
