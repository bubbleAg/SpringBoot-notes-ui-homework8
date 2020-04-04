import React, { Component } from "react"
import NoteCard from "./NoteCard";

export default class NoteGrid extends Component {
    render() {
        const { notes } = this.props;

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