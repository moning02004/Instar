import React from 'react';
import { Card, Box, CardHeader, CardContent, Divider, TextField, Button, CardActions } from '@material-ui/core';
import ImgSlider from '../../components/post/ImgSlider';
import axios from 'axios';
import { CONSTANTS } from '../../Constants';
import authHeader from '../../services/auth-header';

export const PostCreateDialog = (props) => {
    let [previmage, setPrevImage] = React.useState(null);
    let [files, setFiles] = React.useState()
    let [content, setContent] = React.useState('')

    const onSubmit = (e) => {
        let formData = new FormData();
        Array.from(files).forEach( x => {
            formData.append('images', x);
        })
        formData.append('content', content);
        axios.post(`${CONSTANTS.URL}/post/`, formData, {headers: authHeader()}).then( response => {
            if (response.data.status === 201) props.close(); window.location.reload();
        }).catch( error => {
            console.log(error);
        })
    }
    return (
        <React.Fragment>
            <Box className="modal" style={{display: (props.open) ? 'block' : 'none'}}>
                <Box className="modal-content">
                    <Card>
                        <CardHeader title="업로드" />
                        <Divider />
                        <CardContent>
                            <input type="file" multiple onChange={(e) => {
                                let array = []
                                Array.from(e.target.files).forEach( x => {
                                    array.push(URL.createObjectURL(x));
                                });
                                setPrevImage(array);
                                setFiles(e.target.files)
                            }} />
                            { (previmage) && 
                                <Box>
                                    <ImgSlider images={previmage} mode="preview" />
                                </Box>
                            }
                            <TextField 
                                variant="outlined" 
                                fullWidth
                                multiline={true}
                                rows="5"
                                value={content}
                                onChange={(e) => {setContent(e.target.value)}}
                            />
                        </CardContent>
                        <CardActions style={{display: 'flex'}}>
                        <Button style={{marginLeft: 'auto'}} onClick={onSubmit}>작성</Button>
                            
                            <Button onClick={() => {
                                setPrevImage(null)
                                setFiles(null)
                                setContent('')
                                props.close()
                            }}>취소</Button>
                        </CardActions>
                    </Card>
                </Box>
            </Box>
        </React.Fragment>
    )
}