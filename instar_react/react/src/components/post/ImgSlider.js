import React from 'react';
import { Box, IconButton } from '@material-ui/core';
import { FaRegArrowAltCircleLeft, FaRegArrowAltCircleRight } from "react-icons/fa";


function ImgSlider(props) {
    const array = props.images;
    const [currentIndex, setCurrentIndex] = React.useState(0);
    
    const onLeft = (e) => {
        let next = currentIndex-1
        if (next < 0) next = 0;
        setCurrentIndex(next)
    }
    const onRight = (e) => {
        let next = currentIndex+1
        if (next >= array.length) next = array.length-1;
        setCurrentIndex(next)
    }
    return (
        <React.Fragment>
            <Box position="relative" width='100%'>
                {
                    (props.images) && 
                        <React.Fragment>
                            <Box className='controller'>
                                <IconButton className="left" onClick={onLeft} style={{display: (currentIndex === 0) ? 'none' : 'block'}} ><FaRegArrowAltCircleLeft /></IconButton>
                                <IconButton className="right" onClick={onRight} style={{display: (currentIndex === array.length-1) ? 'none' : 'block'}} ><FaRegArrowAltCircleRight /></IconButton>
                            </Box>
                                { (props.mode === 'preview') 
                                    ? <Box width="50%" mx="auto">
                                        <img alt="human" src={array[currentIndex]} width="70%" />                         
                                    </Box>
                                    : <Box className="slider">
                                        <img alt="human" src={array[currentIndex].file} width="100%" />
                                    </Box>
                                }
                        </React.Fragment>
                }
            </Box>
        </React.Fragment>
    )
}

export default ImgSlider;