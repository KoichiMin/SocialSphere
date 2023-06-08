import { useAuth0 } from "@auth0/auth0-react"
import { useEffect, useState } from "react";
import styled from "styled-components";
import SingleMessage from "../../components/PostMessages/SingleMessage";
import UpdateImageModal from "../../components/UpdateProfilePhoto/UpdateImageModal";
import { useContext } from 'react';
import { stateContext } from '../../Context';
import UpdateUserNameModal from "../../components/UpdateProfilePhoto/UpdateUserNameModal";

const ProfilePage = () =>{
    const {user} = useAuth0();
    const [userProfile, setUserProfile] = useState(null)
    const [sharedPost, setSharedPost] =useState(null)
    const {load} =useContext(stateContext)
    useEffect(()=>{
        if(user){
            //  getting access to the user Profile info
            fetch(`http://localhost:4000/get-user-profile-info/${user.email}`)
            .then((res) => res.json())
            .then((data) =>{
                setUserProfile(data.userData[0])

                // updating the shared Post
                fetch(`http://localhost:4000/update-shared-post`,{
                method:"PATCH",
                headers:{
                    'Content-type':'application/json',
                },
                body: JSON.stringify({shared:data.userData[0].shared})
                })
                .then((res) => res.json())
                .then((data) =>{
                    
                    setSharedPost(data.displaySharedPost.reverse())
                    // console.log(data.displaySharedPost.reverse())
                });
            })

        }
        }, [load, user])

        
    return(
    user && userProfile && 
        <>
            <Profile>
                <div>
                    <ProfileImage src={userProfile.ProfilePicture} alt="Profile"/>   
                    <UpdateImageModal/>
                </div>
                <div>
                    {userProfile.nickname} 
                    <UpdateUserNameModal/>

                </div>
            </Profile>
            {sharedPost && sharedPost.map((singleSharedPost) =>{
                return(
                    <SingleMessage post={singleSharedPost} />
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