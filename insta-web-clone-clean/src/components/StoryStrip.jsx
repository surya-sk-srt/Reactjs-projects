import { useEffect, useState } from 'react';
import axios from 'axios';

export default function StoryStrip() {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/stories').then((r) => setStories(r.data));
  }, []);

  return (
    <div className="stories card">
      {stories.map((s) => (
        <div key={s.id} className="story">
          <img src={s.avatar} alt={s.username} />
          <div className="story-name">{s.username}</div>
        </div>
      ))}
    </div>
  );
}