import React from 'react';
import { Box, IconButton, Avatar } from '@material-ui/core';
import { MoreVert } from '@material-ui/icons';

function Profile({user, position}) {
    return (
        <Box display='flex'>
            <IconButton style={{padding: '0.5rem'}}>
                <Avatar alt="정" style={{border: '1px solid rgb(228, 228, 228)'}} src={process.env.PUBLIC_URL + user.profilePic} />
            </IconButton>
            <Box my="auto" ml={2}>{user.name}</Box>
            {(position === 'post') && <Box my="auto" ml="auto"><IconButton><MoreVert /></IconButton></Box>}
        </Box>
    )
}

export default Profile;