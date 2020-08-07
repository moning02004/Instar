import React from 'react';
import { Box } from '@material-ui/core';


function ImgContent(props) {
    
    console.log(props.content);
    const content = String(props.content);
    return (
        <React.Fragment>
            <Box height={props.height} px={3} pt={2}>
                <div className={props.className}>{content.toString()}</div> 
            </Box>
        </React.Fragment>
    )
}

export default ImgContent;