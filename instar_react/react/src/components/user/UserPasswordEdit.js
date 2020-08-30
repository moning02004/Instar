import React from 'react';
import { Box, TextField, Button } from '@material-ui/core';
import axios from 'axios';
import { CONSTANTS } from '../../Constants';
import AuthService from '../../services/AuthService';
import authHeader from '../../services/auth-header';

export const UserPasswordEdit = (props) => {
    let [password, setPassword] = React.useState('');
    let [password1, setPassword1] = React.useState('');
    let [password2, setPassword2] = React.useState('');
    let [errorMessage, setErrorMessage] = React.useState('');

    const onSubmit = (e) => {
        axios.post(`${CONSTANTS.URL}/user/auth`, {
            username: AuthService.currentUsername(),
            password: password,
        }, {headers: authHeader()}).then( response => {
            if (response.data.data) {
                axios.patch(`${CONSTANTS.URL}/user/${AuthService.currentUser()}`, {
                    password1: password1,
                    password2: password2,
                }, {headers: authHeader()}).then( response => {
                    if (response.status === 200) {
                        window.location.reload(`/user/${AuthService.currentUser()}`);
                    }
                }).catch( error => {
                    setErrorMessage(error.response.data.non_field_errors);
                })
            }
        })
    }
    return (
        <Box width="100%">
            <Box display="flex">
                <Box width="20%" my="auto">현재 비밀번호</Box>
                <TextField
                    variant="outlined"
                    margin="normal"
                    size="small"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{width: '75%'}}
                />
            </Box>

            <Box display="flex">
                <Box width="20%" my="auto">새 비밀번호</Box>
                <TextField
                    variant="outlined"
                    margin="normal"
                    size="small"
                    type="password"
                    value={password1}
                    onChange={(e) => setPassword1(e.target.value)}
                    style={{width: '75%'}}
                />
            </Box>
            <Box display="flex">
                <Box width="20%" my="auto">새 비밀번호 확인</Box>
                <TextField
                    variant="outlined"
                    margin="normal"
                    size="small"
                    type="password"
                    value={password2}
                    onChange={(e) => setPassword2(e.target.value)}
                    error={password1 !== password2}
                    style={{width: '75%'}}
                />
            </Box>

            <Box display="flex">
                <Box width="20%" my="auto"></Box>
                <Box style={{color: 'red', fontSize: '0.75rem'}}>{errorMessage}</Box>
            </Box>

            <Box display="flex" mt={4}>
                <Box width="20%" my="auto"></Box>
                <Button variant="outlined" onClick={onSubmit} 
                    disabled={password === '' || password1 === '' || password1 !== password2} >제출</Button>
            </Box>
        </Box>
    )
}