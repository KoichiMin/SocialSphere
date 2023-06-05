import { Modal } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import { useState } from 'react';
// import styled from 'styled-components';
import { useContext } from 'react';
import { stateContext } from '../../Context';
import { useAuth0 } from '@auth0/auth0-react';
import ModeEditIcon from '@mui/icons-material/ModeEdit';


const UpdateUserNameModal = () =>{
    const  {isAuthenticated, user} = useAuth0()
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");
    const {load, setLoad} =useContext(stateContext)
    const [userNickname, setUserNickname] = useState("")

    const handleOpen = async () => {
        setOpen(true);
        setMessage("");
        await fetch(`http://localhost:4000/get-access-user/${user.email}`)
        .then((res) => res.json())
        .then((data)=>{
            // console.log(data.userData[0].nickname)
            setUserNickname(data.userData[0].nickname)
        })
        
    };
    const handleClose = () => {
        setOpen(false)
        
    };  
    

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


    const handleSubmit = async (e) =>{
        e.preventDefault()
        try{

            await fetch(`http://localhost:4000/update-user-nickname/${user.email}/${userNickname}`,{
                method:"PATCH",
                headers:{
                    'Content-type':'application/json',
                },
                body: JSON.stringify({newNickname:message})
                })
                .then((res) => res.json())
                .then((data) =>{
                    console.log(data.message)
                    setLoad(!load)
                    handleClose()
                });
        }
        catch(err){
            console.log(err)
        }
    }
    
    return(
        isAuthenticated &&
        <div>
        <Button onClick={handleOpen}><ModeEditIcon/></Button>
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
                    <h2>Change Username</h2>
                    <input    
                    label="What's on your mind?"
                    fullWidth
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}/>
                    <button type='submit'>Post</button>
                </form>
                </Box>
            </Fade>
            </Modal>
        </div>
    )
}



export default UpdateUserNameModal