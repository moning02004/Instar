import React from 'react';
import { Box } from '@material-ui/core';

function ImgComment(props) {

    return (
        <React.Fragment>
            <Box px={3} pb={2}>
                <Box mt={3}>
                    <div>user1 <b>@user2</b> ㅋㅋㅋㅋㅋㅋㅋㅋㅋ</div>
                    <div>user1 <b>@user2</b> ㅋㅋㅋㅋㅋㅋㅋㅋㅋ</div>
                </Box>
            </Box>
        </React.Fragment>
    )
}

export default ImgComment;