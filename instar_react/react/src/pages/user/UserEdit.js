import React, { useEffect } from 'react';
import { Button, Box, } from '@material-ui/core';
import axios from 'axios';
import { CONSTANTS } from '../../Constants';
import authHeader from '../../services/auth-header';
import AuthService from '../../services/AuthService';
import { UserProfileEdit } from '../../components/user/UserProfileEdit';
import { UserPasswordEdit } from '../../components/user/UserPasswordEdit';


export const UserEdit = (props) => {
    let [user, setUser] = React.useState();
    let [panel, setPanel] = React.useState();

    useEffect( () => {
        axios.get(CONSTANTS.URL + '/user/' + props.match.params.id, { headers: authHeader() }).then( response => {
            setUser(response.data)
            setPanel(<UserProfileEdit key="profile" user={response.data}/>);
        })
    }, [props.match.params.id])
    
    const onLeave = (e) => {
        console.log(panel.key);
        if (window.confirm('정말 탈퇴하시겠습니까?')) {
            axios.delete(`${CONSTANTS.URL}/user/${props.match.params.id}`, {headers: authHeader()}).then( response => {
                if (response.status === 204) {
                    window.location.replace('/login')
                }
            })
        }
    }
    return (
        <React.Fragment>
            {(panel) &&
                <Box style={style.container}>
                    <Box style={style.menu}>
                        <Button style={{
                                marginTop: '1rem', 
                                backgroundColor: (panel.key === 'profile') ? 'rgb(70, 70, 250)' : 'white',
                                color: (panel.key === 'profile') ? 'white' : 'black'
                            }} fullWidth
                            onClick={() => setPanel(<UserProfileEdit key="profile" user={user} />)}>개인정보</Button>

                        <Button style={{
                                marginTop: '1rem', 
                                backgroundColor: (panel.key === 'password') ? 'rgb(70, 70, 250)' : 'white',
                                color: (panel.key === 'password') ? 'white' : 'black'
                            }} fullWidth
                            onClick={() => setPanel(<UserPasswordEdit key="password" />)}>비밀번호</Button>
                        
                        <Box position="absolute" left="0" bottom="0" width="100%">
                            <Button style={{marginBottom: '1rem'}} fullWidth 
                                onClick={(e) => AuthService.logout()}>로그아웃</Button>
                            <Button style={{marginBottom: '1rem', backgroundColor: 'red', color: 'white'}} fullWidth 
                                onClick={onLeave}>탈퇴</Button>
                        </Box>
                    </Box>
                    <Box style={style.panel} className="overflow-scroll">
                        <Box p={3}>
                            {panel}
                        </Box>
                    </Box>
                </Box>
            }
        </React.Fragment>
    )
}

const style = {
    container: {
        display: 'block',
        position: 'relative',
        width: "70%",
        margin: "auto",
        backgroundColor: 'white', 
        left: 0, 
        top: 0, 
        border: '1px solid rgb(208, 208, 208)', 
        minHeight: '35rem',
        borderRadius: '4px'
    },
    menu: {
        position: 'absolute', 
        width: '20%',
        left: 0, 
        height: '100%',
    },
    panel: {
        position: 'absolute', 
        width: '80%',
        left: '20%', 
        borderLeft: '1px solid rgb(208, 208, 208)', 
        height: '100%',
    }
}

