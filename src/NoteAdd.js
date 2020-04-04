import React, { Component } from 'react';

export default class NoteAdd extends Component {

    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
    }

    state = {
        note: {
            title: '',
            text: '',
        },
    }

    addNewNote() {
        fetch(`http://localhost:8080/notes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state.note)
        }).then(r => {
            if (r.ok === false) {
                r.json().then(r => alert(r.message));
                return;
            }

            this.props.noteAdded()

            this.setState({
                note: {
                    title: '',
                    text: '',
                }
            });
        })
    }

    onInputChange({ target }) {
        const { name, value } = target;
        const note = { ...this.state.note, [name]: value };
        this.setState({ note });
    }

    onSubmit(e) {
        e.preventDefault();
        this.addNewNote();

    }

    render() {
        return (
            <div className="container my-3">
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            name="title"
                            id="inputNoteTile"
                            placeholder="Title"
                            value={this.state.note.title}
                            onChange={this.onInputChange}
                        />
                        <br />
                        <textarea
                            className="form-control"
                            name="text"
                            id="exampleFormControlTextarea1"
                            rows="3"
                            placeholder="Enter your note here..."
                            value={this.state.note.text}
                            onChange={this.onInputChange}
                        />
                        <br />
                        <button className="btn btn-info">Add note</button>
                    </div>
                </form>
            </div>
        )
    }
}