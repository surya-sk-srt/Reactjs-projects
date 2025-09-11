import { useEffect, useState } from 'react';
import axios from 'axios';
import { FiHeart, FiMessageCircle } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext.jsx';

export default function PostCard({ post, refresh }) {
  const { user } = useAuth();
  const [likes, setLikes] = useState(post.likes || 0);
  const [comments, setComments] = useState([]);
  const [text, setText] = useState('');
  const [loadingComments, setLoadingComments] = useState(true);

  useEffect(() => {
    async function loadComments() {
      setLoadingComments(true);
      const { data } = await axios.get(`http://localhost:5000/comments?postId=${post.id}&_sort=createdAt&_order=desc`);
      setComments(data);
      setLoadingComments(false);
    }
    loadComments();
  }, [post.id]);

  const doLike = async () => {
    const newLikes = likes + 1;
    await axios.patch(`http://localhost:5000/posts/${post.id}`, { likes: newLikes });
    setLikes(newLikes);
  };

  const submitComment = async (e) => {
    e.preventDefault();
    if (!user) return alert('Login to comment');
    const payload = {
      postId: post.id,
      userId: user.id,
      username: user.username,
      text,
      createdAt: new Date().toISOString()
    };
    await axios.post('http://localhost:5000/comments', payload);
    setText('');
    if (refresh) refresh();
    const { data } = await axios.get(`http://localhost:5000/comments?postId=${post.id}&_sort=createdAt&_order=desc`);
    setComments(data);
  };

  return (
    <article className="post card">
      <div className="post-head">
        <div className="post-user">
          <img src={post.userAvatar || 'https://i.pravatar.cc/40'} alt="" />
          <strong>@{post.username}</strong>
        </div>
        <div className="post-time">{new Date(post.createdAt).toLocaleString()}</div>
      </div>

      <div className="post-image">
        <img src={post.image} alt={post.caption} />
      </div>

      <div className="post-body">
        <div className="post-actions">
          <button className="icon-btn" onClick={doLike}>
            <FiHeart /> <span>{likes}</span>
          </button>
          <button className="icon-btn">
            <FiMessageCircle /> <span>{comments.length}</span>
          </button>
        </div>

        <div className="post-caption">
          <strong>@{post.username}</strong> {post.caption}
        </div>

        <div className="comments">
          {loadingComments ? (
            <p className="muted">Loading comments...</p>
          ) : (
            comments.map((c) => (
              <div key={c.id} className="comment">
                <strong>@{c.username}</strong> {c.text}
              </div>
            ))
          )}
        </div>

        <form className="comment-form" onSubmit={submitComment}>
          <input
            placeholder="Add a comment..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button className="btn" type="submit">Post</button>
        </form>
      </div>
    </article>
  );
}