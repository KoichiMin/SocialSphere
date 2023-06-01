// import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import styled from 'styled-components';
// import { useState } from 'react';
import Like from './Like';
import ModalComments from './ModalComments';
import Share from './Share';

const LikeCommentShare = ({postId}) =>{

    return(
        <BottomOptions>
            <Like postId ={postId}/>
            <ModalComments postId ={postId}/>
            <Share postId ={postId}/>

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
        width: 35%;
    
        :hover{
            background-color: hsl(0, 0%, 95%); 
            opacity: 1;

            .icon-button{
                background-color: hsl(0, 0%, 95%); 
                opacity: 1;
                display: flex;
            }
        }
    }
/* 
    .modal-content{
        position: relative;
        z-index: 9999;
    } */

    .icon-button{
        border: none;
        background-color: white;
    }
    .comment-button{
        display: flex;
        align-items: center;
        cursor: pointer;
    }
    `

export default LikeCommentShare