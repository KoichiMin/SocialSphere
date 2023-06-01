import  { useEffect, useState } from "react"
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt'; 
import styled from "styled-components";
import { useAuth0 } from '@auth0/auth0-react';

const Like = ({postId}) =>{
    const [changeLike, setChangeLike] = useState(false)
    const  { user, isAuthenticated} = useAuth0()
    const [isModalOpen, setisModalOpen] = useState(false)

    useEffect(() => {
        if (isAuthenticated) {
            fetch(`http://localhost:4000/get-status/${user.email}/${postId}`)
            .then((res) => res.json())
            .then((data) => {
                setChangeLike(data.Liked);
                setisModalOpen(localStorage.getItem('modalOpen') === 'true')
                // console.log(isModalOpen)
            });
        }
        }, [isAuthenticated, postId, isModalOpen]);
    

    const handleLike = () => {
        setChangeLike(true)
        fetch(`http://localhost:4000/like-post/${user.email}/${postId}`)
        .then((res) => res.json())
        .then((data) =>{
            console.log(data.message)
        })

    }

    const handleRemoveLike = () =>{
        setChangeLike(false)
        fetch(`http://localhost:4000/remove-like/${user.email}/${postId}`)
        .then((res) => res.json())
        .then((data) =>{
            console.log(data.message)
        })
    
    }



    return(
        <div className='icons'>
            
            {  !isModalOpen ? 
                    changeLike ?
                        <Button className='icon-button' onClick={handleRemoveLike}>
                        <ThumbUpAltIcon/>
                        <div>Like</div>
                        </Button>    
                        :
                        <Button className='icon-button' onClick={handleLike}>
                            <ThumbUpOffAltIcon/>
                            <div>Like</div>
                        </Button>
                :
                changeLike ?
                        <Button className='icon-button' >
                        <ThumbUpAltIcon/>
                        <div>Like</div>
                        </Button>    
                        :
                        <Button className='icon-button'>
                            <ThumbUpOffAltIcon/>
                            <div>Like</div>
                        </Button>
            }

            
        </div>
    )
}

const Button = styled.button`
        border: none;
        background-color: white;
        display: flex;
        align-items: center;
        :hover{
            
            background-color: hsl(0, 0%, 95%); 
            opacity: 1;
            cursor: pointer;

        }
    
`

export default  Like;