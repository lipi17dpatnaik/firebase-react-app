import {Link} from 'react-router-dom';
import { auth } from '../config/firebase'; // to get auth object which has all details like name, email, etc
import { useAuthState } from 'react-firebase-hooks/auth'; // to get the state of current user
import {signOut} from 'firebase/auth'
import { userInfo } from 'os';

export const Navbar:any = () => {
    const [user] = useAuthState(auth)
    const signUserOut = async ()=> {
        await signOut(auth);
    }
    let userInfo = <div></div>
    
    if(user) {
        userInfo =
        <div>
            <p>{user?.displayName || ''}</p>
            <img src={user?.photoURL || ''} width="20" height="20"/>
            <div>
                <button onClick={signUserOut}> Log out </button>
            </div>
        </div>
    }
    else userInfo = <div></div>
    
    return (
        <div className="navbar"> 
            <div className="links"> 
                <Link to="/" className="link"> Main </Link>
                {!user ? <Link to="/login" className="link"> Login </Link> : 
                <Link to="/createpost" className="link"> Create Post </Link> }
            </div>
            <div className="user"> 
                {userInfo}
            </div>
        </div>
    )
}