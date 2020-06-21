//racfp
import React , { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getCurrentProfile } from '../../actions/profile'
import { profile_url } from 'gravatar'


const Dashboard = ({getCurrentProfile,auth,profile}) => {
    useEffect(()=>{
        getCurrentProfile();
    },[])
    return (
        <div>
            Dashboard
        </div>
    )
}

Dashboard.propTypes = {
   //ptfr
   getCurrentProfile: PropTypes.func.isRequired,
   auth: PropTypes.object.isRequired,
   profile: PropTypes.object.isRequired
}

const mapStateToProps = state => {
    return {
        auth: state.auth,
        profile: state.profile
    };
}


// ({
//     auth: state.auth,
//     profile: state.profile
// });

export default  connect (mapStateToProps,{getCurrentProfile}) (Dashboard);
