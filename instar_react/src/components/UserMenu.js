import React from 'react';
import { AccountCircle, Favorite, Explore } from '@material-ui/icons';
import { IconButton } from '@material-ui/core';
import { BsChatDotsFill, BsBellFill } from "react-icons/bs";


const UserMenu = (props) => {
    const gotoProfile = (e) => {
        window.location.href = '/user/' + 1;
    }
    return (
        <React.Fragment>
            <IconButton onClick={() => window.location.href = '/explorer'}><Explore /></IconButton>
            <IconButton><Favorite /></IconButton>
            <IconButton><BsChatDotsFill /></IconButton>
            <IconButton><BsBellFill /></IconButton>
            <IconButton onClick={gotoProfile}><AccountCircle /></IconButton>
        </React.Fragment>
    )
}

export default UserMenu;