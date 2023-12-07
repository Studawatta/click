import express from 'express';
import dotenv from 'dotenv';
// import authRoutes from './routes/auth.route.js';
// import userRoutes from './routes/users.route.js';
// import postRoutes from './routes/posts.route.js';
// import likeRoutes from './routes/likes.route.js';
// import commentRoutes from './routes/comments.route.js';

const port = process.env.PORT || 8800;

dotenv.config();
const app = express();

app.use(express.json());

// app.use('/api/auth', authRoutes);
// app.use('/api/users', userRoutes);
// app.use('/api/posts', postRoutes);
// app.use('/api/comments', commentRoutes);
// app.use('/api/likes', likeRoutes);

app.listen(port, () => {
  console.log(`Server is runing on port ${port}!`);
});
