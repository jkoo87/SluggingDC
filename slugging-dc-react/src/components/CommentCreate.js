import React, { Component } from 'react';


class CommentCreate extends Component {
  constructor(props){
    super(props)
    this.state = {
      name: '',
      content: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
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
      content: this.state.content
    }
    this.props.onCreate(comment)
    this.setState({
      name: '',
      content: ''
    })
    this.nameInput.focus()
  }
  handleKeyPress(e){
    if(e.charCode === 13){
      this.handleClick()
    }
  }

  render(){
    return(
      <form className="commentForm" onSubmit={this.handleSubmit}>
        <p>
        <input
          type="text"
          name='name'
          placeholder="Name"
          value={this.state.name}
          onChange={this.handleChange}
          ref = {(ref)=>{this.nameInput = ref}}
          required
        />
        </p>
        <p>
        <input
          type="text"
          name='content'
          placeholder="Say something..."
          value={this.state.content}
          onChange={this.handleChange}
          required
          />
          </p>
        <p><input type="submit" value="Post" /></p>
      </form>
    )
  }
}



export default CommentCreate
