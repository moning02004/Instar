import React, { useEffect } from 'react';
import {Box} from '@material-ui/core'
import Profile from './Profile';
import AuthService from '../services/AuthService';
import axios from 'axios';
import { CONSTANTS } from '../Constants';
import authHeader from '../services/auth-header';


const ProfileBox = (props) => {
    let [user, setUser] = React.useState(null);

    useEffect( () => {
        axios.get(CONSTANTS.URL + '/user/' + AuthService.currentUser(), { headers: authHeader() }).then( response => {
            setUser(response.data);
        }).catch( error => {
            window.location.replace('/login');
        })
    }, [])
    return (
        <Box width="70%" border={1} borderColor="rgb(228, 228, 228)" style={{backgroundColor: 'white'}} borderRadius={4}>
            { (user) && 
                <Box display="flex">
                    <Profile user={{
                        name: user.name, avatar: user.get_avatar || process.env.PUBLIC_URL + '/avatar.png', userId: user.id}} />
                </Box>
            }
        </Box>
    )
}

export default ProfileBox;