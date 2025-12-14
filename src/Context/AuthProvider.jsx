import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
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
        user,createUser,signinUser,google,logout,loading
    }

   


    return (
        <AuthContext value={authInfo}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;