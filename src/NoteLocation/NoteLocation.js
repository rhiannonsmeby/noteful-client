import React from 'react'
import Context from '../Context'
import PropTypes from 'prop-types'

class NoteLocation extends React.Component {
    static contextType = Context;

    render() {
        const { folders, notes } = this.context;
        const targetNote = notes.find(note => {
            return note.id === this.props.match.params.noteId;
        }) || { folderId: Number(this.props.match.params.noteId) }
        const targetFolder = folders.find(folder => {
            return folder.id === targetNote.folderId
        }) || { name: '' }

        return (
            <div className='SideBar'>
                <button className='back-button' onClick={() => this.props.history.goBack()}>
                    Go back
                </button>
                <div className='location'>
                    <p>
                        You are currently in the {targetFolder.folder_name} folder!
                    </p>
                </div>
            </div>
        )
    }
}

NoteLocation.propTypes = {
    history: PropTypes.object,
    match: PropTypes.object
}

export default NoteLocation