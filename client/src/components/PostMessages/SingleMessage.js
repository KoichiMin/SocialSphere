import styled from "styled-components"

import LikeCommentShare from "./LikeCommentShare";

const SingleMessage = ({post, index}) =>{
    return(
        <ContentBox key={index}>
            <div>
                {post.data} 
            </div>
            {post.image !== "no image available" &&
                <Picture src={post.image} alt="posted message"/>
            }
            
            <Underline></Underline>

            <LikeCommentShare/>
        </ContentBox>
    )
}


const ContentBox = styled.div`
    background-color: white;
    width: 650px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 20px;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
    margin-top: 20px;
`

const Underline = styled.div`
    width: 620px;
    height: 2px;
    background-color: black;
    opacity: 0.1;
`



const Picture = styled.img`
height: 640px;
width: 642px;

`

export default SingleMessage