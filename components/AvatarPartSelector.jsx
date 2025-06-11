const AvatarPartSelector = ({ part, options, current, onChange }) => {
  return (
    <div className="part-selector">
      <h3>{part.charAt(0).toUpperCase() + part.slice(1)}</h3>
      <div className="options">
        {options.map(option => (
          <div 
            key={option}
            className={`option ${current === option ? 'selected' : ''}`}
            onClick={() => onChange(part, option)}
          >
            {option === 'none' ? 'Nenhum' : option}
          </div>
        ))}
      </div>
    </div>
  )
}

export default AvatarPartSelector