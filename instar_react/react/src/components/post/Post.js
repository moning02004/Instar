import React from 'react';
import { Box, Divider } from '@material-ui/core';
import {ImgContent} from './ImgContent';
import ImgHeart from './ImgHeart';
import ImgSlider from './ImgSlider';
import ImgCommentInput from './ImgCommentInput';
import ImgComment from './ImgComment';
import AuthService from '../../services/AuthService';
import { PostProfile } from './PostProfile';

const Post = (props) => {
    return (
        <React.Fragment>
            <Box borderRadius={4} border={1} borderColor="rgb(228, 228, 228)" style={{backgroundColor: 'white'}}>
                <PostProfile post={props.post} />
                <Divider />
                <ImgSlider images={props.post.image_set} />
                
                <Divider />
                <ImgHeart post={props.post} hasHeart={Array.from(props.post.heart_set).includes(AuthService.currentUser)} count={props.post.heart_set.length} />
                
                <ImgContent className="post-content" content={props.post.content} />

                <ImgComment className="overflow-scroll" length="2" />

                <Divider />
                <ImgCommentInput />
            </Box>
        </React.Fragment>
    )
}

export default Post;