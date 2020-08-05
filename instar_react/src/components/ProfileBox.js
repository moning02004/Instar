import React from 'react';
import {Box} from '@material-ui/core'
import Profile from './Profile';

const ProfileBox = (props) => {
    return (
        <Box width="70%" border={1} borderColor="rgb(228, 228, 228)" style={{backgroundColor: 'white'}} borderRadius={4}>
            <Box display="flex">
                <Profile user={{name: '유정훈', profilePic: 'logo192.png', userId: '1'}} />
            </Box>
        </Box>
    )
}

export default ProfileBox;