import { Modal } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { useState } from 'react';

const PostModal = ({setLoad, load}) =>{
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("")
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
        console.log(message)
        e.preventDefault()
        fetch("http://localhost:4000/post-message",{
            method:"POST",
            headers:{
                'Content-type':'application/json',
            },
            body: JSON.stringify({
                data: message
            })
        })
        .then((res) => res.json())
        .then((data) =>{
            console.log(data)
            setLoad(!load)
            handleClose()
        })
    }    

    return(
        <div>
        <Button onClick={handleOpen}>What's on your mind, person?</Button>
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

                <form onSubmit={handleSubmit}>
                    <input    
                    label="What's on your mind?"
                    fullWidth
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}/>
                    <button type='submit'>Post</button>
                </form>
                <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                    Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                </Typography>
                </Box>
            </Fade>
            </Modal>
        </div>
    )
}

export default PostModal

