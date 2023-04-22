import { useEffect, useState } from "react"
import PostModal from "../../components/PostModal/PostModal"


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
        <div>
            <div>
                <ul>
                    <li>Find friends</li>
                    <li>Most Recent</li>
                    <li>Groups</li>
                    <li>MarketPlace</li>
                    <li>Watch</li>
                    <li>Memories</li>
                    <li>Saved</li>
                </ul>
            </div>
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

        </div>
    )
}

export default HomePage