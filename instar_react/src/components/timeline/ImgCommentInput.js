import React from 'react';
import { Box } from '@material-ui/core';
import SendComment from '../SendComment';

function ImgCommentInput(props) {

    return (
        <React.Fragment>
            <Box display="flex">
                <input className="input-comment" placeholder="댓글 입력" />
                <div className="send-button"><SendComment /></div>
            </Box>
        </React.Fragment>
    )
}

export default ImgCommentInput;