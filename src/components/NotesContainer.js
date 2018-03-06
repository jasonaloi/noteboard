import React, { Component } from 'react'
import Note from './Note'
import NoteForm from './NoteForm'
import axios from 'axios'
import update from 'immutability-helper'

class NotesContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      notes: [],
      currentNoteId: null
    }
  }

  componentDidMount() {
    axios.get('http://localhost:4000/api/v1/notes.json')
    .then(response => {
      this.setState({notes: response.data})
    })
    .catch(error => console.log(error))
  }

  addNewIdea = () => {
    axios.post('http://localhost:4000/api/v1/notes', {note: {title: "New Note", note: ""}})
    .then(response => {
      const notes = update(this.state.notes, { $splice: [[0, 0, response.data]]})
      this.setState({notes: notes, currentNoteId: response.data.id})
    })
    .catch(error => console.log(error))
  }

  render() {
    return (
      <div className="notesContainer">
        <div>
          <button onClick={this.addNewIdea}>
            New Note
          </button>
        </div>
        {this.state.notes.map((note) => {
          return (
            (note.id === this.state.currentNoteId) ? (<NoteForm note={note} key={note.id}/>) : (<Note note={note} key={note.id}/>)
          )
        })}
      </div>
    );
  }
}

export default NotesContainer
