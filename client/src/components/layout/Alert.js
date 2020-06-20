// racfp

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from  'react-redux';

const Alert = ({alerts}) => 
    alerts !== null && alerts.length > 0 &&
    alerts.map(oneAlert => (
        <div key= {oneAlert.id} className={`alert alert-${oneAlert.alertType}`} >
            {oneAlert.msg}
        </div>
    ));



// what does it do?
Alert.propTypes = {
    alerts:  PropTypes.array.isRequired
}

// gets state & passes it as prop to component
const mapStateToProps = state => ({
    alerts: state.alert
})

export default connect(mapStateToProps)(Alert);



