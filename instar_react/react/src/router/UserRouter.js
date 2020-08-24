import React from 'react';
import { Switch, Route } from "react-router-dom";
import NotFound from '../pages/main/NotFound';
import UserDetail from '../pages/user/UserDetail';
import { UserEdit } from '../pages/user/UserEdit';
import { UserList } from '../pages/user/UserList';

function UserRouter(props){
    return (
        <React.Fragment>
            <Switch>
                <Route exact path={`${props.match.path}/`} component={UserList} />
                <Route exact path={`${props.match.path}/:id`} component={UserDetail} />
                <Route path={`${props.match.path}/:id/edit`} component={UserEdit} />
                <Route component={NotFound} />
            </Switch>
        </React.Fragment>
    )
} 

export default UserRouter;