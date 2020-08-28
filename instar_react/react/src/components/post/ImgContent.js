import React from 'react';
import { Box, TextField, Button } from '@material-ui/core';


export const ImgContent = (props) => {
    let [content, setContent] = React.useState(props.content)

    return (
        <React.Fragment>
            <Box width='100%' className="content-box" style={{maxHeight: props.height}}>
                { (!props.editMode)  
                    ? <Box p={3} pb={3}>
                        <div className="pre-box overflow-scroll">{props.content}</div> 
                    </Box>
                    :   <React.Fragment>
                            <TextField
                                variant="outlined" 
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                fullWidth
                                multiline={true}
                                rows="20"
                                margin="normal"
                            />
                            <Box>
                                <Button variant="outlined" onClick={(e) => {props.onSubmit(content)}}>작성</Button>
                            </Box>    
                        </React.Fragment>
                }
            </Box>
            
        </React.Fragment>
    )
}