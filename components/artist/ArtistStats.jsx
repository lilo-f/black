import '../../styles/ArtistStats.css'
const ArtistStats = ({ stats }) => {
    return (
      <div className="artist-stats">
        <div className="stat-item">
          <span className="stat-number">{stats.tattoos.toLocaleString()}+</span>
          <span className="stat-label">Tatuagens</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{stats.clients.toLocaleString()}+</span>
          <span className="stat-label">Clientes</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{stats.awards}</span>
          <span className="stat-label">Prêmios</span>
        </div>
      </div>
    );
  };
  
  export default ArtistStats;