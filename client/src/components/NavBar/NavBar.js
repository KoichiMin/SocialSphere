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
import { Link } from 'react-router-dom';

const NavBar = () =>{
    const  {isAuthenticated} = useAuth0()
    return(

        <>
        {isAuthenticated ? 
        <Wrapper>
                <Link to={'/'}>
                    <Logo>
                        SocialSphere
                    </Logo>
                </Link>
                <div>
                    <button>Find Friends</button>
                    <button><AppsIcon/></button>
                    <button><ChatBubbleIcon/></button>
                    <button><NotificationsIcon/></button>
                    <Link to={'/UserProfile'}><button><Person2Icon/></button></Link>
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
    align-items: center;
    width: 100%;
    height: 5vh;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9999;
    box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
`

const Logo = styled.div`
    
`

export default NavBar