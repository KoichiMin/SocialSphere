import { useAuth0 } from "@auth0/auth0-react"
import { useEffect, useState } from "react";
import styled from "styled-components";
import SingleMessage from "../../components/PostMessages/SingleMessage";
import UpdateModal from "../../components/UpdateProfilePhoto/UpdateModal";
import { useContext } from 'react';
import { stateContext } from '../../Context';

const ProfilePage = () =>{
    const {user} = useAuth0();
    const [userProfile, setUserProfile] = useState(null)
    const [sharedPost, setSharedPost] =useState(null)
    const {load, setLoad} =useContext(stateContext)
    useEffect(()=>{
        if(user){
            fetch(`http://localhost:4000/get-user-profile-info/${user.email}`)
            .then((res) => res.json())
            .then((data) =>{
                setUserProfile(data.userData[0])
                // console.log(data.userData[0])
                setSharedPost(data.userData[0].shared.reverse())
            })

        }
        }, [load, user])

        
    return(
    user && userProfile && 
        <>
            <Profile>
                <div>
                    <ProfileImage src={userProfile.ProfilePicture} alt="Profile"/>   
                    {/* <button>Update Profile Image</button> */}
                    <UpdateModal/>
                </div>
                <div>
                    {userProfile.nickname} 
                    <button>Update Name</button>
                </div>
            </Profile>
            {sharedPost.map((sharedPost) =>{
                return(
                    <SingleMessage post={sharedPost} />
                )
            })}
        </>
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