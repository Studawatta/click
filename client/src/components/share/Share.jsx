import './share.scss';
import Image from '../../assets/img.png';
import Map from '../../assets/map.png';
import Friend from '../../assets/friend.png';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/authContext';
import emptyProfilePic from '../../assets/emptyProfilePic.jpg';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { makeRequest } from '../../axios';

import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
  deleteObject,
} from 'firebase/storage';
import { app } from '../../firebase';
const Share = () => {
  const { currentUser } = useContext(AuthContext);

  const [file, setFile] = useState(null);
  const [postImg, setPostImg] = useState(null);
  const [postDesc, setPostDesc] = useState('');
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);

  const [showPostImage, setShowPostImage] = useState(false);

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
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
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURl) => {
          // setFormData({ ...formData, img: downloadURl });
          setPostImg(downloadURl);
        });
      }
    );
    setShowPostImage(true);
  };

  const removeImage = () => {
    // const storage = getStorage(app);
    // const desertRef = ref(storage, formData.img);
    // deleteObject(desertRef);
    setPostImg(null);
    setShowPostImage(false);
  };

  // const handleChange = (e) => {
  //   setFormData({ ...formData, [e.target.id]: e.target.value });
  // };

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (newPost) => {
      return makeRequest.post('/posts', newPost);
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });

  const handleShare = (e) => {
    e.preventDefault();
    mutation.mutate({
      desc: postDesc,
      img: postImg,
    });
    setPostDesc('');
    setPostImg(null);
  };
  console.log(postDesc);
  return (
    <div className="share">
      <div className="container">
        <div className="top">
          <img
            src={
              currentUser.profilePic ? currentUser.profilePic : emptyProfilePic
            }
            alt=""
          />
          <input
            type="text"
            value={postDesc}
            id="desc"
            placeholder={`What's on your mind ${currentUser.name}?`}
            onChange={(e) => setPostDesc(e.target.value)}
          />
        </div>
        {postImg && showPostImage && (
          <div className="postImageContainer">
            <span onClick={removeImage}>X</span>
            <img src={postImg} alt="post-image" className="postImage" />
          </div>
        )}

        <hr />
        <div className="bottom">
          <div className="left">
            <input
              type="file"
              id="file"
              style={{ display: 'none' }}
              onChange={(e) => setFile(e.target.files[0])}
              // onChange={(e) => setFile(e.target.files[0])}
            />
            <label htmlFor="file">
              <div className="item">
                <img src={Image} alt="" />
                <span>Add Image</span>
              </div>
            </label>
            <div className="item">
              <img src={Map} alt="" />
              <span>Add Place</span>
            </div>
            <div className="item">
              <img src={Friend} alt="" />
              <span>Tag Friends</span>
            </div>
          </div>
          <div className="right">
            <button onClick={handleShare}>Share</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Share;
