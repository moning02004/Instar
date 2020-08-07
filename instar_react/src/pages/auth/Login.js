import React from 'react';
import { Button, TextField, Typography, Box } from '@material-ui/core';

const Login = (props) => {
    let [username, setUsername] = React.useState('');
    let [password, setPassword] = React.useState('');
    
    const login = (e) => {
        e.preventDefault();
        sessionStorage.setItem('auth', 'a@a.com')
        props.onLogin('a@a.com');
    }
    return (
        <React.Fragment>
            <div className="auth-box">
                <div className="logo" style={{marginBottom: '1.5rem'}}>INSTAR</div>
                <TextField variant="outlined" size="small" margin="dense" fullWidth label="이메일 or 전화번호"
                    value={username} onChange={(e) => setUsername(e.target.value)}
                />
                <TextField variant="outlined" size="small" margin="dense" fullWidth type='password' label="비밀번호"
                    value={password} onChange={(e) => setPassword(e.target.value)}
                />
                <Button fullWidth variant="outlined" style={{marginTop: '1.3rem'}} onClick={login}>로그인</Button>

                <Box className="cursor-pointer" border={1} borderColor="rgb(50, 50, 250)" mt={3} py={1} borderRadius={4} onClick={() => {window.location.href = '/register'}}>
                    <Typography variant="subtitle1" >가입하기</Typography>
                </Box>
            </div>

        </React.Fragment>
    )
}

export default Login;