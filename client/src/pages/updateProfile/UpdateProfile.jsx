import './updateProfile.scss';
import AddIcon from '@mui/icons-material/Add';
import { useParams, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useRef, useState } from 'react';
import { AuthContext } from '../../context/authContext';
import { useQuery } from '@tanstack/react-query';
import { makeRequest } from '../../axios';
import emptyProfilePic from '../../assets/emptyProfilePic.jpg';
import blackCover from '../../assets/blackCover.jpg';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../../firebase';
import axios from 'axios';

const UpdateProfile = () => {
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const params = useParams();
  const navigate = useNavigate();

  const profilePicRef = useRef(null);
  const coverPicRef = useRef(null);

  const [profilePic, setProfilePic] = useState(undefined);
  const [coverPic, setCoverPic] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formError, setFormError] = useState(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    id: currentUser.id,
    username: currentUser.username,
    coverPic: currentUser.coverPic,
    profilePic: currentUser.profilePic,
    name: currentUser.name,
    city: currentUser.city,
    website: currentUser.website,
  });

  const { isPending, error, data } = useQuery({
    queryKey: ['user', params.id],
    queryFn: async () =>
      await makeRequest.get(`/users/${params.id}`).then((res) => {
        return res.data;
      }),
  });

  useEffect(() => {
    if (profilePic) {
      handleFileUpload(profilePic, 'profilePic');
    }
  }, [profilePic]);

  useEffect(() => {
    if (coverPic) {
      handleFileUpload(coverPic, 'coverPic');
    }
  }, [coverPic]);

  const handleFileUpload = (file, type) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, [type]: downloadURL });
        });
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(
        `http://localhost:8080/api/users/update/${currentUser.id}`,
        formData,
        { withCredentials: true }
      );
      setFormError('');
      setLoading(false);
      setCurrentUser(res.data);
      navigate(`/profile/${data[0].id}`);
    } catch (error) {
      setLoading(false);
      setFormError(error.response.data.message);
    }
  };

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
                  onClick={() => coverPicRef.current.click()}
                >
                  <img
                    src={
                      data[0].coverPic
                        ? data[0].coverPic
                        : formData.coverPic
                        ? formData.coverPic
                        : blackCover
                    }
                    alt="cover-pic"
                  />
                  <AddIcon className="addIcon" />
                </div>
                <div
                  className="profile"
                  onClick={() => profilePicRef.current.click()}
                >
                  <img
                    src={
                      data[0].profilePic
                        ? data[0].profilePic
                        : formData.profilePic
                        ? formData.profilePic
                        : emptyProfilePic
                    }
                    alt="profile-pic"
                  />
                  <AddIcon className="addIcon" />
                </div>
              </div>
              <p
                style={{
                  marginTop: '120px',
                  textAlign: 'center',
                  marginBottom: '0px',
                }}
              >
                {fileUploadError ? (
                  <span>Error Image upload</span>
                ) : filePerc > 0 && filePerc < 100 ? (
                  <span>{`Uploading ${filePerc}%`}</span>
                ) : filePerc === 100 ? (
                  <span>Image succesfully uploaded!</span>
                ) : (
                  '  '
                )}
              </p>

              <form onSubmit={handleSubmit} className="updateForm">
                <input
                  ref={coverPicRef}
                  onChange={(e) => setCoverPic(e.target.files[0])}
                  type="file"
                  hidden
                  accept="image/*"
                />
                <input
                  ref={profilePicRef}
                  onChange={(e) => setProfilePic(e.target.files[0])}
                  type="file"
                  hidden
                  accept="image/*"
                />

                <div className="inputCont">
                  <label>Name</label>
                  <input
                    type="text"
                    id="name"
                    defaultValue={data[0].name}
                    onChange={handleChange}
                  />
                </div>

                <div className="inputCont">
                  <label>City</label>
                  <input
                    type="text"
                    id="city"
                    defaultValue={data[0].city}
                    onChange={handleChange}
                  />
                </div>
                <div className="inputCont">
                  <label>Website</label>
                  <input
                    type="text"
                    id="website"
                    defaultValue={data[0].website}
                    onChange={handleChange}
                  />
                </div>

                <button type="submit">Update</button>
              </form>
              {formError && <p style={{ color: 'red' }}>{formError}</p>}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default UpdateProfile;
