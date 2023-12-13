import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './register.scss';
import OAuth from '../../components/OAuth/OAuth';

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(
        'http://localhost:8080/api/auth/register',
        formData
      );

      setError('');
      setLoading(false);
      navigate('/login');
    } catch (error) {
      setLoading(false);
      setError(error.response.data.message);
      // console.log(error.response.data);
    }
  };
  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h1>Click</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero cum,
            alias totam numquam ipsa exercitationem dignissimos, error nam,
            consequatur.
          </p>
          <span>Do you have an account?</span>
          <Link to={'/login'}>
            <button>Login</button>
          </Link>
        </div>
        <div className="right">
          <h1>Register</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              id="username"
              placeholder="Username"
              onChange={handleChange}
            />
            <input
              type="email"
              id="email"
              placeholder="email"
              onChange={handleChange}
            />
            <input
              type="password"
              id="password"
              placeholder="Password"
              onChange={handleChange}
            />
            <input
              type="text"
              id="name"
              placeholder="Name"
              onChange={handleChange}
            />
            <button className="regButton" type="submit">
              {loading ? 'Loading' : 'Register'}
            </button>
            <OAuth />
          </form>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default Register;
