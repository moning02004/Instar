import React from 'react';
import { Button, TextField, Typography, Box } from '@material-ui/core';
import AuthService from '../../services/AuthService';

const Login = (props) => {
    let [username, setUsername] = React.useState('');
    let [password, setPassword] = React.useState('');
    let [error, setError] = React.useState(false)

    const login = (e) => {
        e.preventDefault();
        AuthService.login(username, password).then( () => {
            window.location.replace('/');
        }, error => {
            setError(true);
        })
    }
    return (
        <React.Fragment>
            <div className="auth-box">
                <div className="logo" style={{marginBottom: '1.5rem'}}>INSTAR</div>
                <TextField variant="outlined" size="small" margin="dense" fullWidth label="이메일 or 전화번호"
                    value={username} onChange={(e) => setUsername(e.target.value)}
                />
                <TextField variant="outlined" size="small" margin="dense" fullWidth type='password' label="비밀번호"
                    value={password} onChange={(e) => setPassword(e.target.value)} onKeyDown={(e) => {if (e.key === 'Enter') login(e)}}
                />
                {(error) && <div style={{fontSize: '0.75rem', textAlign: 'right', color: 'red'}}>입력하신 계정을 찾을 수 없습니다.</div>}
                <Button fullWidth variant="outlined" style={{marginTop: '1.3rem'}} onClick={login}>로그인</Button>

                <Box className="cursor-pointer" border={1} borderColor="rgb(50, 50, 250)" mt={3} py={1} borderRadius={4} onClick={() => {window.location.href = '/register'}}>
                    <Typography variant="subtitle1" >가입하기</Typography>
                </Box>
            </div>

        </React.Fragment>
    )
}

export default Login;