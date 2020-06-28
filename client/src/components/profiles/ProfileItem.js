import React, {useState, useEffect} from 'react'
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

    useEffect(() => {
        const temp = JSON.parse(profileData) ;// stupid backend gives it in string
        setProfileState({ ...localState,...temp});
    }, [])
   
    return (
        <div className="profile bg-light">
            <img  className="round-img"/>
            <div>
                <h2>{email}</h2>
                <p>{status} at {company} </p>
                <p> {location}</p>
                <Link to={`/profile/${profile_id}`}
                    className='btn btn-primary'
                >
                    View Profile
                </Link>
             
            </div>
            <ul> 
                     { (skills.split(',').slice(0,4)).map((skill,index)=>(
                        <li key={index} className='text-primary '>
                            <i className='fas fa-check'></i> {skill}
                        </li>
                    ))}
            </ul>
        </div>
    )
}

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired,
}

export default ProfileItem
