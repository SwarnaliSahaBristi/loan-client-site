import { useEffect, useState } from 'react'
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth'
import { app } from '../firebase/firebase.config'
import { AuthContext } from './AuthContext'
import axios from 'axios'

const auth = getAuth(app)
const googleProvider = new GoogleAuthProvider()

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const createUser = (email, password) => {
    setLoading(true)
    return createUserWithEmailAndPassword(auth, email, password)
  }

  const signIn = (email, password) => {
    setLoading(true)
    return signInWithEmailAndPassword(auth, email, password)
  }

  const signInWithGoogle = async () => {
  setLoading(true);
  try {
    const result = await signInWithPopup(auth, googleProvider);
    
    // Call backend to set the JWT cookie
    await axiosInstance.post("/login-google", { 
      email: result.user.email,
      name: result.user.displayName,
      image: result.user.photoURL
    });

    // Now that the cookie is set, fetch the role
    const res = await axiosInstance.get("/users/role");
    setUser(res.data);
    
    return result;
  } catch (err) {
    console.error(err);
    throw err;
  } finally {
    setLoading(false);
  }
};

  const logOut = async () => {
    setLoading(true)
    return signOut(auth)
  }

  const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    })
  }

  // onAuthStateChange
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async currentUser => {
      console.log('CurrentUser-->', currentUser?.email)
      setUser(currentUser)
      setLoading(false)
    })
    return () => {
      return unsubscribe()
    }
  }, [])

  const authInfo = {
    user,
    setUser,
    loading,
    setLoading,
    createUser,
    signIn,
    signInWithGoogle,
    logOut,
    updateUserProfile,
  }

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  )
}

export default AuthProvider;