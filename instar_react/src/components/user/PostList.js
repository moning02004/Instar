import React from 'react';
import { Box } from '@material-ui/core';

function PostList(props) {
    return (
        <React.Fragment>
            <Box className="user-posts">
                <img alt="사진" src={process.env.PUBLIC_URL + '/logo192.png'} />
                <img alt="사진" src={process.env.PUBLIC_URL + '/logo192.png'} />
                <img alt="사진" src={process.env.PUBLIC_URL + '/logo192.png'} />
                <img alt="사진" src={process.env.PUBLIC_URL + '/logo192.png'} />
                <img alt="사진" src={process.env.PUBLIC_URL + '/logo192.png'} />
                <img alt="사진" src={process.env.PUBLIC_URL + '/logo192.png'} />
                <img alt="사진" src={process.env.PUBLIC_URL + '/logo192.png'} />
                <img alt="사진" src={process.env.PUBLIC_URL + '/logo192.png'} />
                <img alt="사진" src={process.env.PUBLIC_URL + '/logo192.png'} />
                <img alt="사진" src={process.env.PUBLIC_URL + '/logo192.png'} />
                <img alt="사진" src={process.env.PUBLIC_URL + '/logo192.png'} />
                <img alt="사진" src={process.env.PUBLIC_URL + '/logo192.png'} />
                <img alt="사진" src={process.env.PUBLIC_URL + '/logo192.png'} />
            </Box>
        </React.Fragment>
    )
}

export default PostList;