import { useAuth0 } from "@auth0/auth0-react"
import { useEffect, useState } from "react";
import styled from "styled-components";

const ProfilePage = () =>{
    const {user} = useAuth0();
    const [userProfile, setUserProfile] = useState(null)
    useEffect(()=>{
        fetch(`http://localhost:4000/get-user-profile-info/${user.email}`)
        .then((res) => res.json())
        .then((data) =>{
            setUserProfile(data.userData[0])
            console.log(data.userData[0])
        })
    }, [])
    return(
    userProfile && 
        <Profile>
            <div>
            { <ProfileImage src={userProfile.ProfilePicture} alt="Profile"/>}
            <button>Update Profile Image</button>

            </div>
            <div>
                {userProfile.nickname} 
                <button>Update Name</button>
            </div>
        </Profile>
    )


}

const Profile = styled.div`
    padding-top: 5%;
    display: flex;
    /* flex-direction: column; */
`

const ProfileImage = styled.img`
    width: 20vw;
    height: 30vh;
`

export default ProfilePage