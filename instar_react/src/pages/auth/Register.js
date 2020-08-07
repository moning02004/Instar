import React from 'react';
import { TextField, Button, Box, Typography } from '@material-ui/core';

const Register = (props) => {
    let [email, setEmail] = React.useState('')
    let [name, setName] = React.useState('')
    let [phone, setPhone] = React.useState('')
    let [password1, setPassword1] = React.useState('')
    let [password2, setPassword2] = React.useState('')
    const onRegister = (e) => {
        e.preventDefault();

    }

    return (
        <React.Fragment>
            <div className="auth-box">
                <div className="logo" style={{marginBottom: '1.5rem'}}>INSTAR</div>
                <TextField variant="outlined" size="small" margin="dense" fullWidth label="이메일" type="email"
                    value={email} onChange={(e) => setEmail(e.target.value)}
                />
                <TextField variant="outlined" size="small" margin="dense" fullWidth label="이름" 
                    value={name} onChange={(e) => setName(e.target.value)}
                />
                <TextField variant="outlined" size="small" margin="dense" fullWidth label="전화번호" 
                    value={phone} onChange={(e) => setPhone(e.target.value)}
                />
                <TextField variant="outlined" size="small" margin="dense" fullWidth type='password' label="비밀번호" 
                    value={password1} onChange={(e) => setPassword1(e.target.value)}
                />
                <TextField variant="outlined" size="small" margin="dense" fullWidth type='password' label="비밀번호 확인" 
                    value={password2} onChange={(e) => setPassword2(e.target.value)}
                />
                <Button fullWidth variant="outlined" style={{marginTop: '1.3rem'}} onClick={onRegister}>가입하기</Button>

                <Box className="cursor-pointer" border={1} borderColor="rgb(50, 50, 250)" mt={3} py={1} borderRadius={4} onClick={() => {window.location.href = '/login'}}>
                    <Typography variant="subtitle1" >로그인</Typography>
                </Box>
            </div>

        </React.Fragment>
    )
}

export default Register;