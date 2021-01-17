import React from 'react'
import Note from '../Note/Note'
import Context from '../Context'
import { Link } from 'react-router-dom'
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary'
import './NoteList.css'

class NoteList extends React.Component {
    static contextType = Context;

    render() {
        const { notes } = this.context;
        const notesMap = notes.map(note => {
            return (
                <Note
                    key={note.id}
                    id={note.id}
                    name={note.name}
                    modified={note.modified}
                    folderId={note.folder_id}
                    content={note.content}
                    singleNote={note}
                />
            )
        });

        return (
            <div className='NoteList' >
                <ErrorBoundary>
                    {notesMap}
                </ErrorBoundary>
                <Link to={'/addNote'}>
                    <h3 className='add'>Add New Note</h3>
                </Link>
            </div>
        )
    }
}

export default NoteList;