import styled from "styled-components"
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { useState} from 'react';
import { Modal } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import { useAuth0 } from "@auth0/auth0-react"
import ModalUserDisplay from "./ModalUserDisplay";
import ModalComments from "../SpherePosts/ModalComments";
import ContentComment from "../SpherePosts/ContentComment";

const ModalUsersLikeCommentShare = ({updatePost}) =>{
    const [displayComments, setDisplayComments] = useState(false)
    const [open, setOpen] = useState(false); 
    const [emailUsersDisplay, setEmailUsersDisplay] = useState(null)
    const {user, isAuthenticated} = useAuth0();
    const handleOpen = (event, type) => {
        if(isAuthenticated){
            setOpen(true)
            if(type === "likes"){
                setEmailUsersDisplay(updatePost.EmailLikedBy)
                setDisplayComments(false)
                console.log(displayComments)
            } else if(type === "comments"){
                setEmailUsersDisplay(updatePost.EmailComments)
                setDisplayComments(true)
                console.log(displayComments)
            } else if(type === "shares"){
                setEmailUsersDisplay(updatePost.Shared)
                setDisplayComments(false)
            }

        }

    };
    const handleClose = () =>{
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
        <Numbers>
            <div onClick={(event) => handleOpen(false, 'likes')} className="button">{updatePost.numLikes} likes</div>
            <div className="comment-share">
            <div onClick={(event) => handleOpen(true, 'comments')} className="button">{updatePost.Comments.length} comments</div>
            <div onClick={(event) => handleOpen(false, 'shares')} className="button">{updatePost.Shared.length} shares</div>
    
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
                        <div  setOpen={setOpen}>Hello</div>
                        {/* {emailUsersDisplay && 
                            displayComments ?
                                <ModalComments postId={updatePost}/>
                                :
                                emailUsersDisplay.map((email)=>{
                                    return(
                                        <ModalUserDisplay userDisplay={email}/>
                                    )
                                })} */}
                            {emailUsersDisplay &&
                                (displayComments ? (
                                    <ContentComment postId={updatePost._id} setOpen={setOpen} />
                                ) : (
                                    emailUsersDisplay.map((email) => (
                                    <ModalUserDisplay userDisplay={email} key={email.id} />
                                    ))
                                ))}
                    </Box>
                </Fade>
            </Modal>
        </div>
    </Numbers>
    )
}

const Numbers = styled.div`
    display: flex;
    justify-content: space-between;
    width: 570px;
    color: grey;
    opacity: 0.5;
    
    .comment-share{
        display: flex;
        gap: 10px;
    }

    .button{
        cursor: pointer;
    }
`

export default ModalUsersLikeCommentShare