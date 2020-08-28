import React from 'react';
import { Switch, Route } from "react-router-dom";
import PostDetail from '../pages/post/PostDetail';
import NotFound from '../pages/main/NotFound';
import { PostEdit } from '../pages/post/PostEdit';

export const PostRouter = (props) =>{
    return (
        <React.Fragment>
            <Switch>
                <Route exact path={`${props.match.path}/:id`} component={PostDetail} />
                <Route path={`${props.match.path}/:id/edit`} component={PostEdit} />
                <Route component={NotFound} />
            </Switch>
        </React.Fragment>
    )
} 
