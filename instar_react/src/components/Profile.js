import React from 'react';
import { Box, IconButton, Avatar } from '@material-ui/core';
import { MoreVert } from '@material-ui/icons';

function Profile(props) {
    const gotoPostDetail = (e) => {
        window.location.href = '/post/' + props.post_id;
    }
    const gotoProfile = (e) => {
        window.location.href = '/user/' + props.user.userId;
    }
    return (
        <Box display='flex'>
            <IconButton style={{padding: '0.5rem'}} onClick={gotoProfile}>
                <Avatar alt="정" style={{border: '1px solid rgb(228, 228, 228)'}} src={process.env.PUBLIC_URL + props.user.profilePic} />
            </IconButton>
            <Box my="auto" ml={2}>{props.user.name}</Box>
            {(props.position === 'post') && <Box my="auto" ml="auto"><IconButton onClick={gotoPostDetail}><MoreVert /></IconButton></Box>}
        </Box>
    )
}

export default Profile;