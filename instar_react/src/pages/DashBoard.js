import React from 'react';

import './DashBoard.css'
import ProfileBox from '../components/ProfileBox';
import TimeLine from '../components/TimeLine';

const DashBoard = (props) => {

    return (
        <React.Fragment>
            <div className="dashboard">
                <div className="timeline">
                    <TimeLine />
                </div>
                <div className="profile">
                    <div><ProfileBox /></div>
                </div>
            </div>
        </React.Fragment>
    )
}


export default DashBoard;