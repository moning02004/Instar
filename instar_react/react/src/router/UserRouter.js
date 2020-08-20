import React from 'react';
import { Switch, Route } from "react-router-dom";
import NotFound from '../pages/NotFound';
import UserDetail from '../pages/user/UserDetail';

function UserRouter(props){
    return (
        <React.Fragment>
            <Switch>
                <Route path={`${props.match.path}/:id`} component={UserDetail} />
                <Route component={NotFound} />
            </Switch>
        </React.Fragment>
    )
} 

export default UserRouter;