import React, { Component } from 'react';
import NoteAdd from './NoteAdd';
import NotesGrid from './NotesGrid';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import ArchiveNotesGrid from './ArchivedNotesGrid';
import NoteEdit from './NoteEdit';

export default class NotesPage extends Component {

  constructor(props) {
    super(props);
    this.noteUpdated = this.noteUpdated.bind(this);
  }

  state = {
    notes: []
  }

  getAllNotes() {
    fetch('http://localhost:8080/notes')
      .then(response => response.json())
      .then(data => {
        let notes = [];
        if (data._embedded) {
          notes = data._embedded.noteList.sort(this.sortByLastUpdateDateDesc);
        }
        this.setState({ notes });
      });
  }

  sortByLastUpdateDateDesc(a, b) {
    return a.lastUpdateDate < b.lasUpdateDate ? 1 : -1;
  }

  componentDidMount() {
    console.log("getting all notes");
    this.getAllNotes();
  }

  noteUpdated() {
    this.getAllNotes();
  }

  render() {
    const { notes } = this.state;

    return (
      <div className="container my-3">
        <h1 align="center">Notes App</h1>
        <NoteAdd noteUpdated={this.noteUpdated} />
        <div className="container my-3">
          <Link className="btn btn-info" to="/archived" style={{ float: 'right' }}>
            Show archived notes
          </Link>
        </div>
        <br /><br /><br />
        <NotesGrid notes={notes} noteUpdated={this.noteUpdated} />
      </div>
    )
  }
}
