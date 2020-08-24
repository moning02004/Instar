import React from 'react';
import { Box, Icon } from '@material-ui/core';
import { Favorite, FavoriteBorder } from '@material-ui/icons';
import { FaCommentDots } from 'react-icons/fa';

function ImgHeart(props) {

    return (
        <React.Fragment>
            <Box display='flex' p={1} pl={1}>
                <div>
                    <Icon className="cursor-pointer" style={{verticalAlign: 'middle', color: 'grey', }}>
                        {(props.hasHeart) ? <Favorite style={{color: 'rgb(50, 50, 250)'}} /> : <FavoriteBorder style={{color: 'rgb(50, 50, 50)'}} />}
                    </Icon><sup style={{marginRight: '1rem'}}>{props.count}</sup>
                    <Icon style={{verticalAlign: 'middle', color: 'grey'}}><FaCommentDots /></Icon><sup>12</sup>
                </div>
                <Box  color="rgb(108, 108, 108)" ml="auto">2020. 08. 08. 14:00</Box>

            </Box>
        </React.Fragment>
    )
}

export default ImgHeart;