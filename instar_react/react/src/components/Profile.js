import React from 'react';
import { Box, IconButton, Avatar } from '@material-ui/core';

function Profile(props) {
    const gotoProfile = (e) => {
        window.location.href = '/user/' + props.user.id;
    }
    return (
        <React.Fragment>
            <Box display='flex'>
                <IconButton style={{padding: '0.5rem'}} onClick={gotoProfile}>
                    <Avatar alt="" style={{border: '1px solid rgb(228, 228, 228)'}} src={
                        (props.user.avatar) ? props.user.get_avatar.image : process.env.PUBLIC_URL + '/avatar.png'
                    } />
                </IconButton>
                <Box my="auto" ml={2}>{props.user.nickname}</Box>
            </Box>
        </React.Fragment>
    )
}

export default Profile;