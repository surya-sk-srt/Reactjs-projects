import { useState } from 'react'
import { useAuth } from '../AuthContext.jsx'

export default function Profile(){
  const { user, updateMe } = useAuth()
  const [form, setForm] = useState({ name:user.name, email:user.email, password:user.password, role:user.role })
  const [status, setStatus] = useState('')

  const onSubmit = async e => {
    e.preventDefault()
    setStatus('')
    try{
      await updateMe(form)
      setStatus('Saved!')
    }catch(e){
      setStatus('Update failed')
    }
  }

  return (
    <section className="card">
      <h2>My Profile</h2>
      <form onSubmit={onSubmit} className="form">
        <label>
          Name
          <input value={form.name} onChange={e=>setForm({...form, name:e.target.value})} />
        </label>
        <label>
          Email
          <input type="email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} />
        </label>
        <label>
          Password
          <input type="password" value={form.password} onChange={e=>setForm({...form, password:e.target.value})} />
        </label>
        <label>
          Role
          <select value={form.role} onChange={e=>setForm({...form, role:e.target.value})} disabled>
            <option>User</option><option>Admin</option>
          </select>
        </label>
        {status && <p className="hint">{status}</p>}
        <button className="btn primary">Save</button>
      </form>
    </section>
  )
}