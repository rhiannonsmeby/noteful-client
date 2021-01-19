import React from 'react';
import { Link } from 'react-router-dom'
import Note from '../Note/Note'
import Context from '../Context';
import PropTypes from 'prop-types'


class NoteStorageFolder extends React.Component {
    static contextType = Context;

    render() {
        const { notes } = this.context;
        console.log('notes data', notes)
        const filteredNotes = notes.filter(note => {
            console.log(typeof this.props.match.params.folderId, typeof note.folder_id)
            return note.folder_id === Number(this.props.match.params.folderId)
        })
        console.log('filtered notes', filteredNotes)
        const notesMap = filteredNotes.map(note => {
            return <Note
                key={note.id}
                id={note.id}
                name={note.name}
                modified={note.modified}
                folderId={note.folder_id}
                content={note.content}
            />
        });

        return (
            <div className='NoteList' >
                {notesMap}
                <Link
                    to={'/addNote'}>
                    <button>
                        Add New Note
                    </button>
                </Link>
            </div>
        )
    }
}

NoteStorageFolder.propTypes = {
    match: PropTypes.object
}

export default NoteStorageFolder;