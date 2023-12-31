import './posts.scss';
import Post from '../post/Post';
import { useQuery } from '@tanstack/react-query';
import { makeRequest } from '../../axios';

const Posts = ({ user }) => {
  const { isPending, error, data } = useQuery({
    queryKey: ['posts', user],
    queryFn: async () =>
      await makeRequest.get(user ? `/posts/${user}` : '/posts').then((res) => {
        return res.data;
      }),
  });

  return (
    <div className="posts">
      {error
        ? 'Something went wrong!'
        : isPending
        ? 'loading'
        : data.map((post) => <Post post={post} key={post.id} />)}
    </div>
  );
};

export default Posts;
