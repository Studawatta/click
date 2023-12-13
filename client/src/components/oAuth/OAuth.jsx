import './oAuth.scss';
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { app } from '../../firebase';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/authContext';
const OAuth = () => {
  const { setCurrentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);

      const res = await axios.post(
        'http://localhost:8080/api/auth/google',
        {
          username: result.user.displayName,
          email: result.user.email,
          profilePic: result.user.photoURL,
        },
        {
          withCredentials: true,
        }
      );
      setCurrentUser(res.data);
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <button onClick={handleGoogleClick} type="button" className="oAuth">
      Continue with google
    </button>
  );
};

export default OAuth;
