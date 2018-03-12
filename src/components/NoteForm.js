import React, { Component } from 'react'
import axios from 'axios'

class NoteForm extends Component {

  constructor(props) {
    super(props)
    this.state = {
      title: this.props.note.title,
      note: this.props.note.note
    }
  }

  handleInput = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  handleBlur = (e) => {
    const note = {title: this.state.title, note:this.state.note}
    axios.put(`https://jboard-api.herokuapp.com/api/v1/notes/${this.props.note.id}`, {note: note})
    .then(response => {
      this.props.updateNote(response.data)
    })
    .catch(error => console.log(error))
  }

  render() {
    return (
      <div className="note form">
        <form onBlur={this.handleBlur}>
          <input type='text' name='title' value={this.state.title} onChange={this.handleInput} ref={this.props.titleRef}/>
          <textarea name='note' value={this.state.note} onChange={this.handleInput}></textarea>
        </form>
      </div>
    )
  }

}

export default NoteForm
