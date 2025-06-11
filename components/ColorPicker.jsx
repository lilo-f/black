// import { useState } from 'react'

// const ColorPicker = ({ label, color, onChange }) => {
//   const [showPicker, setShowPicker] = useState(false)
  
//   return (
//     <div className="color-picker">
//       <label>{label}</label>
//       <div 
//         className="color-display" 
//         style={{ backgroundColor: color }}
//         onClick={() => setShowPicker(!showPicker)}
//       />
//       {showPicker && (
//         <div className="picker-popup">
//           <input 
//             type="color" 
//             value={color} 
//             onChange={(e) => onChange(e.target.value)} 
//           />
//           <button onClick={() => setShowPicker(false)}>Fechar</button>
//         </div>
//       )}
//     </div>
//   )
// }

// export default ColorPicker