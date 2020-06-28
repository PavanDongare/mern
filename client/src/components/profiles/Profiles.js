import React , { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Spinner from '../layout/spinner'
import { getAllProfiles  }  from '../../actions/profile'


const Profiles = ({getAllProfiles, profile:{ profiles,loading }}) => {
    useEffect(()=>{
        getAllProfiles()
    },[]);
    return (
        <div>
            test
        </div>
    )
}

Profiles.propTypes = {

}
const mapStateToProps= state => ({
    profile: state.profile 
})

export default connect(mapStateToProps,{getAllProfiles})(Profiles)
