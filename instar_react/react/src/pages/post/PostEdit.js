import React, { useEffect } from 'react';
import { Box, Divider } from '@material-ui/core';
import ImgSlider from '../../components/post/ImgSlider';
import { CONSTANTS } from '../../Constants';
import axios from 'axios';
import authHeader from '../../services/auth-header';
import { PostProfile } from '../../components/post/PostProfile';
import { ImgContent } from '../../components/post/ImgContent';

export function PostEdit(props) {
    let [post, setPost] = React.useState();

    useEffect( () => {
        axios.get(CONSTANTS.URL + '/post/' + props.match.params.id, {headers: authHeader()}).then( response => {
            setPost(response.data);
        }).catch( error => {
            alert('잘못된 URL 입니다.')
            window.location.replace('/')
        });
    }, [props.match.params.id]);
    
    const onSubmit = (content) => {
        axios.patch(`${CONSTANTS.URL}/post/${post.id}`, {
            content: content
        }, {headers: authHeader()}).then( response => {
            if (response.status === 200) {
                window.location.replace(`/post/${props.match.params.id}`);
            }
        }).catch ( error => {
            
        })
    }
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
                                    </Box>
                                    <Box width="100%">
                                        <ImgContent editMode={true} content={post.content} height="auto" onSubmit={onSubmit} />
                                    </Box>
                                </Box>
                            </Box>
                            <Divider />

                        </Box>
                    </Box>

                </React.Fragment>
            }
        </React.Fragment>
    )
}