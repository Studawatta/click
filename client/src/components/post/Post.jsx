import './post.scss';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import TextsmsOutlinedIcon from '@mui/icons-material/TextsmsOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import Comments from '../comments/Comments';
import emptyProfilePic from '../../assets/emptyProfilePic.jpg';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { makeRequest } from '../../axios';
import { AuthContext } from '../../context/authContext';
import moment from 'moment';

const Post = ({ post }) => {
  const { currentUser } = useContext(AuthContext);
  const [commentOpen, setCommentOpen] = useState(false);

  const { isPending, error, data } = useQuery({
    queryKey: ['likes', post.id],
    queryFn: async () =>
      await makeRequest.get('/likes?postId=' + post.id).then((res) => {
        return res.data;
      }),
  });

  const { isPending: commentLoading, data: comments } = useQuery({
    queryKey: ['comments', post.id],
    queryFn: async () =>
      await makeRequest.get('/comments?postId=' + post.id).then((res) => {
        return res.data;
      }),
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (liked) => {
      if (liked) return makeRequest.delete('/likes?postId=' + post.id);
      return makeRequest.post('/likes', { postId: post.id });
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['likes'] });
    },
  });

  const handleLike = () => {
    mutation.mutate(data.includes(currentUser.id));
  };

  return (
    <div className="post">
      <div className="container">
        <div className="user">
          <div className="userInfo">
            <img
              src={post.profilePic ? post.profilePic : emptyProfilePic}
              alt="profile-pic"
            />
            <div className="details">
              <Link
                to={`/profile/${post.userId}`}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <span className="name">{post.name}</span>
              </Link>
              <span className="date">{moment(post.createdAt).fromNow()}</span>
            </div>
          </div>
          <MoreHorizIcon />
        </div>
        <div className="content">
          <p>{post.desc}</p>
          {post.img && <img src={post.img} alt="post-img" />}
        </div>
        <div className="info">
          {isPending ? (
            'Loading'
          ) : (
            <div className="item">
              {data.includes(currentUser.id) ? (
                <FavoriteOutlinedIcon
                  style={{ color: 'red' }}
                  onClick={handleLike}
                />
              ) : (
                <FavoriteBorderOutlinedIcon onClick={handleLike} />
              )}
              {data.length === 1
                ? `${data.length} Like`
                : `${data.length} Likes`}
            </div>
          )}

          {commentLoading ? (
            'Loadin...'
          ) : (
            <div className="item" onClick={() => setCommentOpen(!commentOpen)}>
              <TextsmsOutlinedIcon />
              {comments.length === 1
                ? `${comments.length} Comment`
                : `${comments.length} Comments`}
            </div>
          )}
          <div className="item">
            <ShareOutlinedIcon />
            Share
          </div>
        </div>
        {commentOpen && <Comments postId={post.id} />}
      </div>
    </div>
  );
};

export default Post;
