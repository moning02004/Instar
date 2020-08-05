import React from 'react';
import { Divider, Box, IconButton } from '@material-ui/core';
import { Favorite, FavoriteBorder } from '@material-ui/icons';
import { FaCommentDots } from 'react-icons/fa';

function ImgHeart(props) {

    return (
        <React.Fragment>
            <Divider />
            <Box display='flex' pl={1}>
                <div>
                    <IconButton>
                        {(props.hasHeart) ? <Favorite style={{color: 'rgb(50, 50, 250)'}} /> : <FavoriteBorder style={{color: 'rgb(50, 50, 50)'}} />}
                    </IconButton>
                    <IconButton><FaCommentDots /></IconButton>
                </div>
            </Box>
        </React.Fragment>
    )
}

export default ImgHeart;