import React from 'react';
import { AccountCircle, Favorite, Explore } from '@material-ui/icons';
import { IconButton } from '@material-ui/core';
import { BsChatDotsFill, BsBellFill } from "react-icons/bs";
import AuthService from '../services/AuthService';

const UserMenu = (props) => {
    const gotoProfile = (e) => {
        window.location.href = '/user/' + AuthService.currentUser();
    }
    return (
        <React.Fragment>
            <IconButton onClick={() => window.location.href = '/explorer'}><Explore /></IconButton>
            <IconButton onClick={() => window.location.href = '/heart'}><Favorite /></IconButton>
            <IconButton><BsChatDotsFill /></IconButton>
            <IconButton><BsBellFill /></IconButton>
            <IconButton onClick={gotoProfile}><AccountCircle /></IconButton>
        </React.Fragment>
    )
}

export default UserMenu;