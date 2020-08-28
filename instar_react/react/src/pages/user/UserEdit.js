import React, { useEffect } from 'react';
import { Button, Box, TextField } from '@material-ui/core';
import axios from 'axios';
import { CONSTANTS } from '../../Constants';
import authHeader from '../../services/auth-header';
import AuthService from '../../services/AuthService';


const UserProfileEdit = (props) => {
    let [image, setImage] = React.useState(null);
    let [previmage, setPrevImage] = React.useState((props.user.get_avatar) ? props.user.get_avatar.image : '');
    let [name, setName] = React.useState(props.user.name);
    let [email, setEmail] = React.useState(props.user.email);
    let [description, setDescription] = React.useState(props.user.description);
    let [phone, setPhone] = React.useState(props.user.phone);
    let [nickname, setNickname] = React.useState(props.user.nickname);

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(image);
        let data = new FormData();
        data.append('typ', 'edit')
        data.append('name', name)
        data.append('phone', phone)
        data.append('nickname', nickname)
        data.append('description', description)
        data.append('email', email)
        if (image !== null) {data.append('avatar', image)}

        axios.patch(`${CONSTANTS.URL}/user/${AuthService.currentUser()}`, data, {headers: authHeader()}).then( response => {
            window.location.reload();
        })
    }
    return (
        <Box width="100%">
            {(props.user) && 
                <React.Fragment>
                    <Box display="flex" mb={1}>
                        <Box width="15%" my="auto">프로필 사진</Box>
                        <Box width="85%">
                            {(previmage) && <img alt="I" src={previmage} width="30%"/>}
                            <input style={{display: 'block'}} type="file" accept="image/*" onChange={(e) => {
                                setPrevImage(URL.createObjectURL(e.target.files[0]));
                                setImage(e.target.files[0]);
                            }}/>
                        </Box>
                    </Box>
                    
                    <Box display="flex" mb={1}>
                        <Box width="15%" my="auto">이름</Box>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            size="small"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            style={{width: '75%'}}
                        />
                    </Box>

                    <Box display="flex" mb={1}>
                        <Box width="15%" my="auto">별명</Box>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            size="small"
                            value={nickname}
                            onChange={(e) => setNickname(e.target.value)}
                            style={{width: '75%'}}
                        />
                    </Box>

                    <Box display="flex" mb={1}>
                        <Box width="15%" my="auto">이메일</Box>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            size="small"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={{width: '75%'}}
                        />
                    </Box>

                    <Box display="flex" mb={1}>
                        <Box width="15%" my="auto">휴대폰</Box>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            size="small"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            style={{width: '75%'}}
                        />
                    </Box>
                    
                    <Box display="flex" mb={1}>
                        <Box width="15%" my="auto">소개</Box>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            size="small"
                            rows="5"
                            multiline={true}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            style={{width: '75%'}}
                        />
                    </Box>
                    <Box display="flex" mt={4}>
                        <Box width="15%" my="auto"></Box>
                        <Button variant="outlined" onClick={onSubmit}>제출</Button>
                    </Box>
                </React.Fragment>
            }
        </Box>
    )
}

const UserPasswordEdit = (props) => {
    return (
        <Box width="100%">
            <Box display="flex">
                <Box>Profile</Box>
                <Box>Profile</Box>
            </Box>
            
            <Box display="flex">
                <Box>Profile</Box>
                <Box>Profile</Box>
            </Box>
            
            <Box display="flex">
                <Box>Profile</Box>
                <Box>Profile</Box>
            </Box>
        </Box>
    )
}

export const UserEdit = (props) => {
    let [user, setUser] = React.useState();
    let [panel, setPanel] = React.useState();

    useEffect( () => {
        axios.get(CONSTANTS.URL + '/user/' + props.match.params.id, { headers: authHeader() }).then( response => {
            setUser(response.data)
            setPanel(<UserProfileEdit user={response.data}/>);
        })
    }, [props.match.params.id])
    
    const onLeave = (e) => {
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
            <Box style={style.container}>
                <Box style={style.menu}>
                    <Button style={{marginTop: '1rem'}} fullWidth
                        onClick={() => setPanel(<UserProfileEdit user={user} />)}>개인정보</Button>
                    <Button style={{marginTop: '1rem'}} fullWidth 
                        onClick={() => setPanel(<UserPasswordEdit />)}>비밀번호</Button>
                    <Box position="absolute" left="0" bottom="0" width="100%">
                        <Button style={{marginBottom: '1rem'}} fullWidth 
                            onClick={(e) => AuthService.logout()}>로그아웃</Button>
                        <Button style={{marginBottom: '1rem'}} fullWidth 
                            onClick={onLeave}>탈퇴</Button>
                    </Box>
                </Box>
                <Box style={style.panel} className="overflow-scroll">
                    <Box p={3}>
                        {panel}
                    </Box>
                </Box>
            </Box>
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

