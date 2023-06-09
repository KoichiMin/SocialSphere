import IosShareIcon from '@mui/icons-material/IosShare';
import { useAuth0 } from '@auth0/auth0-react';
import styled from 'styled-components';
import { stateContext } from "../../Context"
import  { useContext } from "react"
const Share = ({postId}) =>{
    const  { user, isAuthenticated} = useAuth0()
    const {load, setLoad} =useContext(stateContext);
    // const [shared, setShared] = useState(false)

    const handleShare = () => {
        // setShared(true)
        fetch(`http://localhost:4000/share-post/${user.email}/${postId}`)
        .then((res) => res.json())
        .then((data) =>{
            setLoad((prevLoad) => !prevLoad)
            console.log(data.message)
        })

    }

    return(
    <div className='icons'>
    {isAuthenticated ?    
        <Button className='icon-button' onClick={handleShare}>
            <IosShareIcon/>
            <div>Share</div>
        </Button>
    
    :
        <Button className='icon-button'>
            <IosShareIcon/>
            <div>Share</div>
        </Button>
        }

    </div>
    )
}


const Button = styled.button`
        border: none;
        background-color: white;
        display: flex;
        align-items: center;
        :hover{
            
            background-color: hsl(0, 0%, 95%); 
            opacity: 1;
            cursor: pointer;

        }
    
`

export default Share