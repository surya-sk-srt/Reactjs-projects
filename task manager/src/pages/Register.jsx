import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../AuthContext.jsx'

export default function Register(){
  const { register } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ name:'', email:'', password:'', role:'User' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const onChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const onSubmit = async e => {
    e.preventDefault()
    setError(''); setLoading(true)
    try{
      await register(form)
      navigate('/login')
    }catch(err){
      setError(err.message || 'Registration failed')
    }finally{
      setLoading(false)
    }
  }

  return (
    <section className="card">
      <h2>Create Account</h2>
      <form onSubmit={onSubmit} className="form">
        <label>
          Name
          <input name="name" value={form.name} onChange={onChange} placeholder="Jane Doe" />
        </label>
        <label>
          Email
          <input type="email" name="email" value={form.email} onChange={onChange} placeholder="jane@example.com" />
        </label>
        <label>
          Password
          <input type="password" name="password" value={form.password} onChange={onChange} placeholder="••••••••" />
        </label>
        <label>
          Role
          <select name="role" value={form.role} onChange={onChange}>
            <option>User</option>
            <option>Admin</option>
          </select>
        </label>
        {error && <p className="error">{error}</p>}
        <button className="btn primary" disabled={loading}>{loading ? 'Creating...' : 'Register'}</button>
      </form>
    </section>
  )
}