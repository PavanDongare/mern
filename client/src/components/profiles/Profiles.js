import React , { Fragment, useEffect,useState } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Spinner from '../layout/spinner'
import { getAllProfiles  }  from '../../actions/profile'
import { LOGIN_FAIL } from '../../actions/types'
import  ProfileItem  from './ProfileItem'


const Profiles = ({getAllProfiles, profile:{ profiles,loading,profileData }}) => {
   

    useEffect(()=>{
        getAllProfiles();
        console.log(profileData);
        //setProfileData(JSON.parse(profileData));
    },[getAllProfiles,profileData]);
    return (
        <Fragment>
            {
                loading ? <Spinner/> :
                <Fragment>
                    <h1 className='large text-primary' > Developers </h1>  
                    <p className='lead' >
                        <i className="fab fa-connectdevelop"></i> Browse & connect
                    </p>
                    <div className="profiles">
                        { profiles.length >0 ? (
                            profiles.map(profile=>(<ProfileItem key={profile.profile_id} profile={profile} />))
                        ) : <h4> No profiles found </h4>}
                    </div>
                </Fragment>
            }
        </Fragment>
    )
}

Profiles.propTypes = {

}
const mapStateToProps= state => ({
    profile: state.profile 
})

export default connect(mapStateToProps,{getAllProfiles})(Profiles)
