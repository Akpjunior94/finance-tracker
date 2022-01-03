import React from 'react'
import styles from './Navbar.module.css'
import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout'
import {useAuthContext } from '../hooks/useAuthContext'

const Navbar = () => {
  const { logout } = useLogout(); 
  const { user } = useAuthContext()


  return (
    <nav className={styles.navbar}>
      <ul>
        <Link to='/' className={styles.title}>MoneySpent</Link>

        {!user && (
          <>
            <Link to='/login'>Login</Link>
            <Link to='/signup'>Signup</Link>
          </>
        )}

        {user && (
          <>
            <p>hello, {user.displayName}</p>
            <li>
              <button className='btn' onClick={logout}>Logout</button>
            </li>
          </>
        )}
      </ul>

    </nav>
  )
}

export default Navbar;
