import React, { Component } from "react"
import {
  Link,
  Redirect
} from "react-router-dom";

export default class NoteEdit extends Component {

  constructor() {
    super();
    this.onSubmit = this.onSubmit.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
  }

  state = {
    redirect: false,
    isLoaded: false,
    note: {}
  }

  getNoteById(id) {
    fetch(`http://localhost:8080/notes/${id}`)
      .then(response => response.json())
      .then(data => {
        this.setState({ note: data, isLoaded: true })
      });
  }

  updateNote(id) {
    fetch(`http://localhost:8080/notes/${id}`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state.note)
    }).then(r => {
      if (r.ok) {
        alert('success :)');
        this.setState({ redirect: true })
        return;
      }

      alert('Failed to update note');
    });
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.getNoteById(id);
  }

  onSubmit(e) {
    const { id } = this.props.match.params;
    e.preventDefault();
    this.updateNote(id);
  }

  onInputChange({ target }) {
    const { value, name } = target;
    const note = { ...this.state.note, [name]: value }

    this.setState({ note });
  }

  render() {
    const { isLoaded, note, redirect } = this.state;
    return (
      <div className="container my-3">
        <Link className="my-3 btn btn-info" to="">Show active notes</Link>
        {isLoaded && <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              name="title"
              id="inputNoteTile"
              value={note.title}
              onChange={this.onInputChange}
            />
            <br />
            <textarea
              className="form-control"
              name="text"
              id="exampleFormControlTextarea1"
              rows="3"
              value={note.text}
              onChange={this.onInputChange}
            />
            <br />
            <button className="btn btn-info">Update note</button>
          </div>
        </form>
        }
        {isLoaded || <p>Loading note...</p>}
        {redirect && <Redirect
          to={{
            pathname: "",
          }}
        />
        }
      </div>
    )
  }
}