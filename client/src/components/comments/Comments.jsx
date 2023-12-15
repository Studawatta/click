import { useContext, useState } from 'react';
import './comments.scss';
import { AuthContext } from '../../context/authContext';
import emptyProfilePic from '../../assets/emptyProfilePic.jpg';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { makeRequest } from '../../axios';
import moment from 'moment';

const Comments = ({ postId }) => {
  const { currentUser } = useContext(AuthContext);

  const [comment, setComment] = useState('');

  const { isPending, error, data } = useQuery({
    queryKey: ['comments'],
    queryFn: async () =>
      await makeRequest.get('/comments?postId=' + postId).then((res) => {
        // console.log(res.data);
        return res.data;
      }),
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (newComment) => {
      return makeRequest.post('/comments', newComment);
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['comments'] });
    },
  });

  const handleComment = (e) => {
    e.preventDefault();
    mutation.mutate({
      desc: comment,
      postId: postId,
    });
    setComment('');
  };
  console.log(comment);
  return (
    <div className="comments">
      <div className="write">
        <img
          src={
            currentUser.profilePic ? currentUser.profilePic : emptyProfilePic
          }
          alt="profile-pic"
        />
        <form>
          <input
            type="text"
            id="comment"
            value={comment}
            placeholder="write a comment"
            onChange={(e) => setComment(e.target.value)}
          />
          <button onClick={handleComment}>Send</button>
        </form>
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
