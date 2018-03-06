import React from 'react'

const Note = ({note}) =>
  <div className="note" key={note.id}>
    <h4>{note.title}</h4>
    <p>{note.note}</p>
  </div>

export default Note
