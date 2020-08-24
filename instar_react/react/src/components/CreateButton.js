import React from 'react';
import { Box, Button } from '@material-ui/core';

export const CreateButton = (props) => {

    return (
        <React.Fragment>
            <Box className="alert">
                <Button onClick={props.onClick}>게시물 업로드</Button>
            </Box>
        </React.Fragment>
    )
}