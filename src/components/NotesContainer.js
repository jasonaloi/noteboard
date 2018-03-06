import React, { Component } from 'react'
import Note from './Note'
import axios from 'axios'

class NotesContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      notes: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:4000/api/v1/notes.json')
    .then(response => {
      console.log(response)
      this.setState({notes: response.data})
    })
    .catch(error => console.log(error))
  }

  render() {
    return (
      <div>
        {this.state.notes.map((note) => {
          return (
            <Note note={note} key={note.id}/>
          )
        })}
      </div>
    );
  }
}

export default NotesContainer
