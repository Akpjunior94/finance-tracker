import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { useEffect, useState } from 'react'
import { auth } from '../firebase/config.js'
import { useAuthContext } from './useAuthContext.js'

const useSignup = () => {
  const [isCancelled, setIsCancelled] = useState(false) //cleanup function to eraditcate unmounting interuption errors
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const { dispatch } = useAuthContext()


  const signup = async(email, password, displayName) => {
    setError(null)
    setIsLoading(true)

    
    // sign up user
    try {
      await createUserWithEmailAndPassword(auth, email, password)
      .then((cred) => {
        console.log('User Created', cred.user)
      })

      // Add Display Name to User
      updateProfile(auth.currentUser, { displayName })
      setError(false)

      // dispatch login action
      dispatch({ type: 'LOGIN', payload: auth.currentUser})

      // update state
      if (!isCancelled) {
        setIsLoading(false)
        setError(null)
      }

    } 
    catch (err) {
      if (!isCancelled) {
      console.log(err.message)
      setError(err.message)
      setIsLoading(false)
      }
    }
      
  }


  // cleanup function
  useEffect(() => {
    return () => setIsCancelled(true)
  }, [])
      
  return { error, isLoading, signup }

 
}

export default useSignup
