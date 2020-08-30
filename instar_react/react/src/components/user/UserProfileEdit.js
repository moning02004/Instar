import React from 'react';
import AuthService from '../../services/AuthService';
import { CONSTANTS } from '../../Constants';
import authHeader from '../../services/auth-header';
import { Box, TextField, Button } from '@material-ui/core';
import axios from 'axios';

export const UserProfileEdit = (props) => {
    let [image, setImage] = React.useState(null);
    let [previmage, setPrevImage] = React.useState((props.user.get_avatar) ? props.user.get_avatar.image : '');
    let [name, setName] = React.useState(props.user.name);
    let [email, setEmail] = React.useState(props.user.email);
    let [description, setDescription] = React.useState(props.user.description);
    let [phone, setPhone] = React.useState(props.user.phone);
    let [nickname, setNickname] = React.useState(props.user.nickname);

    const onSubmit = (e) => {
        e.preventDefault();

        let data = new FormData();
        data.append('typ', 'edit')
        data.append('name', name)
        data.append('phone', phone)
        data.append('nickname', nickname)
        data.append('description', description)
        data.append('email', email)
        if (image !== null) {data.append('avatar', image)}

        axios.patch(`${CONSTANTS.URL}/user/${AuthService.currentUser()}`, data, {headers: authHeader()}).then( response => {
            if (response.status === 200) {
                alert('정상적으로 변경되었습니다.')
                window.location.reload();
            }
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