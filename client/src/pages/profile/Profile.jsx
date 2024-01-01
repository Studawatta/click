import './profile.scss';
import FacebookTwoToneIcon from '@mui/icons-material/FacebookTwoTone';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import PinterestIcon from '@mui/icons-material/Pinterest';
import TwitterIcon from '@mui/icons-material/Twitter';
import PlaceIcon from '@mui/icons-material/Place';
import LanguageIcon from '@mui/icons-material/Language';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Posts from '../../components/posts/Posts';
import { Link, useParams } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../../context/authContext';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { makeRequest } from '../../axios';
import emptyProfilePic from '../../assets/emptyProfilePic.jpg';
import blackCover from '../../assets/blackCover.jpg';

const Profile = () => {
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

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (following) => {
      if (following)
        return makeRequest.delete('/relationships?userId=' + data[0].id);
      return makeRequest.post('/relationships', { userId: data[0].id });
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['relationship'] });
    },
  });

  const handleFollow = () => {
    mutation.mutate(relationshipData.includes(data[0].id));
  };

  return (
    <>
      {isPending ? (
        'Loading...'
      ) : error ? (
        'Somthing went wrong'
      ) : (
        <div className="profile">
          <div className="images">
            <img
              src={data[0].coverPic ? data[0].coverPic : blackCover}
              className="cover"
            />
            <img
              src={data[0].profilePic ? data[0].profilePic : emptyProfilePic}
              alt=""
              className="profilePic"
            />
          </div>
          <div className="profileContainer">
            <div className="uInfo">
              <div className="left">
                <a href="http://facebook.com">
                  <FacebookTwoToneIcon fontSize="large" />
                </a>
                <a href="http://facebook.com">
                  <InstagramIcon fontSize="large" />
                </a>
                <a href="http://facebook.com">
                  <TwitterIcon fontSize="large" />
                </a>
                <a href="http://facebook.com">
                  <LinkedInIcon fontSize="large" />
                </a>
                <a href="http://facebook.com">
                  <PinterestIcon fontSize="large" />
                </a>
              </div>
              <div className="center">
                <span>{data[0].name}</span>
                <div className="info">
                  <div className="item">
                    <PlaceIcon />
                    <span>{data[0].city ? data[0].city : 'city'}</span>
                  </div>
                  <div className="item">
                    <LanguageIcon />
                    <span>{data[0].website ? data[0].website : 'website'}</span>
                  </div>
                </div>
                {currentUser.id === data[0].id ? (
                  <Link to={`/update/${currentUser.id}`}>
                    <button>Update</button>
                  </Link>
                ) : (
                  <button onClick={handleFollow}>
                    {relationshipData.includes(data[0].id)
                      ? 'Following'
                      : 'Follow'}
                  </button>
                )}
              </div>
              <div className="right">
                <EmailOutlinedIcon />
                <MoreVertIcon />
              </div>
            </div>
            <Posts user={data[0].id} />
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
