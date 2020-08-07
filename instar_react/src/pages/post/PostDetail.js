import React from 'react';
import { Box, Divider, Container } from '@material-ui/core';
import Profile from '../../components/Profile';
import ImgSlider from '../../components/timeline/ImgSlider';
import ImgHeart from '../../components/timeline/ImgHeart';
import ImgContent from '../../components/timeline/ImgContent';
import ImgComment from '../../components/timeline/ImgComment';
import ImgCommentInput from '../../components/timeline/ImgCommentInput';

function PostDetail(props) {
    return (
        <React.Fragment>
            <Container style={{marginTop: '5rem'}}>
                <Box className="post-detail">
                    <Box className="image-slider">
                        <ImgSlider height="30rem" />
                    </Box>
                    
                    <Box className="image-content">
                        <Box display="flex" flexWrap="wrap" height="100%">
                            <Box width="100%" className="content-profile">
                                <Profile user={{name: '유정훈', profilePic: 'logo192.png', userId: '1'}} position="post" />
                                <Divider />
                            </Box>

                            <Box width="100%" flexGrow={1}>                        
                                <ImgContent className="pre-box" content="안녕하세요\n예시입니다." />
                            </Box>
                            <Box width="100%" flexGrow={1}>                        
                                <ImgComment />
                            </Box>

                            <Box width="100%" mt="auto">
                                <Divider />
                                <ImgHeart hasHeart={true} />
                                <Divider />
                                <ImgCommentInput />
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Container>
            
            <Box className="posts-text" borderTop="0">다른 게시물</Box>

            <Container>
            </Container>
        </React.Fragment>
    )
}

export default PostDetail;