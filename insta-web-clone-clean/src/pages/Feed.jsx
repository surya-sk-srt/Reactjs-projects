import { useEffect, useState } from 'react';
import axios from 'axios';
import PostCard from '../components/PostCard.jsx';
import StoryStrip from '../components/StoryStrip.jsx';
import { useAuth } from '../context/AuthContext.jsx';

export default function Feed() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  async function load() {
    setLoading(true);
    const { data } = await axios.get('http://localhost:5000/posts?_sort=createdAt&_order=desc');
    setPosts(data);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="layout">
      <div className="left-col">
        <StoryStrip />

        {loading ? (
          <p>Loading feed...</p>
        ) : (
          posts.map((p) => <PostCard key={p.id} post={p} refresh={load} />)
        )}
      </div>

      <aside className="right-col">
        <div className="card suggestion">
          <h4>Suggestions for you</h4>
          <SuggestList />
        </div>
      </aside>
    </div>
  );
}

function SuggestList() {
  const [list, setList] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/suggestions').then((r) => setList(r.data));
  }, []);

  return (
    <div style={{ display: 'grid', gap: 8 }}>
      {list.map((s) => (
        <div key={s.id} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <img src={s.avatar} alt={s.username} style={{ width: 40, height: 40, borderRadius: 999 }} />
          <div>
            <div style={{ fontWeight: 700 }}>@{s.username}</div>
            <div className="muted">Suggested</div>
          </div>
          <button className="btn" style={{ marginLeft: 'auto' }}>Follow</button>
        </div>
      ))}
    </div>
  );
}