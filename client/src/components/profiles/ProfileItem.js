import React, {useState} from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const ProfileItem = ({profile :{
    profile_id,
    email,
    profileData
}}) => {
    const [localState, setProfileState]= useState({
        company:'',
        website:'',
        location:'',
        status:'',
        skills:'',
        githubusername:'',
        bio:'',
        twitter:'',
        facebook:'',
        linkedin:'',
        youtube:'',
        instagram:''
    });
    const  {
        company,
        website,
        location,
        status,
        skills,
        githubusername,
        bio,
        twitter,
        facebook,
        linkedin,
        youtube,
        instagram, 
    } = localState;
    //setProfileState({...localState,profileData});
    return (
        <div className="profile bg-light">
            <img  className="round-img"/>
            <div>
                <h2>{email}</h2>
                <h2>{company}</h2>
            </div>
        </div>
    )
}

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired,
}

export default ProfileItem
