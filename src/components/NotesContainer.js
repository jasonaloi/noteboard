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

  addNewNote = () => {
    axios.post('http://localhost:4000/api/v1/notes', {note: {title: "New Note", note: ""}})
    .then(response => {
      const notes = update(this.state.notes, { $splice: [[0, 0, response.data]]})
      this.setState({notes: notes, currentNoteId: response.data.id})
    })
    .catch(error => console.log(error))
  }

  updateNote = (note) => {
    const noteIndex = this.state.notes.findIndex(x => x.id === note.id)
    const notes = update(this.state.notes, {[noteIndex]: { $set: note }})
    this.setState({notes: notes})
    this.state.currentNoteId = null
  }

  deleteNote = (id) => {
    axios.delete(`http://localhost:4000/api/v1/notes/${id}`)
    .then(response => {
      const noteIndex = this.state.notes.findIndex(x => x.id === id)
      const notes = update(this.state.notes, { $splice: [[noteIndex, 1]]})
      this.setState({notes: notes})
    })
    .catch(error => console.log(error))
  }

  enableEditing = (id) => {
    this.setState({currentNoteId: id}, () => { this.title.focus() })
  }

  render() {
    return (
      <div className="notesContainer">
        <div>
          <button onClick={this.addNewNote}>
            New Note
          </button>
        </div>
        {this.state.notes.map((note) => {
          return (
            (this.state.currentNoteId === note.id) ? (<NoteForm note={note} key={note.id} updateNote={this.updateNote} titleRef= {input => this.title = input}/>) : (<Note note={note} key={note.id} onClick={this.enableEditing} onDelete={this.deleteNote}/>)
          )
        })}
      </div>
    );
  }
}

export default NotesContainer
