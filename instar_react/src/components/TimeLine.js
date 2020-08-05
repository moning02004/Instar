import React from 'react';
import { Box } from '@material-ui/core';
import Profile from './Profile';
import ImgContent from './timeline/ImgContent';
import ImgHeart from './timeline/ImgHeart';
import ImgSlider from './timeline/ImgSlider';
import ImgCommentInput from './timeline/ImgCommentInput';
import ImgComment from './timeline/ImgComment';

const TimeLine = (props) => {
    return (
        <React.Fragment>
            <Box borderRadius={4} border={1} borderColor="rgb(228, 228, 228)" style={{backgroundColor: 'white'}}>
                <Profile user={{name: '유정훈', profilePic: 'logo192.png', userId: '1'}} position="post" />
                <ImgSlider />
                <ImgHeart hasHeart={true} />
                <ImgContent content="좋아요 좋아요" />
                <ImgComment />
                <ImgCommentInput />
            </Box>
        </React.Fragment>
    )
}

export default TimeLine;