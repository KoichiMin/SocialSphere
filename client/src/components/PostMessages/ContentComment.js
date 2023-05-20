import Button from '@mui/material/Button';
import { useState } from 'react';
import SingleMessage from './SingleMessage';
import { useEffect } from 'react';

const ContentComment = ({postId}) =>{
    const [message, setMessage] = useState("");
    const [postContent, setPostContent] = useState(null)
    const handleSubmit = (e) =>{
        e.preventDefault()
        fetch("http://localhost:4000/post-message",{
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
    useEffect(()=>{
        fetch(`http://localhost:4000/get-specific-post/${postId}`)
        .then((res) => res.json())
        .then((data) =>{
            setPostContent(data.data[0])
            console.log(data.data[0])
        })
    }, [])    

    return(
        postContent &&
    <>
        <SingleMessage post={postContent}/>
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
    </>
    )
}

export default ContentComment