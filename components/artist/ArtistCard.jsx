import React from 'react';
import '../../styles/ArtistCard.css'
const ArtistCard = ({ artist }) => {
  return (
    <div className="artist-card">
      <img src={artist.profileImage} alt={artist.name} />
      <h3>{artist.name}</h3>
      <p>{artist.specialty}</p>
    </div>
  );
};

export default ArtistCard; // ← Isso é essencial