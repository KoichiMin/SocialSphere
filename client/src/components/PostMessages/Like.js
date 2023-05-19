import { useState } from "react"
// empty thumb
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
// filled thumb
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt'; 
import styled from "styled-components";
import { useAuth0 } from '@auth0/auth0-react';

const Like = ({postId}) =>{
    const [changeLike, setChangeLike] = useState(true)
    const  { user} = useAuth0()
    
    const handleChange = () => {
        if(changeLike){
            setChangeLike(false)
            fetch(`http://localhost:4000/like-post/${user.email}/${postId}`)
            .then((res) => res.json())
            .then((data) =>{
                console.log(data.message)
            })
        } else{
            setChangeLike(true)
            fetch(`http://localhost:4000/remove-like/${user.email}/${postId}`)
            .then((res) => res.json())
            .then((data) =>{
                console.log(data.message)
            })
        }
    }

    return(
        <div className='icons'>
            { changeLike ?
                <Button className='icon-button' onClick={handleChange}><ThumbUpOffAltIcon/></Button>
                :
                <Button className='icon-button' onClick={handleChange}><ThumbUpAltIcon/></Button>    
            }

            <div>Like</div>
        </div>
    )
}

const Button = styled.button`
        border: none;
        background-color: white;
        
    
`

export default Like 