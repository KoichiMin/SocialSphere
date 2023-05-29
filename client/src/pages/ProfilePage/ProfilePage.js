import { useAuth0 } from "@auth0/auth0-react"
import { useEffect } from "react";
import styled from "styled-components";

const ProfilePage = () =>{
    const {user} = useAuth0();
    useEffect(()=>{
        fetch(`http://localhost:4000/get-user-profile-info/${user.email}`)
        .then((res) => res.json())
        .then((data) =>{
            console.log(data.userData[0])
        })
    }, [])
    return(
        <Profile>
            {user.nickname}
            {/* <img src={image} alt="Profile"/> */}
        </Profile>
    )


}

const Profile = styled.div`
    padding-top: 5%;
`

export default ProfilePage