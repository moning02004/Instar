import React from 'react';
import { Box } from '@material-ui/core';


function ImgContent(props) {
    const content = String(props.content);
    return (
        <Box width='100%' className="content-box">
            <Box height={props.height} p={3} pb={3}>
                <div className="pre-box overflow-scroll">{content}</div> 
            </Box>
        </Box>
    )
}

export default ImgContent;