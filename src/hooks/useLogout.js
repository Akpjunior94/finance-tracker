import { signOut } from "firebase/auth"
import { useEffect, useState } from "react"
import { auth } from '../firebase/config.js'
import { useAuthContext } from "./useAuthContext"




export const useLogout = () => {
  const [isCancelled, setIsCancelled] = useState(false) //cleanup function to eraditcate unmounting interuption errors
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const { dispatch } = useAuthContext()


  const logout = async () => {
    setError(null)
    setIsLoading(true)
  
  // sign the user out
  try {
    await signOut(auth)
    // await auth.signOut()

    // dispatch logout action
    dispatch({ type: 'LOGOUT' })

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

  return { logout, error, isLoading }

}