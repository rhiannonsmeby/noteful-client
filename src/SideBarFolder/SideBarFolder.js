import React from 'react';
import { NavLink, Link } from 'react-router-dom'
import Context from '../Context'
import './SideBarFolder.css';

class SelectedFolder extends React.Component {
    static contextType = Context;

    render() {
        const { folders } = this.context;
        const foldersMap = folders.map(folder => {
            return (
                <div className='folder' key={folder.id}>
                    <NavLink
                        activeClassName='selected'
                        to={`/folder/${folder.id}`}>{folder.folder_name}</NavLink>
                </div>
            )
        })
        return (
            <div className='SideBar'>
                {foldersMap}
                <div className='add'>
                    <Link
                        to={'/addFolder'}><h3>Add New Folder</h3></Link>
                </div>
            </div>
        )
    }
}

export default SelectedFolder;