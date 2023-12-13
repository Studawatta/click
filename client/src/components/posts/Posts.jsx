import './posts.scss';
import Post from '../post/Post';
import { useQuery } from '@tanstack/react-query';
import { makeRequest } from '../../axios';

const Posts = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ['posts'],
    queryFn: async () =>
      await makeRequest.get('/posts').then((res) => {
        // console.log(res.data);
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
