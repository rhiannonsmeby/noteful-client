import React from 'react';
import { Link } from 'react-router-dom'
import NotefulContext from '../Context'
import './FolderList.css'

class FolderList extends React.Component {
    static contextType = NotefulContext;

    render() {
        const { folders } = this.context;
        const folderList = folders.map(folder => {
            return (
                <div className='folder' key={folder.id}>
                    <Link
                        to={`/folders/${folder.id}`}>{folder.folder_name}</Link>
                </div>
            )
        })
        return (
            <div className='SideBar'>
                {folderList}
                <div className='add'>
                    <Link to={'/addFolder'}>
                        <h3>Add New Folder</h3>
                    </Link>
                </div>
            </div>
        )
    }
}

export default FolderList;