import React from 'react';
import { Avatar, Box, Button } from '@material-ui/core';
import AuthService from '../services/AuthService';
import axios from 'axios';
import { CONSTANTS } from '../Constants';
import authHeader from '../services/auth-header';


export const User = (props) => {
    
    const onFollowHandle = (e) => {
        axios.patch(`${CONSTANTS.URL}/user/${AuthService.currentUser()}/${props.user.id}`, {}, { headers: authHeader() }).then( response => {
            window.location.reload();
        })
    }
    
    
    return (
        <Box width="100%" display="flex">
            <Box my="auto"><Avatar alt="I" src={props.user.get_avatar} /></Box>
            <Box my="auto" ml={3}>
                <div style={{fontSize: "0.85rem"}}>{props.user.email}</div>
                <div style={{fontSize: "0.85rem"}}>{props.user.nickname}</div>
            </Box>
            <Box style={{marginLeft: "auto"}} my="auto">
                <Button onClick={onFollowHandle} style={{color: 'blue'}}>팔로우</Button>
            </Box>
        </Box>
    )
}