import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import PostCard from '../components/PostCard.jsx';

export default function Profile() {
  const { id } = useParams();
  const [userData, setUserData] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function load() {
      const { data } = await axios.get(`http://localhost:5000/users/${id}`);
      setUserData(data);
      const { data: p } = await axios.get(`http://localhost:5000/posts?userId=${id}&_sort=createdAt&_order=desc`);
      setPosts(p);
    }
    load();
  }, [id]);

  if (!userData) return <p>Loading...</p>;

  return (
    <div className="profile-layout">
      <div className="profile-header card">
        <img src={userData.avatar || 'https://i.pravatar.cc/150'} alt={userData.username} className="avatar-large" />
        <div>
          <h2>@{userData.username}</h2>
          <p className="muted">{userData.bio}</p>
        </div>
      </div>

      <div className="grid profile-grid">
        {posts.map((p) => (
          <PostCard key={p.id} post={p} />
        ))}
      </div>
    </div>
  );
}