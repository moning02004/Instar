import React, { useEffect } from 'react';
import { Box } from '@material-ui/core';
import axios from 'axios';
import { CONSTANTS } from '../../Constants';
import authHeader from '../../services/auth-header';
import { BsFiles } from "react-icons/bs";


function PostList(props) {
    let [posts, setPosts] = React.useState([]);

    useEffect( () => {
        if (props.userId) {
            axios.get(CONSTANTS.URL + '/user/' + props.userId +'/posts', {
                headers: authHeader()
            }).then( response => {
                setPosts(response.data);
            })
        } else {
            axios.get(CONSTANTS.URL + '/post/', {
                headers: authHeader(),
                params: {
                    type: props.type
                }
            }).then( response => {
                setPosts(response.data);
            });
        }
    }, [props.userId, props.type])

    const gotoPostDetail = (e) => {
        window.location.href = '/post/' + e.currentTarget.id;
    }
    return (
        <React.Fragment>
            { (posts) && 
                <Box className="user-posts">
                    {posts.map( (x, index) => {
                        return (
                            <Box className="image" key={index} id={x.id} onClick={gotoPostDetail}>
                                <img alt="사진" src={x.image_set[0].file} width="100%" />
                                <i className="icon"><BsFiles /></i>
                            </Box>
                        )
                    })}
                </Box>
            }
        </React.Fragment>
    )
}

export default PostList;