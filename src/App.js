import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import ArchiveNotesGrid from './ArchivedNotesGrid';
import NoteEdit from './NoteEdit';
import NotesPage from './NotesPage';

export default class App extends Component {

  render() {

    return (
      <Router>
        <Switch>
          <Route path="/archived" component={ArchiveNotesGrid} />
          <Route path="/edit/:id" component={NoteEdit} />
          <Route path="" component={NotesPage} />
        </Switch>
      </Router>
    )
  }
}
