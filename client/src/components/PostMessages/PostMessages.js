import { useState, useEffect, useContext } from "react";
import { stateContext } from "../../Context"
// import styled from "styled-components"
import SingleMessage from "./SingleMessage";


const PostMessages = () => {
    const [messages, setMessages] = useState([]);
    const {load, setLoad} =useContext(stateContext);
    

    useEffect(() => {
    fetch("http://localhost:4000/get-all-messages")
        .then((res) => res.json())
        .then((data) => {
        // console.log(data.data)
        setMessages(data.data.reverse())
        })
    }, [load])

    return (
    <div>
        { messages.map((post, index) => {
        return (
            <SingleMessage post={post} index={index}/>
        )
        })}
    </div>
    )
    }


export default PostMessages;
