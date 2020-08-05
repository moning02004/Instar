import React from 'react';
import { Box, Divider } from '@material-ui/core';


function ImgContent(props) {
    return (
        <React.Fragment>
            <Divider />
            <Box className="image-content" px={3} pt={2}>
                <div>{props.content}</div>
            </Box>
        </React.Fragment>
    )
}

export default ImgContent;