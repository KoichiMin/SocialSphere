import { Modal } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import { useState } from 'react';
import styled from 'styled-components';

const PostModal = ({setLoad, load}) =>{
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [previewImage, setPreviewImage] = useState("")
    const [image, setImage] = useState("");
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false)
        setPreviewImage("")
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
        try { 
            const formData = new FormData();
            formData.append('file', image);
            formData.append('upload_preset', 'SocialSphere');
            const res = await fetch('https://api.cloudinary.com/v1_1/dsjjjhz8h/image/upload', {
            method: 'POST',
            body: formData
            });
            const data = await res.json();
            console.log(data);
            await fetch("http://localhost:4000/post-message",{
            method:"POST",
            headers:{
                'Content-type':'application/json',
            },
            body: JSON.stringify({
                data: message,
                image: data.secure_url
            })
            })
            .then((res) => res.json())
            .then((data) =>{
                console.log(data)
                setLoad(!load)
                handleClose()
            });
        }
        catch(err){
            console.log(err)
        }
    }  
    
    const handleChange = (image) =>{
        const reader = new FileReader()
        if(image){
            reader.readAsDataURL(image);
            reader.onloadend = () => {
            setPreviewImage(reader.result);
        }
    }
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
                    <input 
                        type='file' 
                        onChange={(e) =>{
                            setImage(e.target.files[0])
                            handleChange(e.target.files[0])
                        }}/>
                    <button type='submit'>Post</button>
                </form>
                {previewImage &&
                <div>
                    <PrevPhoto alt='preview file' src={previewImage}/>
                </div>
                }
                </Box>
            </Fade>
            </Modal>
        </div>
    )
}

const PrevPhoto = styled.img`
    max-width: 50%;
    height: auto;
    
    
    `

export default PostModal


// console.log(data)
// const formData = new FormData()
// formData.append("file", image)
// formData.append("upload_preset", "ir8wdaqq")

// fetch("https://api.cloudinary.com/v1_1/dsjjjhz8h/image/upload", formData)
// .then((res) => res.json())
// .then((data)=>{
//     console.log(data)
// })