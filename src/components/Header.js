import React, { useEffect } from 'react'
import { auth } from '../utils/firebase';
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';
import { LOGO, SUPPORTED_LANGUAGES } from '../utils/constants';
import { toggleGptSearchView } from '../utils/GptSlice';
import { changeLanguage } from '../utils/configSlice';

const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(store => store.user);
    const showGptSearch = useSelector((store) => store.gpt.showGptSearch)
    const handleSignout = ()=>{
        signOut(auth).then(() => {
        }).catch((error) => {
            navigate("/error");
        });
    }


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                const { uid, email, displayName, photoURL } = user;
                dispatch(addUser({ uid: uid, email: email, displayName: displayName, photoURL: photoURL }));
                navigate("/browse")
            } else {
                dispatch(removeUser());
                navigate("/")
            }
        });
        return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleGptSeacrhClick = ()=>{
        dispatch(toggleGptSearchView());
    }

    const handleLanguageChange = (e)=> {
        dispatch(changeLanguage(e.target.value));
    }

    return (
        <div className='absolute w-[100%] px-8 py-2 bg-gradient-to-b from-black z-10 flex flex-col md:flex-row justify-between'>
            <img className='w-44 mx-auto md:mx-0' src={LOGO} alt="logo" />
            {user && (<div className='flex justify-between p-2'>
                {showGptSearch &&  (<select className='m-2 p-2 bg-gray-900 text-white' onClick={handleLanguageChange}>
                    {SUPPORTED_LANGUAGES.map((lang)=>(
                        <option key={lang.identifier} value={lang.identifier}>{lang.name}</option>
                    ))}
                </select>)}
                <button className='py-2 px-4 mx-4 my-2 bg-purple-800 text-white rounded-lg' onClick={handleGptSeacrhClick}>{showGptSearch ? "Homepage" : "GPT Search"}</button>
                <button
                    className="text-white md:block lg:text-base md:text-base font-normal hover:opacity-80 h-12 w-15 py-2 px-4 mx-4 my-2 rounded-md mr-2.5 bg-zinc-700"
                    onClick={handleSignout}>
                    <i className="ri-logout-box-r-line pr-0.5 lg:pr-1"></i>
                    Signout
                </button>
            </div>)}
        </div>
    )
}

export default Header