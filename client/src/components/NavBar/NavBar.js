import FacebookIcon from '@mui/icons-material/Facebook';
import HomeIcon from '@mui/icons-material/Home';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import AppsIcon from '@mui/icons-material/Apps';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Person2Icon from '@mui/icons-material/Person2';
import styled from 'styled-components';
import LoginButton from '../Auth0/LoginButton';
import LogoutButton from '../Auth0/LogoutButton';
import { useAuth0 } from "@auth0/auth0-react";

const NavBar = () =>{
    const  {isAuthenticated} = useAuth0()
    return(

        <>
        {isAuthenticated ? 
        <Wrapper>
                <Logo>
                    SocialSphere
                </Logo>
                <div>
                    <button>Find Friends</button>
                    <button><AppsIcon/></button>
                    <button><ChatBubbleIcon/></button>
                    <button><NotificationsIcon/></button>
                    <button><Person2Icon/></button>
                    <LogoutButton/>
                </div>
        </Wrapper>
            :
            <Wrapper>
                <LoginButton/>
            </Wrapper>
            }
        </>
    )
}

const Wrapper = styled.div`
    display:flex;
    background-color: white;
    justify-content: space-between;
    width: 100%;
    height: 5vh;
`

const Logo = styled.div`
    
`

export default NavBar