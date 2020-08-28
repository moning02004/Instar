import React, { useEffect } from 'react';
import { Box, IconButton, Container, Button } from '@material-ui/core';
import { Favorite, Message, Image } from '@material-ui/icons';
import PostList from '../post/PostList';
import { CONSTANTS } from '../../Constants';
import { FiSettings, FiUserPlus } from "react-icons/fi";
import AuthService from '../../services/AuthService';
import authHeader from '../../services/auth-header';
import axios from 'axios';

const UserDetail = (props) => {
    let [user, setUser] = React.useState();

    useEffect( () => {
        axios.get(CONSTANTS.URL + '/user/' + props.match.params.id, { headers: authHeader() }).then( response => {
            console.log(response.data);
            setUser(response.data);
        })
    }, [props.match.params.id])

    const onFollowHandle = (e) => {
        axios.patch(`${CONSTANTS.URL}/user/${AuthService.currentUser()}/${props.match.params.id}`, {}, { headers: authHeader() }).then( response => {
            window.location.reload();
        })
    }
    return (
        <React.Fragment>
            {(user) && 
                <React.Fragment>
                    <Container >
                        <Box className="user-info">
                            <Box className="image">
                                <img alt="정" src={(user.get_avatar) ? user.get_avatar.image : process.env.PUBLIC_URL + '/avatar.png'} />
                            </Box>
                            <Box style={{width: '80%'}}>
                                <Box display="flex" my="auto" mb={1}>
                                    <div style={{fontSize: '2rem', marginRight: '1rem'}}>{user.name}</div>
                                    {(user.id !== AuthService.currentUser()) && (
                                        <Button onClick={onFollowHandle} onMouseMove={(e) => {}}>팔로우
                                            {(!Array.from(user.follower).includes(AuthService.currentUser()))
                                                ? <Box ml={0.5}>추가 <FiUserPlus /></Box>
                                                : <Box ml={0.5}>중</Box>
                                            }
                                        </Button>
                                        ) 
                                    }    
                                    <IconButton onClick={() => window.location.replace(`/user/${AuthService.currentUser()}/edit`)}><FiSettings /></IconButton>
                                </Box>
                                
                                <Box>
                                    <span style={{marginRight: '2rem'}}>게시물 {user.post_count}</span>
                                    <span style={{marginRight: '2rem'}}>팔로잉 {user.following.length}</span>
                                    <span>팔로워 {user.follower.length}</span>
                                </Box>

                                <Box my={3} height="6rem" className="overflow-scroll">
                                    <Box className="description">{user.description}</Box>
                                </Box>
                            </Box>
                        </Box>
                    </Container>

                    <Box className="posts-text">
                        <Box className="buttons">
                            <Button style={{marginRight: '2rem'}}><Image style={{color: 'rgb(108, 108, 108)'}} /></Button>
                            <Button  style={{marginRight: '2rem'}}><Message style={{color: 'rgb(108, 108, 108)'}} /></Button>
                            <Button><Favorite style={{color: 'rgb(208, 108, 108)'}} /></Button>
                        </Box>
                    </Box>
                    <Box>
                        <PostList userId={user.id}/>
                    </Box>
                </React.Fragment>
            }
        </React.Fragment>
    )
}

export default UserDetail