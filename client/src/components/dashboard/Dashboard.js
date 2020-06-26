//racfp
import React , { useEffect, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getCurrentProfile } from '../../actions/profile'
import { profile_url } from 'gravatar'
import Spinner from '../layout/spinner';
import { Link } from 'react-router-dom';
import { DashboradActions } from './DashboradActions';



const Dashboard = ({getCurrentProfile,
                    auth : {user},
                    profile:{profile,loading}}) => {
    useEffect(()=>{
        getCurrentProfile();
    },[])
    return loading && profile === null ? (<Spinner/>): 
    <Fragment>
        <h1 className="large text-primary">Dashboard</h1>
        <p className="lead">
        <i className="fas fa-user"></i> Welcome {user && user.name} </p>  


        { profile!== null ?
            <DashboradActions></DashboradActions> :
            <Fragment>
                <Link to ='/create-profile' className='btn btn-primary my-1'> 
                    <Fragment> Create Profile </Fragment> 
                </Link>
            </Fragment> 

        }
    </Fragment>
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
