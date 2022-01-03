import { signInWithEmailAndPassword } from 'firebase/auth'
import { useEffect, useState } from "react"
import { auth } from '../firebase/config.js'
import { useAuthContext } from "./useAuthContext"


export const useLogin = () => {
  const [isCancelled, setIsCancelled] = useState(false) //cleanup function to eraditcate unmounting interuption errors
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const { dispatch } = useAuthContext()


  const login = async (email, password) => {
    setError(null)
    setIsLoading(true)
  
  // sign the user out
  try {
    await signInWithEmailAndPassword(auth, email, password)
    .then((cred) => {
      console.log('User Logged in', cred.user)
    })

    // dispatch logout action
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

  return { login, error, isLoading }
}
