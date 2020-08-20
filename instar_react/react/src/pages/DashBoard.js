import React, { useEffect } from 'react';

import './DashBoard.css'
import ProfileBox from '../components/ProfileBox';
import Post from '../components/timeline/Post';
import { CONSTANTS } from '../Constants';
import authHeader from '../services/auth-header';

const axios = require('axios');
const DashBoard = (props) => {
    let [postList, setPostList] = React.useState([]);

    useEffect( () => {
        axios.get(CONSTANTS.URL + '/post', {headers: authHeader()}).then( response => {
            setPostList(response.data);
        }).catch( error => {
        })
    }, [])
    return (
        <React.Fragment>
            <div className="dashboard">
                <div className="timeline">
                    {
                        postList.map( (post, key) => (
                            <Post key={key} post={post} />
                        ))
                    }
                </div>
                <div className="profile">
                    <div><ProfileBox /></div>
                </div>
            </div>
        </React.Fragment>
    )
}


export default DashBoard;