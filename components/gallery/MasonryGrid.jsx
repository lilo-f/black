import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import '../../styles/MasonryGrid.css'
const MasonryGrid = ({ items, onItemClick }) => {
  const [columnCount, setColumnCount] = useState(3);

  useEffect(() => {
    const updateColumnCount = () => {
      if (window.innerWidth < 768) {
        setColumnCount(1);
      } else if (window.innerWidth < 1024) {
        setColumnCount(2);
      } else {
        setColumnCount(3);
      }
    };

    updateColumnCount();
    window.addEventListener('resize', updateColumnCount);
    
    return () => window.removeEventListener('resize', updateColumnCount);
  }, []);

  const columns = Array.from({ length: columnCount }, () => []);

  items.forEach((item, index) => {
    columns[index % columnCount].push(item);
  });

  return (
    <div className="masonry-grid" style={{ '--columns': columnCount }}>
      {columns.map((column, colIndex) => (
        <div key={colIndex} className="masonry-column">
          {column.map((item) => (
            <motion.div
              key={item.id}
              className="masonry-item"
              onClick={() => onItemClick(item)}
              whileHover={{ scale: 1.02 }}
              layout
            >
              <img 
                src={item.image} 
                alt={item.title}
                loading="lazy"
              />
              <div className="item-info">
                <h4>{item.title}</h4>
                <p>Por {item.artist}</p>
              </div>
            </motion.div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default MasonryGrid;