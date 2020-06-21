import React, { Fragment } from "react";
import {Link} from 'react-router-dom';  // why 'Link' doesn't work?
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {logout} from '../../actions/authAction'
import auth from "../../reducers/auth";
/* #! is link nowhere */

const Navbar = ({auth:{isAuthenticated,loading}, logout}) => {

  const guestLinks=(
    <ul>
       <li> <Link to="#!">Developers</Link>         </li> 
       <li> <Link to="/register">Register</Link>  </li>
       <li> <Link to="/login">Login</Link>        </li>
    </ul>
  );
  const userLinks =(
    <ul>
        <li> <Link to="/logout" onClick={logout}>Logout</Link>        </li>
    </ul>
  );
  return (
      <nav className="navbar bg-dark">
        <h1>
          <Link to="">
            <i className="fas fa-code"></i> DevConnector
          </Link>
        </h1>
  {!loading && (<Fragment>{ isAuthenticated ? userLinks : guestLinks }</Fragment>)}
      </nav>
  );
};
 

Navbar.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}


const mapStateToProps = state => ({
        auth: state.auth
})

// connects state,action functions
export default connect(mapStateToProps,{logout})(Navbar)
