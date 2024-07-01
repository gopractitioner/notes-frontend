import React from 'react'

const Note = ({ note, toggleImportance }) => {
    const bt = note.important ? 'make not important' : 'make important'
    return (
        <div>
            <li className='note'>{note.content}</li>
            <button onClick={toggleImportance}>{bt}</button>
        </div>
    )
}

export default Note