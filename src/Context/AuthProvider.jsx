import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { auth } from '../firebase/firebase.config';


const googleProvider = new GoogleAuthProvider();
const AuthProvider = ({ children }) => {


    const [user, setUser] = useState(null);
    const[loading,setLoading]=useState(true)

    //register
    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    //signin
    const signinUser=(email, password)=>{
        return signInWithEmailAndPassword(auth, email, password)
    }
     //google
    const google=()=>{
        return signInWithPopup(auth, googleProvider)
    }

//signout
const logout=()=>{
    return signOut(auth)
}

//profile
  const updateUser = (updatedData) => {
        return updateProfile(auth.currentUser, updatedData)
    }
//forget password
const forgetPassword=(email)=>{
    return sendPasswordResetEmail(auth, email)
}

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false)
            
        })
        return () => {
            unsubscribe()
        }
    }, [])



    
    const authInfo = {
        user,createUser,signinUser,google,logout,loading,updateUser,setUser,forgetPassword,
    }

   


    return (
        <AuthContext value={authInfo}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;