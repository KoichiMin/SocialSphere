import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { useState} from 'react';
import { Modal } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import ContentComment from './ContentComment';

const ModalComments = ({postId}) =>{
    const [open, setOpen] = useState(false); 

    //  used the localStorage to check if modal is open or not because the comment button will call this component again
    const handleOpen = () => {
        const modalState = localStorage.getItem('modalOpen');
        if(modalState !== null){
            // console.log(modalState)
            if(modalState === 'false'){
                setOpen(true)
                localStorage.setItem('modalOpen', true);
            }
        } else{
            setOpen(true)
            localStorage.setItem('modalOpen', true);
        }
    };
    const handleClose = () =>{
        // const modalState = localStorage.getItem('modalOpen');
        // console.log(modalState)
        localStorage.setItem('modalOpen', false);
        setOpen(false);
        
        
    }  
    


    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 650,
        // height: 00,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    return(
        
        <div className='icons modal-content'>
            <button onClick={handleOpen} className='icon-button comment-button' > 
                <ChatBubbleOutlineIcon/>
                <div>Comment</div>
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
                        <ContentComment postId={postId}/>
                    </Box>
                </Fade>
            </Modal>
        </div>

    
    )

}

export default ModalComments