import { useEffect, useState } from "react"
import PostModal from "../../components/PostModal/PostModal"
import styled from "styled-components"

const HomePage = () => {
    const [messages, setMessages] = useState([])
    const [load, setLoad] =useState(true)
    useEffect(()=>{
        fetch("http://localhost:4000/get-all-messages")
        .then((res) => res.json())
        .then((data) =>{
            console.log(data.data)
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
                    <PostModal setLoad={setLoad} load={load}/>
                </div>
                {messages.map((message) =>{
                    return (
                            <div>
                                {message.data}
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
    /* margin-left: 35%; */
`

export default HomePage