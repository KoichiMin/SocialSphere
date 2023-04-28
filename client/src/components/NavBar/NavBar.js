import FacebookIcon from '@mui/icons-material/Facebook';
import HomeIcon from '@mui/icons-material/Home';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import AppsIcon from '@mui/icons-material/Apps';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Person2Icon from '@mui/icons-material/Person2';
import styled from 'styled-components';

const NavBar = () =>{
    return(
        <Wrapper>
            <div>
                <FacebookIcon/>
            </div>
            <div>
                <HomeIcon/>
                <PeopleOutlineIcon/>
                <Diversity3Icon/>
            </div>  
            <div>
                <button>Find Friends</button>
                <button><AppsIcon/></button>
                <button><ChatBubbleIcon/></button>
                <button><NotificationsIcon/></button>
                <button><Person2Icon/></button>

            </div>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    display:flex;
    background-color: white;
    justify-content: space-between;
    width: 100vw;
    height: 5vh;
`

export default NavBar