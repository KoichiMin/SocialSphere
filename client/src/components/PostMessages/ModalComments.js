import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { useState } from 'react';
import { Modal } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
// import { useState } from 'react';
// import styled from 'styled-components';
// import { useContext } from 'react';
// import { stateContext } from '../../Context';
// import { useAuth0 } from '@auth0/auth0-react';

const Comments = ( ) =>{
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);  
    
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    const handleSubmit = (e) =>{
        e.preventDefault()
        fetch("/post-message",{
            method:"POST",
            headers:{
                'Content-type':'application/json',
            },
            body: JSON.stringify({
                message: message
            })
        })
        .then((res) => res.json())
        .then((data) =>{
            console.log(data)
        })
    }    


    return(
        
        <div className='icons'>
            <button onClick={handleOpen} className='icon-button comment-button' > 
                {/* <div className='icons'> */}
                <button className='icon-button'><ChatBubbleOutlineIcon/></button>
                <div>Comment</div>
                {/* </div> */}
            </button>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={open}>
                    <Box sx={style}>
                        <form onSubmit={(e) =>handleSubmit(e)}>
                            <input
                                label="What's on your mind?"
                                fullWidth
                                required
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                            />
                            <Button type="submit">Post</Button>
                        </form>

                    </Box>
                </Fade>
            </Modal>
        </div>

    
    )

}

export default Comments