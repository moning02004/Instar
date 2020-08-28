import React from 'react';
import { Box, Icon } from '@material-ui/core';
import { Favorite, FavoriteBorder } from '@material-ui/icons';
import { FaCommentDots } from 'react-icons/fa';
import axios from 'axios';
import authHeader from '../../services/auth-header';
import { CONSTANTS } from '../../Constants';
import AuthService from '../../services/AuthService';

function ImgHeart(props) {
    const heart = (e) => {
        e.preventDefault();
        axios.patch(`${CONSTANTS.URL}/post/${props.post.id}/heart`, {}, {
            headers: authHeader()
        }).then( response => {
            window.location.reload();
        })
    }

    return (
        <React.Fragment>
            <Box display='flex' p={1} pl={1}>
                <Icon className="cursor-pointer" style={{verticalAlign: 'middle', color: 'grey', }} onClick={heart}>
                    {
                        (Array.from(props.post.heart_set).includes(AuthService.currentUser())) 
                            ? <Favorite style={{color: 'rgb(50, 50, 250)'}} /> 
                            : <FavoriteBorder style={{color: 'rgb(50, 50, 50)'}} />
                    }
                </Icon><sup style={{marginRight: '1rem'}}>{props.post.heart_set.length}</sup>
                
                <Icon style={{verticalAlign: 'middle', color: 'grey'}}><FaCommentDots /></Icon><sup>12</sup>

                <Box color="rgb(108, 108, 108)" ml="auto">{props.post.week}</Box>
            </Box>
        </React.Fragment>
    )
}

export default ImgHeart;