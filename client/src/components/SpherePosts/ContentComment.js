import Button from '@mui/material/Button';
import { useState, useContext } from 'react';
import SingleMessage from './SingleMessage';
import { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import CommentMessages from './CommentMessages';
import styled from 'styled-components';
import { stateContext } from "../../Context"


// content inside the comment modal
const ContentComment = ({postId, setOpen}) =>{
    const [message, setMessage] = useState("");
    const [postContent, setPostContent] = useState(null)
    const {load, setLoad} =useContext(stateContext);
    const {user} = useAuth0()
    //  submit comment written by the user
    const handleSubmit = (e) =>{
        // console.log(user)
        e.preventDefault()
        fetch(`http://localhost:4000/comment-post/${user.email}/${postId}`,{
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
            // console.log(data)
            setLoad((prevLoad) => !prevLoad)
            localStorage.setItem('modalOpen', false);
            setOpen(false)
        })
    }
    // get access to the Sphere Post through the postId
    useEffect(()=>{
        fetch(`http://localhost:4000/get-specific-post/${postId}`)
        .then((res) => res.json())
        .then((data) =>{
            setPostContent(data.data[0])
            // console.log(data.data[0])
        })
    }, [postId])    

    return(
        postContent &&
    <ContentCommentBox>
        <SingleMessage post={postContent}/>
        <CommentMessages post={postContent}/>
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
    </ContentCommentBox>
    )
}

const ContentCommentBox = styled.div`
    height: 800px;
    /* width: 660px; */
    overflow-x: hidden;
    overflow-y: auto;
`

export default ContentComment