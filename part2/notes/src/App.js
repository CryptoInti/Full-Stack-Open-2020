import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Note from './components/Note'
import Notification from './components/Notification'
import noteService from './services/notes'

const Footer = () => {
  const footerStyle = {
    color: 'green',
    fontStyle: 'italic',
    fontSize: 16
  }

  return (
    <div style={footerStyle}>
      <br></br>
      <em>Note app, to keep learning, thanks DofCS, University of Helsinki</em>
    </div>
  )
}

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => {
        console.log('initialNotes', initialNotes)
        setNotes(initialNotes)
        console.log('Notes', notes)
      })
  }, [])
  
  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() > 0.5,
      id: notes.length + 1,
    }
    noteService
      .create(noteObject)
        .then(r => {
          console.log('resp', r)
          setNotes(notes.concat(r))
          setNewNote('')
        })
  }

  const toggleImportanceOf = id => {
    console.log('id', id)
    const url = `http://localhost:3001/notes/'${id}`
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }
    // console.log('importance of '+id+' needs to be toggled')

    noteService
      .update(id, changedNote)
      .then(r => {
        setNotes(notes.map(n => n.id !== id ? n : r))
      })
      .catch(error => {
        setErrorMessage(
          `Note '${note.content}' was already removed from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }

  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important)

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all' }
        </button>
      </div>

      <ul>
        {notesToShow.map((note, i) => 
          <Note 
            key={i} 
            note={note} 
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        )}
      </ul>

      <form onSubmit={addNote}>
        <input 
          value={newNote}
          onChange={handleNoteChange} 
        />
        <button type="submit">Save</button>
      </form>

      <Footer />
    </div>
  )
}

export default App