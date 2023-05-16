import { useAuth0 } from "@auth0/auth0-react"
import styled from "styled-components";

const ProfilePage = () =>{
    const {user} = useAuth0();
    
    return(
        <Profile>
            {user.nickname}
        </Profile>
    )
}

const Profile = styled.div`
    padding-top: 5%;
`

export default ProfilePage