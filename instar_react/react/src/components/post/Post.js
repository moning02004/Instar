import React from 'react';
import { Box, Divider } from '@material-ui/core';
import Profile from '../Profile';
import ImgContent from './ImgContent';
import ImgHeart from './ImgHeart';
import ImgSlider from './ImgSlider';
import ImgCommentInput from './ImgCommentInput';
import ImgComment from './ImgComment';
import AuthService from '../../services/AuthService';

const Post = (props) => {
    return (
        <React.Fragment>
            <Box borderRadius={4} border={1} borderColor="rgb(228, 228, 228)" style={{backgroundColor: 'white'}}>
                <Profile user={{
                        name: props.post.author.name, 
                        profilePic: props.post.author.get_avatar,
                        userId: props.post.author.id
                    }} position="post" post_id={props.post.id}/>
                
                <Divider />
                <ImgSlider images={props.post.image_set} />
                
                <Divider />
                <ImgHeart hasHeart={Array.from(props.post.heart_set).includes(AuthService.currentUser)} count={props.post.heart_set.length} />
                
                <ImgContent className="post-content" content={props.post.content} />

                <ImgComment />

                <Divider />
                <ImgCommentInput />
            </Box>
        </React.Fragment>
    )
}

export default Post;