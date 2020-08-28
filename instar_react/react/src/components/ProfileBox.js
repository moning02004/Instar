import React, { useEffect } from 'react';
import {Box, Button} from '@material-ui/core'
import Profile from './Profile';
import AuthService from '../services/AuthService';
import axios from 'axios';
import { CONSTANTS } from '../Constants';
import authHeader from '../services/auth-header';


const ProfileBox = (props) => {
    let [user, setUser] = React.useState();

    useEffect( () => {
        axios.get(`${CONSTANTS.URL}/user/${AuthService.currentUser()}`, { headers: authHeader() }).then( response => {
            setUser(response.data);
        }).catch( error => {
        })
    }, [])
    return (
        <React.Fragment>
            { (user) && 
                <React.Fragment>
                    <Box width="70%" border={1} borderColor="rgb(228, 228, 228)" style={{backgroundColor: 'white'}} borderRadius={4}>
                        <Box display="flex">
                            <Profile user={user} />
                        </Box>
                    </Box>

                    <Box mt={3} display="flex" width="70%">
                        <Box my="auto">{user.name}님을 위한 추천</Box>
                        <Box my="auto" ml="auto"><Button onClick={() => window.location.href = '/user'} style={{color: 'blue'}}>모두 보기</Button></Box>
                    </Box>
                </React.Fragment>
            }
        </React.Fragment>
    )
}

export default ProfileBox;