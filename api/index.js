import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.route.js';
import userRoutes from './routes/users.route.js';
import postRoutes from './routes/posts.route.js';
import likeRoutes from './routes/likes.route.js';
import commentRoutes from './routes/comments.route.js';
import relationshipRoutes from './routes/relationship.route.js';

const port = process.env.PORT || 5000;

dotenv.config();
const app = express();

app.set('trust proxy', 1);

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Credentials', true);
  next();
});

app.use(express.json());

app.use(
  cors({
    origin: 'http://localhost:5173',
  })
);
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/likes', likeRoutes);
app.use('/api/relationships', relationshipRoutes);

//error handling middleware

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal server error';

  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

app.listen(port, () => {
  console.log(`Server is runing on port ${port}!`);
});
