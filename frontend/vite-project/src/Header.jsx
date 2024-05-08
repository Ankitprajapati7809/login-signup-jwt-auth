import React from 'react'
import { Link, useNavigate } from "react-router-dom";

export const Header = () => {
  return (
    <div className='navbar'>
                      <Link to="/signup">Sign up</Link> <br />
                      <Link to="/login">Login</Link><br />
                      <Link to="/listing">Listing</Link><br />
                      <Link to="/new">New</Link>

    </div>
  )
}
