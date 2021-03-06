import React, { useEffect } from 'react';
import { Box, Divider} from '@material-ui/core';
import ImgHeart from '../../components/post/ImgHeart';
import ImgComment from '../../components/post/ImgComment';
import ImgCommentInput from '../../components/post/ImgCommentInput';
import ImgSlider from '../../components/post/ImgSlider';
import { CONSTANTS } from '../../Constants';
import Axios from 'axios';
import { PostProfile } from '../../components/post/PostProfile';
import { ImgContent } from '../../components/post/ImgContent';
import PostList from './PostList';

function PostDetail(props) {
    let [post, setPost] = React.useState();
    console.log(props.user)
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
                            <Box display='flex' flexWrap="nowrap" minHeight="35rem">
                                <Box width='65%' style={{borderRight: '1px solid rgb(208, 208, 208)'}}>
                                    <ImgSlider images={post.image_set} />
                                </Box>

                                <Box width='35%' display="flex" flexWrap='wrap'>
                                    <Box mb="auto" width="100%">
                                        <PostProfile post={post} />
                                        <Divider />
                                        <ImgContent editMode={false} content={post.content} height="10rem" />
                                        <Divider />
                                        <Box mb="auto" width="100%">
                                            <ImgComment className="overflow-scroll" />
                                        </Box>
                                    </Box>

                                    <Box mt="auto" width='100%'>
                                        <Divider />
                                        <Box my="auto" ml="auto">
                                            <ImgHeart post={post} />
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