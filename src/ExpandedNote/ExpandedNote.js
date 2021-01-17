import React from 'react'
import SingleNote from '../SingleNote/SingleNote'
import Context from '../Context'
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary'
import PropTypes from 'prop-types'

class ExpandedNote extends React.Component {
    static contextType = Context;

    handleDeleteNote = () => {
        this.props.history.push('/')
    }

    render() {
        const { notes } = this.context;
        const targetNote = notes.find(note => {
            return note.id === Number(this.props.match.params.noteId)
        }) || { id: '' }

        return (
            <div className='NoteList' >
                <SingleNote
                    key={targetNote.id}
                    id={targetNote.id}
                    name={targetNote.name}
                    modified={targetNote.modified}
                    folderId={targetNote.folder_id}
                    onDeleteNote={this.handleDeleteNote}
                />
                <ErrorBoundary>
                    <p>
                        {targetNote.content}
                    </p>
                </ErrorBoundary>
            </div>
        )
    }
}

ExpandedNote.propTypes = {
    history: PropTypes.object,
    match: PropTypes.object
}

export default ExpandedNote