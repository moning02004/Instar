import React from 'react';
import { Divider, Box } from '@material-ui/core';
import SendComment from '../SendComment';

function ImgCommentInput(props) {

    return (
        <React.Fragment>
            <Divider />
            <Box height="3rem" display="flex">
                <input className="input-comment" placeholder="댓글 입력" />
                <div className="send-button"><SendComment /></div>
            </Box>
        </React.Fragment>
    )
}

export default ImgCommentInput;