import { useState, useEffect } from 'react'
import Note from './components/Note'
import noteService from './services/noteService'
import Notification from './components/Notification'
const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')
  const [normalMessage, setNormalMessage] = useState('No message...')
  const [infoFlag, setInfoFlag] = useState(true)

  useEffect(() => {
    console.log('effect')
    noteService.getAll()
      //.get('http://localhost:3001/notes')
      .then(initialNotes => {
        setNotes(initialNotes)
      })
  }, [])
  //console.log('render', notes.length, 'notes')


  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      important: Math.random() > 0.5,
      date: new Date()
    }
    noteService.create(noteObject)
      //axios.post('http://localhost:3001/notes', noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
        setNormalMessage(`a new note '${newNote}' added`)
        setTimeout(() => {
          setNormalMessage('No message...')
          console.log('done...')
        }, 5000)
        setNewNote('')
      })
  }

  const handleNoteChange = (event) => {
    setNewNote(event.target.value)
  }

  const toggleImportanceOf = (id) => {
    const note = notes.find(note => note.id === id)
    const changedNote = { ...note, important: !note.important }
    console.log('changedNote:', changedNote)
    noteService.update(id, changedNote)
      //axios.put(url, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => note.id !== id ? note : returnedNote))
      })
      .catch(error => {
        // alert(
        //   `the note '${note.content}' was already deleted from server`
        // )
        setErrorMessage(
          `Note '${note.content}' was already removed from server`
        )
        setInfoFlag(false)
        setTimeout(() => {
          setErrorMessage(null)
          setInfoFlag(true)
        }, 5000)
        setNotes(notes.filter(n => n.id !== id))
      })
  }

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important)

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={infoFlag ? normalMessage : errorMessage} infoFlag={infoFlag} />
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>

      {/* <ul>
        <ul>
          {notesToShow.map(note =>
            <Note key={note.id} note={note} toggleImportance={() => toggleImportanceOf(note.id)} />
          )}
        </ul>
      </ul> */}

      <ul>
        <ul>
          {notesToShow.map(note =>
            <Note
              key={note.id}
              note={note}
              toggleImportance={() => toggleImportanceOf(note.id)}
            />
          )}
        </ul>
      </ul>


      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">save</button>
      </form>
    </div>
  )
}
export default App