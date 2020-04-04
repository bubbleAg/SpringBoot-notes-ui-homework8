import React, { Component } from 'react';
import NoteAdd from './NoteAdd';
import NotesGrid from './NotesGrid';

export default class App extends Component {
  render() {
    return (
      <div className="container my-3">
        <h1 align="center">Notes App</h1>
        <NoteAdd />
        <br /><br />
        <NotesGrid />
      </div>
    )
  }
}
