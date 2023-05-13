// import { useContext, useEffect, useState } from "react"
import PostModal from "../../components/PostModal/PostModal"
import styled from "styled-components"
import PostMessages from "../../components/PostMessages/PostMessages"

const HomePage = () => {

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
`


export default HomePage