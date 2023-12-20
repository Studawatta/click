import './updateProfile.scss';
import FacebookTwoToneIcon from '@mui/icons-material/FacebookTwoTone';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import PinterestIcon from '@mui/icons-material/Pinterest';
import TwitterIcon from '@mui/icons-material/Twitter';
import PlaceIcon from '@mui/icons-material/Place';
import LanguageIcon from '@mui/icons-material/Language';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddIcon from '@mui/icons-material/Add';
import Posts from '../../components/posts/Posts';
import { useParams } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../../context/authContext';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { makeRequest } from '../../axios';
import emptyProfilePic from '../../assets/emptyProfilePic.jpg';
import blackCover from '../../assets/blackCover.jpg';

const UpdateProfile = () => {
  const { currentUser } = useContext(AuthContext);
  const params = useParams();

  const { isPending, error, data } = useQuery({
    queryKey: ['user', params.id],
    queryFn: async () =>
      await makeRequest.get(`/users/${params.id}`).then((res) => {
        return res.data;
      }),
  });
  const { data: relationshipData } = useQuery({
    queryKey: ['relationship'],
    queryFn: async () =>
      await makeRequest
        .get('/relationships?userId=' + currentUser.id)
        .then((res) => {
          return res.data;
        }),
  });

  return (
    <>
      {currentUser.id != params.id ? (
        <h1>Unothorized!</h1>
      ) : (
        <div>
          {isPending ? (
            'Loading...'
          ) : (
            <div className="updateProfile">
              <div className="images">
                <div
                  className="cover"
                  onClick={() => console.log('cover clicked')}
                >
                  <img
                    src={data[0].coverPic ? data[0].coverPic : blackCover}
                    alt="cover-pic"
                  />
                  <AddIcon className="addIcon" />
                </div>
                <div
                  className="profile"
                  onClick={() => console.log('profile clicked')}
                >
                  <img
                    src={
                      data[0].profilePic ? data[0].profilePic : emptyProfilePic
                    }
                    alt="profile-pic"
                  />
                  <AddIcon className="addIcon" />
                </div>
              </div>

              <form className="updateForm">
                <input
                  //   onChange={(e) => setFile(e.target.files[0])}
                  type="file"
                  //   ref={fileRef}
                  hidden
                  accept="image/*"
                />
                <input
                  //   onChange={(e) => setFile(e.target.files[0])}
                  type="file"
                  //   ref={fileRef}
                  hidden
                  accept="image/*"
                />
                <div className="inputCont">
                  <label>Username</label>
                  <input type="text" value={data[0].username} />
                </div>
                <div className="inputCont">
                  <label>Display Name</label>
                  <input type="text" value={data[0].name} />
                </div>
                <div className="inputCont">
                  <label>Email</label>
                  <input type="text" value={data[0].email} />
                </div>
                <div className="inputCont">
                  <label>City</label>
                  <input type="text" value={data[0].city} />
                </div>
                <div className="inputCont">
                  <label>Website</label>
                  <input type="text" value={data[0].website} />
                </div>
                <div className="inputCont">
                  <label>New Password</label>
                  <input type="password" />
                </div>
                <button>Update</button>
              </form>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default UpdateProfile;
