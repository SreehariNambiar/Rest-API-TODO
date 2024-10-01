import React from 'react'
import {Link} from 'react-router-dom'
const Landing = () => {
  return (
    <div>
    <h1>Landing</h1>
    <Link to='/login'><button>Login</button></Link>
    <Link to='/register'><button>Signup</button></Link>
    </div>
  )
}

export default Landing