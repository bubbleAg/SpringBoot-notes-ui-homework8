import React, { Component } from "react"
import NoteCard from "./NoteCard";

export default class NoteGrid extends Component {

    constructor(props) {
        super(props);
        this.archiveNote = this.archiveNote.bind(this);
    }

    archiveNote(id) {
        console.log('Archiving note with id ' + id)
        fetch(`http://localhost:8080/notes/archive/${id}`, {
            method: 'PUT'
        }).then(() => this.props.noteUpdated())
    }

    render() {
        const { notes } = this.props;

        return (
            <div className="container">
                <div className="card-deck">
                    {notes.map(note => <NoteCard
                        note={note}
                        key={note.id}
                        onArchiveNote={this.archiveNote}
                    />
                    )}
                </div>
            </div>
        )
    }
}