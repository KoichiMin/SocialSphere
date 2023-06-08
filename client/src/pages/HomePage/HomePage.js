// import { useContext, useEffect, useState } from "react"
import PostModal from "../../components/PostModal/PostModal"
import styled from "styled-components"
import PostMessages from "../../components/SpherePosts/PostMessages"
import { useAuth0 } from "@auth0/auth0-react"
import { useEffect } from "react"
import image from "/Users/a/Desktop/mini project/SocialSphere/client/src/image/R.png"
const HomePage = () => {
    const {user, isAuthenticated} = useAuth0();
    // const [allUsersList, setAllUsersList] = useState([])
    // console.log(user)
    useEffect(() =>{
        fetch('http://localhost:4000/get-all-users-email')
            .then((res) => res.json())
            .then((data) =>{
                // setAllUsersList(data.data)
                if(isAuthenticated){
                    if(data.data.indexOf(user.email) < 0){
                        fetch('http://localhost:4000/post-user-database', {
                            method: 'POST',
                            headers:{
                                'Content-type': 'application/json',
                            },
                            body: JSON.stringify({
                                email: user.email,
                                nickname: user.nickname,
                                name: user.name
                            })
                        }).then((res) => res.json())
                        .then((data) =>{
                            // console.log(data)
                            fetch('http://localhost:4000/post-profile-to-database', {
                                method: 'POST',
                                headers:{
                                    'Content-type': 'application/json',
                                },
                                body: JSON.stringify({
                                    email: user.email,
                                    nickname: user.nickname,
                                    name: user.name,
                                    ProfilePicture: image
                                })
                            }).then((res) => res.json())
                        })
                    } else{
                        console.log("UserInfo is inside the database")
                    }
                }
            })
    }, [user, isAuthenticated])
    return(
        <Content>
            {/* <SideBar>
                <ul>
                    <li className="li">Find friends</li>
                    <li className="li">Most Recent</li>
                    <li className="li">Groups</li>
                    <li className="li">MarketPlace</li>
                    <li className="li">Watch</li>
                    <li className="li">Memories</li>
                    <li className="li">Saved</li>
                </ul>
            </SideBar> */}
            <NewsFeed>
                <PostModal/>
                <PostMessages/>
            </NewsFeed>
        
        </Content>
    )
}

const Content = styled.div`
    background-color: #F9F9F9;
    background-size: cover;
    width: 100%;
    min-height: 100vh;
    top: 0;
    left: 0;

`


// const SideBar = styled.div`
//     height: 0;

//     .li{
//         list-style-type:none;
//     }
// `

const NewsFeed = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-top: 4%;
`


export default HomePage