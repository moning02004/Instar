import React from 'react';
import { AccountCircle, Favorite, Explore, Chat } from '@material-ui/icons';
import { IconButton } from '@material-ui/core';


const UserMenu = (props) => {
    return (
        <React.Fragment>
            <IconButton><Explore /></IconButton>
            <IconButton><Chat /></IconButton>
            <IconButton><Favorite /></IconButton>
            <IconButton><AccountCircle /></IconButton>
        </React.Fragment>
    )
}

export default UserMenu;