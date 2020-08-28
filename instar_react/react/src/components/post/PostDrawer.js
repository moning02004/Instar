import React from 'react';
import { Drawer, List, ListItem, Typography, ListItemText } from "@material-ui/core"
import AuthService from '../../services/AuthService';
import axios from 'axios';
import { CONSTANTS } from '../../Constants';
import authHeader from '../../services/auth-header';

export const PostDrawer = (props) => {
    const toggleDrawer = (open) => (e) => {
        props.setOpen(open)
    }
    const cancelFollow = (author_id) => {
        axios.patch(`${CONSTANTS.URL}/user/${AuthService.currentUser()}/${author_id}`, {}, { headers: authHeader() }).then( response => {
            window.location.reload();
        })
    }
    const deletePost = (e) => {
        axios.delete(`${CONSTANTS.URL}/post/${props.post.id}`, { headers: authHeader() }).then( response => {
            window.location.replace('/');
        })
    }
    return (
        <Drawer anchor="right" open={props.open} onClose={toggleDrawer(false)} style={{zIndex: '99999999999'}}>
            <div style={{minWidth: '15rem'}} onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
                <List>
                    {
                       (props.post.author.id !== AuthService.currentUser()) && 
                            <ListItem button onClick={(e) => cancelFollow(props.post.author.id)}><ListItemText primary={
                                <Typography variant="body1" style={{color: 'red'}}><b>팔로우 취소</b></Typography>} /></ListItem>
                    }
                    
                    <ListItem button onClick={(e) => window.location.href = `/post/${props.post.id}`}><ListItemText primary={
                        <Typography variant="body1"><b>게시물로 이동</b></Typography>} /></ListItem>
                                    
                    {
                        (props.post.author.id === AuthService.currentUser()) && 
                            <React.Fragment>
                                <ListItem button onClick={(e) => window.location.href = `/post/${props.post.id}/edit`}><ListItemText primary={
                                    <Typography variant="body1"><b>게시물 수정</b></Typography>} /></ListItem>

                                <ListItem button onClick={deletePost}><ListItemText primary={
                                    <Typography variant="body1" style={{color: 'red'}}><b>게시물 삭제</b></Typography>} /></ListItem>

                            </React.Fragment>

                    }
                    
                </List>
            </div>
        </Drawer>
    )
}