import '../../styles/GalleryFilter.css'
const GalleryFilter = ({ categories, currentFilter, onFilterChange }) => {
    return (
      <div className="gallery-filter">
        {categories.map(category => (
          <button
            key={category}
            className={`filter-button ${currentFilter === category ? 'active' : ''}`}
            onClick={() => onFilterChange(category)}
          >
            {category === 'all' ? 'Todos' : category.split('-').map(word => 
              word.charAt(0).toUpperCase() + word.slice(1)
            ).join(' ')}
          </button>
        ))}
      </div>
    );
  };
  
  export default GalleryFilter;