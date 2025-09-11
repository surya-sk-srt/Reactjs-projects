import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await login(form.email, form.password);
      navigate('/feed');
    } catch (err) {
      setError(err.message || 'Login failed');
    }
  };

  return (
    <section className="auth-wrap">
      <div className="auth-card card">
        <h2>Sign in</h2>
        <form onSubmit={onSubmit} className="form">
          <input name="email" placeholder="Email" value={form.email} onChange={onChange} />
          <input name="password" type="password" placeholder="Password" value={form.password} onChange={onChange} />
          {error && <p className="error">{error}</p>}
          <button className="btn primary">Login</button>
        </form>
      </div>
    </section>
  );
}