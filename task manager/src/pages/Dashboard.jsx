import { useEffect, useState } from 'react'
import axios from 'axios'

const API = 'http://localhost:5000/users'

export default function Dashboard(){
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [form, setForm] = useState({ name:'', email:'', password:'', role:'User' })

  async function load(){
    try{
      const { data } = await axios.get(API)
      setUsers(data)
    }catch(e){
      setError('Failed to load users')
    }finally{
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  const startEdit = (u) => {
    setEditingId(u.id)
    setForm({ name:u.name, email:u.email, password:u.password, role:u.role })
  }
  const cancelEdit = () => {
    setEditingId(null)
    setForm({ name:'', email:'', password:'', role:'User' })
  }
  const saveEdit = async (id) => {
    const { data } = await axios.put(`${API}/${id}`, { id, ...form })
    setUsers(users.map(u => u.id === id ? data : u))
    cancelEdit()
  }
  const remove = async (id) => {
    await axios.delete(`${API}/${id}`)
    setUsers(users.filter(u => u.id !== id))
  }

  if(loading) return <p>Loading users...</p>
  if(error) return <p className="error">{error}</p>

  return (
    <section>
      <h2>Dashboard (All Users)</h2>
      <div className="table">
        <div className="row head">
          <div>Name</div><div>Email</div><div>Role</div><div>Actions</div>
        </div>
        {users.map(u => (
          <div className="row" key={u.id}>
            {editingId === u.id ? (
              <>
                <div><input value={form.name} onChange={e=>setForm({...form, name:e.target.value})} /></div>
                <div><input value={form.email} onChange={e=>setForm({...form, email:e.target.value})} /></div>
                <div>
                  <select value={form.role} onChange={e=>setForm({...form, role:e.target.value})}>
                    <option>User</option><option>Admin</option>
                  </select>
                </div>
                <div>
                  <button className="btn primary" onClick={()=>saveEdit(u.id)}>Save</button>
                  <button className="btn" onClick={cancelEdit}>Cancel</button>
                </div>
              </>
            ) : (
              <>
                <div>{u.name}</div>
                <div>{u.email}</div>
                <div><span className={`badge ${u.role==='Admin'?'admin':'user'}`}>{u.role}</span></div>
                <div>
                  <button className="btn" onClick={()=>startEdit(u)}>Edit</button>
                  <button className="btn danger" onClick={()=>remove(u.id)}>Delete</button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}