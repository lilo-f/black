import { useState, useEffect } from 'react';
import '../styles/InstagramFeed.css';
const InstagramFeed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulação de dados sem API
    const mockPosts = [
      {
        id: 1,
        image: "/images/instagram/post1.jpg",
        likes: 342,
        comments: 28,
        caption: "Novo trabalho feito hoje pelo @rafaelink #blackinkmasters"
      },
      // +5 posts...
    ];
    
    setTimeout(() => {
      setPosts(mockPosts);
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <section className="instagram-feed">
      <h2>Siga-nos no Instagram</h2>
      <p>@blackinkmasters</p>
      
      {loading ? (
        <div className="loading-posts">
          <div className="loading-spinner"></div>
        </div>
      ) : (
        <div className="instagram-grid">
          {posts.map((post) => (
            <div key={post.id} className="instagram-post">
              <img src={post.image} alt="Post do Instagram" />
              <div className="post-overlay">
                <div className="post-stats">
                  <span>❤️ {post.likes}</span>
                  <span>💬 {post.comments}</span>
                </div>
                <p className="post-caption">{post.caption}</p>
              </div>
            </div>
          ))}
        </div>
      )}
      
      <a 
        href="https://instagram.com/blackinkmasters" 
        target="_blank" 
        rel="noopener noreferrer"
        className="instagram-button"
      >
        Ver Mais no Instagram
      </a>
    </section>
  );
};

export default InstagramFeed;