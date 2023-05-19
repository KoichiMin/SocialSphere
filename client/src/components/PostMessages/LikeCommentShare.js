import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import IosShareIcon from '@mui/icons-material/IosShare';
import styled from 'styled-components';
// import { useState } from 'react';
import Like from './Like';
const LikeCommentShare = ({postId}) =>{

    return(
        <BottomOptions>
            <Like postId ={postId}/>
            <div className='icons'>
                <button className='icon-button'><ChatBubbleOutlineIcon/></button>
                <div>Comment</div>
            </div>
            <div className='icons'>
                <button className='icon-button'><IosShareIcon/></button>
                <div>Share</div>
            </div>

        </BottomOptions>
    )
}

const BottomOptions = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: space-around;
    width: 100% ;   

    .icons{
        display:flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 5px;
    }

    .icon-button{
        border: none;
        background-color: white;
        
    }
`

export default LikeCommentShare