import SingleComment from "./SingleComment"


const CommentMessages = ({post}) =>{
    
    return(
        <div>
            {post.Comments.map((comment)=>{
                return(
                    <SingleComment user={comment[0]} comment={comment[1]}/>
                )
            })}
        </div>
    )
}

export default CommentMessages