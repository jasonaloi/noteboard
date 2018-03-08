import React, { Component } from 'react'

class Note extends Component {
	handleClick = () => { this.props.onClick(this.props.note.id) }

	handleDelete = () => { this.props.onDelete(this.props.note.id) }

	render () {
		return(
		  <div className="note">
		  	<span className="deleteButton" onClick={this.handleDelete}>x</span>
		    <h4 onClick={this.handleClick}>{this.props.note.title}</h4>
		    <p onClick={this.handleClick}>{this.props.note.note}</p>
		  </div>
		)
	}
}

export default Note
