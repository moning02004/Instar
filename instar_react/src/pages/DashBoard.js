import React from 'react';

import './DashBoard.css'
import ProfileBox from '../components/ProfileBox';
import Post from '../components/timeline/Post';
import { POST_LIST } from '../mockup/postList';

const DashBoard = (props) => {

    return (
        <React.Fragment>
            <div className="dashboard">
                <div className="timeline">
                    {
                        POST_LIST.map((x) => 
                            <Post post={x}/>
                        )
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