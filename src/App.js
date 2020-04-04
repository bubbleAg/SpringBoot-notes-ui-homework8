import React, { Component } from 'react';
import NoteAdd from './NoteAdd';
import NotesGrid from './NotesGrid';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.noteAdded = this.noteAdded.bind(this);
  }

  state = {
    notes: []
  }

  getAllNotes() {
    fetch('http://localhost:8080/notes')
      .then(response => response.json())
      .then(data => {
        if (data._embedded) {
          const notes = data._embedded.noteList.sort(this.sortByLastUpdateDateDesc);
          this.setState({ notes })
        }
      });
  }

  sortByLastUpdateDateDesc(a, b) {
    return a.lastUpdateDate < b.lasUpdateDate ? 1 : -1;
  }

  componentDidMount() {
    this.getAllNotes();
  }

  noteAdded(newNote) {
    this.getAllNotes();
  }

  render() {
    const { notes } = this.state;

    return (
      <div className="container my-3">
        <h1 align="center">Notes App</h1>
        <NoteAdd noteAdded={this.noteAdded} />
        <br /><br />
        <NotesGrid notes={notes} />
      </div>
    )
  }
}
