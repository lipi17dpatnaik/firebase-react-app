import {auth, provider} from '../config/firebase';
import {signInWithPopup} from 'firebase/auth';
import {useNavigate} from 'react-router-dom';

export const Login:any = () => {
    const navigate =useNavigate();

    const signInWithGoogle = async () => {
       const result = await signInWithPopup(auth, provider);
       navigate("/");
    }

    return (
        <div> <p> Sign In with Google To Continue </p>
        <button onClick={signInWithGoogle}> Sign In with Google </button></div>
    )
}