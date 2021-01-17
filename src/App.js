import React from 'react'
import { Route, Switch, Link } from 'react-router-dom'
import FolderList from './FolderList/FolderList'
import SelectedFolder from './SideBarFolder/SideBarFolder'
import NoteList from './NoteList/NoteList'
import NoteStorageFolder from './NoteStorageFolder/NoteStorageFolder'
import ExpandedNote from './ExpandedNote/ExpandedNote'
import NotefulContext from './Context'
import AddFolder from './AddFolder/AddFolder'
import AddNote from './AddNote/AddNote'
import './App.css'
import NoteLocation from './NoteLocation/NoteLocation'

class App extends React.Component {
    state = {
        notes: [],
        folders: []
    }

    getFolderData() {
        fetch(`http://localhost:8000/api/folders`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Something went wrong')
                }
                return response.json()
            })
            .then(data => {
                this.setState({
                    folders: data
                })
            })
            .catch(err => {
                console.log(err)
            })
    }

    getNoteData() {
        fetch(`http://localhost:8000/api/notes`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Something went wrong')
                }
                return response.json()
            })
            .then(data => {
                this.setState({
                    notes: data
                })
            })
            .catch(err => {
                alert(err);
            })
    }

    deleteItem = (noteId) => {
        const filterState = this.state.notes.filter(note => {
            return note.id !== noteId;
        })

        this.setState({
            notes: filterState
        })
    }

    addFolder = (newFolder) => {
        const addState = [...this.state.folders, newFolder];
        this.setState({ folders: addState })
    }

    addNote = (newNote) => {
        const addNote = [...this.state.notes, newNote]
        this.setState({ notes: addNote })
    }

    componentDidMount() {
        this.getFolderData();
        this.getNoteData();
    }

    render() {
        const contextValue = {
            notes: this.state.notes,
            folders: this.state.folders,
            deleteItem: this.deleteItem,
            addFolder: this.addFolder,
            addNote: this.addNote
        }
        return (
            <div className='App'>
                <header>
                  <h1><Link to={`/`}>Noteful</Link></h1>
                </header>
                <div className='noteful'>
                <NotefulContext.Provider
                    value={contextValue}>
                    <div className='flex-one'>
                        <Route exact path='/'
                            component={FolderList}
                        />
                        <Route path='/folder/:folderId'
                            component={SelectedFolder}
                        />
                        <Route path='/note/:noteId'
                            component={NoteLocation}
                        />
                    </div>
                    <div className='flex-three'>
                        <Switch>
                            <Route exact path='/'
                                component={NoteList}
                            />
                            <Route path='/folder/:folderId'
                                component={NoteStorageFolder}
                            />
                            <Route path='/note/:noteId'
                                component={ExpandedNote}
                            />
                            <Route path='/addFolder'
                                component={AddFolder} />
                            <Route path='/addNote'
                                component={AddNote} />
                        </Switch>
                    </div>
                </NotefulContext.Provider>
                </div>
            </div>
        )
    }
}

export default App