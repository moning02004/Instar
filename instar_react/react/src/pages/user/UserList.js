import React, { useEffect } from 'react';
import { Box } from '@material-ui/core';
import { User } from '../../components/User';
import axios from 'axios';
import { CONSTANTS } from '../../Constants';
import authHeader from '../../services/auth-header';
import AuthService from '../../services/AuthService';

export const UserList = (props) => {
    let [userList, setUserList] = React.useState([]);
    useEffect( () => {
        axios.get(`${CONSTANTS.URL}/user/`, {headers: authHeader()}).then( response => {
            let currentUser = AuthService.currentUser();
            let array = [];

            Array.from(response.data).forEach( x => {
                if (!Array.from(x.follower).includes(currentUser)) {
                    array.push(x);
                }
            });
            setUserList(array);
        });
    }, []);

    return (
        <React.Fragment>
            { (userList) && 
                <React.Fragment>
                    <Box width="40%" mx="auto" pt={3}>
                        <h3>추천</h3>
                    </Box>
                    <Box width="40%" mx="auto" p={1} minHeight="35rem" style={{backgroundColor: 'white'}}>
                        { userList.map( (x, index) => (
                            <Box mb={1} key={index}>
                                <User user={x} />
                            </Box>
                        ))}
                    </Box>
                </React.Fragment>
            }
        </React.Fragment>
    )
}