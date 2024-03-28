import React, { useRef, useState } from 'react'
import Header from './Header'
import { checkValidData } from '../utils/validate'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { BACKGROUND_IMG, USER_AVTAR } from '../utils/constants';


const Login = () => {
    const [isSignInForm, setIsSignInForm] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);
    const dispatch = useDispatch();
    const name = useRef(null);
    const email = useRef(null);
    const password = useRef(null);

    const toggleSignInForm = () => {
        setIsSignInForm(!isSignInForm);
    }
    const handleButtonClick = () => {
        // Validate the form data
        const message = checkValidData(email.current.value, password.current.value);
        setErrorMessage(message);
        if (message) return;

        // Signin  Signup logic
        if (!isSignInForm) {
            //Signin logic
            createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
                .then((userCredential) => {
                    const user = userCredential.user;
                    updateProfile(user, {
                        displayName: name.current.value, photoURL: USER_AVTAR,
                    }).then(() => {
                        const { uid, email, displayName, photoURL } = auth.currentUser;
                        dispatch(addUser({ uid: uid, email: email, displayName: displayName, photoURL: photoURL }));
                    }).catch((error) => {
                        setErrorMessage(error.message);
                    });
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMessage(errorCode + "-" + errorMessage);
                });
        } else {
            //Signup logic
            signInWithEmailAndPassword(auth, email.current.value, password.current.value)
                .then((userCredential) => {
                    // Signed in 
                    // eslint-disable-next-line no-unused-vars
                    const user = userCredential.user;
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log(errorCode + "-" + errorMessage);
                });

        }
    }

    //tailwind constants
    const inputCss =
        "lg:py-3 md:py-3 lg:text-base md:text-base text-sm py-3 bg-zinc-900 bg-opacity-60 text-white border-[1px] border-gray-400 rounded-md md:px-4 px-3 my-3 lg:px-4 w-full";
    const buttonCss =
        "w-full bg-red-700 py-2 text-white rounded-md my-3 font-semibold";


    return (
        <div>
            <Header />
            <div className='absolute'>
                <img className="w-screen object-cover md:object-cover md:w-screen" src={BACKGROUND_IMG} alt="" />
            </div>
            <form onSubmit={(e) => { e.preventDefault() }} className='w-full md:w-3/12 absolute p-12 bg-black my-44 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-70'>
                <h1 className='font-bold text-2xl md:text-3xl py-4'>{isSignInForm ? "Sign In" : "Sign Up"}</h1>
                {!isSignInForm && (<input ref={name} type="text" placeholder='Full Name' className={inputCss} />)}
                <input ref={email} type="text" placeholder='Email Address' className={inputCss} />
                <input ref={password} type="password" placeholder='Enter Password' className={inputCss} />
                <p className='text-red-700'>{errorMessage}</p>
                <button className={buttonCss} onClick={handleButtonClick}>{isSignInForm ? "Sign In" : "Sign Up"}</button>
                <p className='py-2 md:py-4 cursor-pointer' onClick={toggleSignInForm}>{isSignInForm ? "New to Netflix? Sign Up Now " : "Already registered? Sign In Now"}</p>
            </form>
        </div>
    )
}

export default Login