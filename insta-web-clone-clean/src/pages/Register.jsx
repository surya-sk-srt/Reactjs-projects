import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', email: '', password: '', bio: '', avatar: '' });
  const [error, setError] = useState('');

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await register(form);
      navigate('/feed');
    } catch (err) {
      setError(err.message || 'Registration failed');
    }
  };

  return (
    <section className="auth-wrap">
      <div className="auth-card card">
        <h2>Create account</h2>
        <form onSubmit={onSubmit} className="form">
          <input name="username" placeholder="Username" value={form.username} onChange={onChange} />
          <input name="email" placeholder="Email" value={form.email} onChange={onChange} />
          <input name="password" type="password" placeholder="Password" value={form.password} onChange={onChange} />
          <input name="bio" placeholder="Bio" value={form.bio} onChange={onChange} />
          <input name="avatar" placeholder="Avatar URL (optional)" value={form.avatar} onChange={onChange} />
          {error && <p className="error">{error}</p>}
          <button className="btn primary">Register</button>
        </form>
      </div>
    </section>
  );
}