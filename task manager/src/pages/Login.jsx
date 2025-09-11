import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../AuthContext.jsx'

export default function Login(){
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [form, setForm] = useState({ email:'', password:'' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const onChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const onSubmit = async e => {
    e.preventDefault()
    setError(''); setLoading(true)
    try{
      const user = await login(form.email, form.password)
      const from = location.state?.from?.pathname
      if(from) return navigate(from, { replace: true })
      navigate(user.role === 'Admin' ? '/dashboard' : '/profile')
    }catch(err){
      setError(err.message || 'Login failed')
    }finally{
      setLoading(false)
    }
  }

  return (
    <section className="card">
      <h2>Welcome back</h2>
      <form onSubmit={onSubmit} className="form">
        <label>
          Email
          <input type="email" name="email" value={form.email} onChange={onChange} placeholder="you@example.com" />
        </label>
        <label>
          Password
          <input type="password" name="password" value={form.password} onChange={onChange} placeholder="••••••••" />
        </label>
        {error && <p className="error">{error}</p>}
        <button className="btn primary" disabled={loading}>{loading ? 'Signing in...' : 'Login'}</button>
      </form>
    </section>
  )
}