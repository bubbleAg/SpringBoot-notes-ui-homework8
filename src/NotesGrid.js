import React, { Component } from "react"
import NoteCard from "./NoteCard";

export default class NoteGrid extends Component {

    state = {
        notes: []
    }

    getAllNotes() {
        fetch('http://localhost:8080/notes')
            .then(response => response.json())
            .then(data => {
                if (data._embedded) {
                    this.setState({ notes: data._embedded.noteList })
                }
            });
    }

    componentDidMount() {
        this.getAllNotes();
    }

    render() {
        const { notes } = this.state;
        return (
            <div className="container">
                <div className="card-deck">
                    {notes.map(note => <NoteCard
                        note={note}
                        key={note.id}
                    />
                    )}
                </div>
            </div>
        )
    }
}