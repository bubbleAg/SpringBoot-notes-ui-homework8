import React, { Component } from "react";
import ArchivedNoteCard from './ArchivedNoteCard';
import {
  Link
} from "react-router-dom";

export default class ArchiveNotesGrid extends Component {

  constructor() {
    super();
    this.deleteNote = this.deleteNote.bind(this);
  }

  state = {
    archivedNotes: []
  }

  getArchivedNotes() {
    fetch('http://localhost:8080/notes/archived')
      .then(response => response.json())
      .then(data => {
        let archivedNotes = [];
        if (data._embedded) {
          archivedNotes = data._embedded.noteList.sort(this.sortByLastUpdateDateDesc);
        }
        this.setState({ archivedNotes });
      });
  }

  componentDidMount() {
    this.getArchivedNotes();
  }

  deleteNote(id) {
    console.log('Deleting note with id ' + id)
    fetch(`http://localhost:8080/notes/${id}`, {
      method: 'DELETE'
    }).then(() => this.getArchivedNotes())
  }

  render() {
    const { archivedNotes } = this.state;

    return (
      
      <div className="container my-3">
        <h1 align="center">Archived notes</h1>
        <Link className="my-3 btn btn-info" to="">Show active notes</Link>
        <div className="card-deck">
          {archivedNotes.map(archivedNote => <ArchivedNoteCard
            archivedNote={archivedNote}
            key={archivedNote.id}
            onDeleteNote={this.deleteNote}
          />
          )}
        </div>
      </div>
    )
  }
}