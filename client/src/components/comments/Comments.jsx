import { useContext, useState } from 'react';
import './comments.scss';
import { AuthContext } from '../../context/authContext';
import emptyProfilePic from '../../assets/emptyProfilePic.jpg';
import { useQuery } from '@tanstack/react-query';
import { makeRequest } from '../../axios';
import moment from 'moment';

const Comments = ({ postId }) => {
  const { currentUser } = useContext(AuthContext);

  const { isPending, error, data } = useQuery({
    queryKey: ['comments'],
    queryFn: async () =>
      await makeRequest.get('/comments?postId=' + postId).then((res) => {
        // console.log(res.data);
        return res.data;
      }),
  });

  return (
    <div className="comments">
      <div className="write">
        <img
          src={
            currentUser.profilePic ? currentUser.profilePic : emptyProfilePic
          }
          alt="profile-pic"
        />
        <input type="text" id="comment" placeholder="write a comment" />
        <button>Send</button>
      </div>
      {isPending
        ? 'Loading...'
        : data.map((comment) => (
            <div className="comment">
              <div className="info">
                <div className="user">
                  <img
                    src={
                      comment.profilePic ? comment.profilePic : emptyProfilePic
                    }
                    alt="user-profile"
                  />
                  <span>{comment.name}</span>
                </div>
                <span className="date">
                  {moment(comment.createdAt).fromNow()}
                </span>
              </div>

              <p>{comment.desc}</p>
            </div>
          ))}
    </div>
  );
};

export default Comments;
