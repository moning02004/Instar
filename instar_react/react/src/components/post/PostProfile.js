import React from 'react';
import Profile from '../Profile';
import { Box, IconButton } from '@material-ui/core';
import { MoreVert } from '@material-ui/icons';
import { PostDrawer } from './PostDrawer';

export const PostProfile = (props) => {
    let [open, setOpen] = React.useState(false);
    return (
        <Box width="100%" display="flex" flexWrap="nowrap">
            <Profile user={props.post.author} />
            <Box ml="auto" my="auto">
                <IconButton onClick={(e) => setOpen(true)}><MoreVert /></IconButton>
            </Box>
            <PostDrawer open={open} setOpen={setOpen} post={props.post} />
        </Box>
    )
}