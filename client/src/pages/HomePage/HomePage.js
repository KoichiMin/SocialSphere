import { useContext, useEffect, useState } from "react"
import PostModal from "../../components/PostModal/PostModal"
import styled from "styled-components"
import { stateContext } from "../../Context"

const HomePage = () => {
    const [messages, setMessages] = useState([]);
    const {load, setLoad} =useContext(stateContext);

    useEffect(()=>{
        fetch("http://localhost:4000/get-all-messages")
        .then((res) => res.json())
        .then((data) =>{
            // console.log(data.data)
            setMessages(data.data.reverse())
        })
    },[load])
    return(
        <Content>
            <SideBar>
                <ul>
                    <li className="li">Find friends</li>
                    <li className="li">Most Recent</li>
                    <li className="li">Groups</li>
                    <li className="li">MarketPlace</li>
                    <li className="li">Watch</li>
                    <li className="li">Memories</li>
                    <li className="li">Saved</li>
                </ul>
            </SideBar>
            <NewsFeed>
                <div>
                    <PostModal/>
                </div>
                {messages.map((post, index) =>{
                    return (
                            <div key={index}>
                                <div>
                                    {post.data} 
                                </div>
                                {post.image !== "no image available" &&
                                <Picture src={post.image} alt="posted message"/>
                                }
                            </div>
                            
                        )
                    })}
            </NewsFeed>
        
        </Content>
    )
}

const Content = styled.div`
    
`


const SideBar = styled.div`
    height: 0;

    .li{
        list-style-type:none;
    }
`

const NewsFeed = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    /* height: 100vh; */
    /* overflow-y: scroll; */
    /* margin-left: 35%; */
    /* overflow-x: hidden; */
`

const Picture = styled.img`
    height: 30vh;
    width: 10vw;
`

export default HomePage