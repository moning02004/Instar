import React, { useEffect } from 'react';

import './DashBoard.css'
import ProfileBox from '../../components/ProfileBox';
import Post from '../../components/post/Post';
import { CONSTANTS } from '../../Constants';
import authHeader from '../../services/auth-header';
import AuthService from '../../services/AuthService';
import { Box } from '@material-ui/core';
import { CreateButton } from '../../components/CreateButton';

import axios from 'axios';
import { PostCreateDialog } from '../post/PostCreateDialog';

export const DashBoard = (props) => {
    let [postList, setPostList] = React.useState([]);
    let [open, setOpen] = React.useState(false);

    useEffect( () => {
        if (AuthService.isAuthenticated()) {
            axios.get(CONSTANTS.URL + '/post/', {headers: authHeader()}).then( response => {
                if (response.data.length !== 0) {
                    setPostList(response.data);
                }
            }).catch( error => {
            
            })
        }
    }, [props])
    return (
        <React.Fragment>
            <Box className="dashboard">
                <Box className="timeline">
                    <CreateButton onClick={() => setOpen(true)} />
                    {
                        postList.map( (post, key) => (
                            <Post key={key} post={post} />
                        ))
                    }
                </Box>
                <div className="profile">
                    <div><ProfileBox /></div>
                </div>
            </Box>
            <PostCreateDialog open={open} close={() => setOpen(false)}/>
        </React.Fragment>
    )
}