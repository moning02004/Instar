import React, { useEffect } from 'react';
import { Box, Divider } from '@material-ui/core';
import Profile from '../../components/Profile';
import ImgHeart from '../../components/timeline/ImgHeart';
import ImgContent from '../../components/timeline/ImgContent';
import ImgComment from '../../components/timeline/ImgComment';
import ImgCommentInput from '../../components/timeline/ImgCommentInput';
import ImgSlider from '../../components/timeline/ImgSlider';
import { CONSTANTS } from '../../Constants';
import Axios from 'axios';
import AuthService from '../../services/AuthService';
import PostList from '../../components/PostList';

function PostDetail(props) {
    let [post, setPost] = React.useState();

    useEffect( () => {
        Axios.get(CONSTANTS.URL + '/post/' + props.match.params.id).then( response => {
            setPost(response.data);
        }).catch( error => {
        });
    }, [props.match.params.id]);

    return (
        <React.Fragment>
            { (post) && 
                <React.Fragment>
                    <Box className="post-detail">
                        <Box borderRadius={4} border={1} borderColor="rgb(228, 228, 228)" style={{backgroundColor: 'white'}}>
                            <Box display='flex' flexWrap="nowrap" minHeight="40rem">
                                
                                <Box width='65%' style={{borderRight: '1px solid rgb(208, 208, 208)'}}>
                                    <ImgSlider images={post.image_set} />
                                    <Divider />
                                    <Box display="flex" width="100%" flexWrap="wrap" minHeight="10rem">
                                        <Profile user={{
                                            name: post.author.name,
                                            profilePic: post.author.get_avatar,
                                            userId: post.author.id
                                            }} post_id={post.id}/>
                                        <ImgContent content={post.content} />
                                    </Box>
                                </Box>

                                <Box width='35%' display="flex" flexWrap='wrap'>
                                    <ImgComment width='100%' />
                                    <Box mt="auto" width='100%'>
                                        <Divider />
                                        <Box my="auto" ml="auto">
                                            <ImgHeart hasHeart={Array.from(post.heart_set).includes(AuthService.currentUser)} count={post.heart_set.length} />
                                        </Box>
                                        <Divider />
                                        <ImgCommentInput />
                                    </Box>
                                </Box>
                            </Box>
                            <Divider />

                        </Box>
                    </Box>

                    <Box>
                        <PostList userId={post.author.id}/>
                    </Box>
                </React.Fragment>
            }
        </React.Fragment>
    )
}

export default PostDetail;