import React, { createContext, useEffect, useState } from 'react';
import {createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut} from 'firebase/auth';
import app from '../firebase/firebase.confiz';

  export const AuthContext = createContext();
  const auth = getAuth(app)
const UserContext = ({children}) => {
    // const user  = {email:'shajhan'}
    const [user,setUser] = useState(null)
    const [loading,setLoading] = useState(true);


    const createUser = (email,password) =>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email,password)
    }
    const signIn = (email,password)=>{
        setLoading(true);
        return signInWithEmailAndPassword(auth,email,password)
    }
    const logOut = () =>{
        setLoading(true);
        return signOut(auth)
    }

    useEffect ( ()=>{
       const unsubscripe = onAuthStateChanged(auth,currentUser=>{
            console.log( 'current user state change',currentUser);
            setUser(currentUser);
            setLoading(false);


        })
        return ()=>unsubscripe()

    },[])
    const authInfo = {user, loading,createUser,signIn, logOut}

    return (
        <AuthContext.Provider value={authInfo}>
            {children}

        </AuthContext.Provider>
    );
};

export default UserContext;