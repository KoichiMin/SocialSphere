import styled from "styled-components"

const SingleMessage = ({post, index}) =>{
    return(
        <div key={index}>
        <div>
            {post.data} 
        </div>
        {post.image !== "no image available" &&
            <Picture src={post.image} alt="posted message"/>
        }
        </div>
    )
}

const Picture = styled.img`
height: 30vh;
width: 10vw;
`

export default SingleMessage