import React from 'react';
import { Box, IconButton, Container, Button } from '@material-ui/core';
import { Settings, Favorite, Message, Image } from '@material-ui/icons';
import PostList from '../../components/user/PostList';

const UserDetail = (props) => {
    let panel = <PostList />
    return (
        <React.Fragment>
            <Container style={{marginTop: '5rem'}} >
                <Box className="user-info">
                    <Box className="image"><img alt="정" src={process.env.PUBLIC_URL + '/logo192.png'} /></Box>
                    <Box style={{width: '80%'}}>
                        <Box display="flex" my="auto" mb={1}>
                            <div style={{fontSize: '2rem'}}>유정훈</div>
                            <IconButton><Settings /></IconButton>
                        </Box>
                        
                        <Box>
                            <span style={{marginRight: '2rem'}}>게시물 4</span>
                            <span style={{marginRight: '2rem'}}>팔로잉 4</span>
                            <span>팔로워 4</span>
                        </Box>

                        <Box mt={3}>
                            <p>안녕하세요</p>
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
                {panel}
            </Box>
        </React.Fragment>
    )
}

export default UserDetail