import React, { Component } from 'react';


class CommentEdit extends Component {
  constructor(props){
    super(props)
    this.state = {
      name: this.props.comment.name,
      content: this.props.comment.content,
      commentId: this.props.comment._id,
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)
  }

  handleChange(e){
    let nextState= {}
    nextState[e.target.name] = e.target.value
    this.setState(nextState)
  }

  handleSubmit(e){
    e.preventDefault()
    const comment = {
      name: this.state.name,
      content: this.state.content,
      commentId: this.state.commentId
    }

    this.props.onEdit(comment)
    this.setState({
      name: comment.name,
      content: comment.content
    })
  }

  handleClick(){
    this.props.onDelete(this.state.commentId)
  }

  handleKeyPress(e){
    if(e.charCode === 13){
      this.handleClick()
    }
  }

  render(){

    return(
      <form className="commentForm" onSubmit={this.handleSubmit}>
        <input
          type="text"
          name='name'
          value={this.state.name}
          onChange={this.handleChange}
        />
        <input
          type="text"
          name='content'
          value={this.state.content}
          onChange={this.handleChange}
        />
        <input type="submit" value="Update" />
        <button onClick={this.handleClick}>Delete</button>
      </form>
    )
  }
}



export default CommentEdit
