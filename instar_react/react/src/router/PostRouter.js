import React from 'react';
import { Switch, Route } from "react-router-dom";
import PostDetail from '../pages/post/PostDetail';
import NotFound from '../pages/main/NotFound';

export const PostRouter = (props) =>{
    return (
        <React.Fragment>
            <Switch>
                <Route path={`${props.match.path}/:id`} component={PostDetail} />
                <Route component={NotFound} />
            </Switch>
        </React.Fragment>
    )
} 
