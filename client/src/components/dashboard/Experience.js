import React,{Fragment} from 'react'
import PropTypes from 'prop-types'
import {connect } from 'react-router-dom'
import Moment from 'react-moment' 

 const Experience = (experience) => {
     const experiences = experience.map(exp=>(
        <td key={exp._id}>
            <td> {exp.company} </td>
            <td className='hide-sm' > {exp.title} </td>
            <td> <Moment format='YYYY/MM/DD'>  {exp.from} </Moment> - {
                exp.to == null ? ('now'): <Moment format='YYYY/MM/DD'>  {exp.to} </Moment>
            }
            </td>
            <td>
                <button className='btn btn-danger' > Delete  </button>
            </td>
        </td>
     ));
    return (
        <div>
            <h2 className="my-2"> Experience Credentials </h2>
            <table className="table"  >
                <thead>
                    <tr>
                        <th>Company</th>
                        <th className='hide-sm'>Title</th>
                        <th className='hide-sm'>Title</th>
                        <th >Title</th>
                    </tr>
                </thead>
            <tbody>{experiences}</tbody>
            </table>
        </div>
    )
}

 Experience.propTypes = {
    experience: PropTypes.array.isRequired,
}

 export default Experience
