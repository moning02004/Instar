import React, { useEffect } from 'react';
import { TextField, Button, Box, Typography } from '@material-ui/core';
import { CONSTANTS } from '../../Constants';
import AuthService from '../../services/AuthService';

const axios = require('axios');

const Register = (props) => {
    let [email, setEmail] = React.useState('')
    let [name, setName] = React.useState('')
    let [nickname, setNickname] = React.useState('')
    let [password1, setPassword1] = React.useState('')
    let [password2, setPassword2] = React.useState('')
    let [userCheck, setUserCheck] = React.useState(false)
    let [pwCheck, setPwCheck] = React.useState(true)

    const onRegister = (e) => {
        e.preventDefault();
        AuthService.register(email, password1, password2, name, nickname).then( response => {
            window.location.replace('/login'); 
        }).catch( error => {
            
        });
        
    }
    useEffect( () => {
        let emailRe = /[a-z0-9]+[_a-z0-9]*[a-z0-9]+@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})/ig
        if (email === "" || !emailRe.test(email)) {
            setUserCheck(false);
            return;
        }

        axios.post(CONSTANTS.URL + '/user/check', {
            username: email
        }).then( response => {
            setUserCheck(!response.data.data);
        })
    }, [email])

    useEffect( () => {
        if (password1 === "") return;
        if (password1 !== password2) {
            setPwCheck(false)
            return;
        }
        setPwCheck(true);
        
    }, [password1, password2])

    return (
        <React.Fragment>
            <div className="auth-box">
                <div className="logo" style={{marginBottom: '1.5rem'}}>INSTAR</div>
                <TextField variant="outlined" size="small" margin="dense" fullWidth label="* 이메일" type="email"
                    value={email} onChange={(e) => {setEmail(e.target.value)}} error={!userCheck}
                />
                <Box textAlign="right" fontSize="0.75rem">
                    {(email !== "") && (
                        (userCheck) ? <Box>사용할 수 있는 이메일입니다.</Box> 
                                    : <Box>사용할 수 없는 이메일입니다.</Box>

                    )}
                </Box>

                <TextField variant="outlined" size="small" margin="dense" fullWidth label="*이름" 
                    value={name} onChange={(e) => setName(e.target.value)}
                />
                <TextField variant="outlined" size="small" margin="dense" fullWidth label="*별명" 
                    value={nickname} onChange={(e) => setNickname(e.target.value)}
                />
                <TextField variant="outlined" size="small" margin="dense" fullWidth type='password' label="*비밀번호" 
                    value={password1} onChange={(e) => setPassword1(e.target.value)} error={!pwCheck}
                />
                <TextField variant="outlined" size="small" margin="dense" fullWidth type='password' label="*비밀번호 확인" 
                    value={password2} onChange={(e) => setPassword2(e.target.value)} error={password1 !== password2}
                />
                <Button fullWidth variant="outlined" style={{marginTop: '1.3rem'}} onClick={onRegister}
                    disabled={email === "" || password1 === "" || password2 === "" || name === "" || nickname === "" || !userCheck || !pwCheck}
                >가입하기</Button>

                <Box className="cursor-pointer" border={1} borderColor="rgb(50, 50, 250)" mt={3} py={1} borderRadius={4} onClick={() => {window.location.href = '/login'}}>
                    <Typography variant="subtitle1" >로그인</Typography>
                </Box>
            </div>

        </React.Fragment>
    )
}

export default Register;