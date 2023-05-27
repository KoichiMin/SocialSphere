import { useEffect, useState } from "react"
// empty thumb
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
// filled thumb
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt'; 
import styled from "styled-components";
import { useAuth0 } from '@auth0/auth0-react';

const Like = ({postId}) =>{
    const [changeLike, setChangeLike] = useState(false)
    const  { user, isAuthenticated} = useAuth0()
    

    useEffect(() => {
        if (isAuthenticated) {
            fetch(`http://localhost:4000/get-status/${user.email}/${postId}`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setChangeLike(data.Liked);
            });
        }
        }, [isAuthenticated, postId, changeLike]);
    

    const handleChange = () => {
    
            if(!changeLike ){
                setChangeLike(true)
                fetch(`http://localhost:4000/like-post/${user.email}/${postId}`)
                .then((res) => res.json())
                .then((data) =>{
                    console.log(data.message)
                })
            } else{
                setChangeLike(false)
                fetch(`http://localhost:4000/remove-like/${user.email}/${postId}`)
                .then((res) => res.json())
                .then((data) =>{
                    console.log(data.message)
                })
            
        }
    }



    return(
        <div className='icons'>
            
            { isAuthenticated? 
                    changeLike ?
                        <Button className='icon-button' onClick={handleChange}>
                        <ThumbUpAltIcon/>
                        <div>Like</div>
                        </Button>    
                        :
                        <Button className='icon-button' onClick={handleChange}>
                            <ThumbUpOffAltIcon/>
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

        }
    
`

export default Like 