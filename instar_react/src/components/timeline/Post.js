import React from 'react';
import { Box, Divider } from '@material-ui/core';
import Profile from '../Profile';
import ImgContent from './ImgContent';
import ImgHeart from './ImgHeart';
import ImgSlider from './ImgSlider';
import ImgCommentInput from './ImgCommentInput';
import ImgComment from './ImgComment';

const Post = (props) => {
    console.log(props);
    return (
        <React.Fragment>
            <Box borderRadius={4} border={1} borderColor="rgb(228, 228, 228)" style={{backgroundColor: 'white'}}>
                <Profile user={{name: '유정훈', profilePic: 'logo192.png', userId: '1'}} position="post" post_id={props.post.id}/>
                
                <Divider />
                <ImgSlider />
                
                <Divider />
                <ImgHeart hasHeart={true} />
                
                <Divider />
                <ImgContent className="post-content" content={props.post.content} />
                
                <ImgComment />

                <Divider />
                <ImgCommentInput />
            </Box>
        </React.Fragment>
    )
}

export default Post;