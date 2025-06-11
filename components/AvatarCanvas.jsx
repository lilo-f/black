// import { useMemo } from 'react';

// const AvatarCanvas = ({ avatar }) => {
//   const avatarSvg = useMemo(() => {
//     // Sistema de proporções baseadas no formato do rosto
//     const faceDimensions = {
//       round: { width: 160, height: 160, y: 80 },
//       oval: { width: 150, height: 180, y: 70 },
//       square: { width: 160, height: 160, y: 80 }
//     };

//     const { width: faceW, height: faceH, y: faceY } = faceDimensions[avatar.faceShape];
//     const faceX = 150 - faceW/2;
    
//     // Sistema de cabelo adaptável
//     const hairStyles = {
//       short: {
//         path: `M${faceX-10},${faceY+10} Q150,${faceY-30} ${faceX+faceW+10},${faceY+10} Q${faceX+faceW-20},${faceY+faceH+20} 150,${faceY+faceH+30} Q${faceX+20},${faceY+faceH+20} ${faceX-10},${faceY+10}`,
//         scale: 1
//       },
//       long: {
//         path: `M${faceX-15},${faceY+5} Q150,${faceY-40} ${faceX+faceW+15},${faceY+5} Q${faceX+faceW+10},${faceY+faceH+80} 150,${faceY+faceH+90} Q${faceX-10},${faceY+faceH+80} ${faceX-15},${faceY+5}`,
//         scale: 1.05
//       },
//       curly: {
//         path: `M${faceX-20},${faceY} Q${faceX+20},${faceY-50} ${faceX+60},${faceY} Q${faceX+90},${faceY-20} ${faceX+faceW+20},${faceY} Q${faceX+faceW+10},${faceY+faceH+70} 150,${faceY+faceH+80} Q${faceX-10},${faceY+faceH+70} ${faceX-20},${faceY}`,
//         scale: 1.1
//       },
//       bald: {
//         path: '',
//         scale: 1
//       }
//     };

//     // Acessórios adaptáveis
//     const accessories = {
//       glasses: {
//         path: `
//           <rect x="${faceX+20}" y="${faceY+faceH*0.3}" width="${faceW*0.3}" height="${faceH*0.15}" rx="5" fill="none" stroke="#333" stroke-width="2" />
//           <rect x="${faceX+faceW*0.5}" y="${faceY+faceH*0.3}" width="${faceW*0.3}" height="${faceH*0.15}" rx="5" fill="none" stroke="#333" stroke-width="2" />
//           <line x1="${faceX+faceW*0.5}" y1="${faceY+faceH*0.38}" x2="${faceX+faceW*0.5}" y2="${faceY+faceH*0.42}" stroke="#333" stroke-width="2" />
//           <path d="M${faceX+10} ${faceY+faceH*0.35} L${faceX-15} ${faceY+faceH*0.3}" stroke="#333" stroke-width="1.5" />
//           <path d="M${faceX+faceW-10} ${faceY+faceH*0.35} L${faceX+faceW+15} ${faceY+faceH*0.3}" stroke="#333" stroke-width="1.5" />
//         `,
//         yOffset: 0
//       },
//       hat: {
//         path: `
//           <ellipse cx="150" cy="${faceY-15}" rx="${faceW*0.6}" ry="${faceH*0.15}" fill="#333" />
//           <rect x="${faceX-20}" y="${faceY-10}" width="${faceW+40}" height="${faceH*0.2}" rx="10" fill="#333" />
//         `,
//         yOffset: -20
//       }
//     };

//     return (
//       <svg width="300" height="300" viewBox="0 0 300 300">
//         {/* Fundo com gradiente sutil */}
//         <defs>
//           <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
//             <stop offset="0%" stopColor={avatar.bgColor} />
//             <stop offset="100%" stopColor={avatar.bgColor2 || avatar.bgColor} />
//           </linearGradient>
//           <clipPath id="faceClip">
//             <path d={
//               avatar.faceShape === 'round' ? 
//               `M150,${faceY} a${faceW/2},${faceH/2} 0 1 1 0,${faceH} a${faceW/2},${faceH/2} 0 1 1 0,-${faceH}` :
//               avatar.faceShape === 'square' ?
//               `M${faceX},${faceY} h${faceW} v${faceH} h-${faceW} z` :
//               `M150,${faceY} a${faceW/2},${faceH/2} 0 0 1 0,${faceH} a${faceW/3},${faceH/2} 0 0 1 0,-${faceH}`
//             } />
//           </clipPath>
//         </defs>
        
//         <rect width="300" height="300" fill="url(#bgGradient)" />

//         {/* Cabelo - adapta-se ao formato do rosto */}
//         {avatar.hairStyle !== 'bald' && (
//           <path
//             d={hairStyles[avatar.hairStyle].path}
//             fill={avatar.hairColor}
//             stroke="#333"
//             strokeWidth="1.5"
//             transform={`scale(${hairStyles[avatar.hairStyle].scale}) translate(${(1-hairStyles[avatar.hairStyle].scale)*150}, ${(1-hairStyles[avatar.hairStyle].scale)*150})`}
//           />
//         )}

//         {/* Rosto com formato dinâmico */}
//         <path 
//           d={
//             avatar.faceShape === 'round' ? 
//             `M150,${faceY} a${faceW/2},${faceH/2} 0 1 1 0,${faceH} a${faceW/2},${faceH/2} 0 1 1 0,-${faceH}` :
//             avatar.faceShape === 'square' ?
//             `M${faceX},${faceY} h${faceW} v${faceH} h-${faceW} z` :
//             `M150,${faceY} a${faceW/2},${faceH/2} 0 0 1 0,${faceH} a${faceW/3},${faceH/2} 0 0 1 0,-${faceH}`
//           }
//           fill={avatar.skinColor}
//           stroke="#333"
//           strokeWidth="2"
//         />

//         {/* Características faciais (com clip para não sair do rosto) */}
//         <g clipPath="url(#faceClip)">
//           {/* Olhos - posicionamento proporcional */}
//           <ellipse 
//             cx={faceX + faceW*0.3} 
//             cy={faceY + faceH*0.35} 
//             rx={faceW*0.08} 
//             ry={faceH*0.08} 
//             fill="#fff" 
//             stroke="#333" 
//             strokeWidth="1.5" 
//           />
//           <ellipse 
//             cx={faceX + faceW*0.7} 
//             cy={faceY + faceH*0.35} 
//             rx={faceW*0.08} 
//             ry={faceH*0.08} 
//             fill="#fff" 
//             stroke="#333" 
//             strokeWidth="1.5" 
//           />
          
//           {/* Pupilas - seguem a direção do olhar */}
//           <circle 
//             cx={faceX + faceW*0.3 + (avatar.eyeDirection === 'left' ? -5 : avatar.eyeDirection === 'right' ? 5 : 0)} 
//             cy={faceY + faceH*0.35} 
//             r={faceW*0.04} 
//             fill={avatar.eyeColor || '#2b2b2b'} 
//           />
//           <circle 
//             cx={faceX + faceW*0.7 + (avatar.eyeDirection === 'left' ? -5 : avatar.eyeDirection === 'right' ? 5 : 0)} 
//             cy={faceY + faceH*0.35} 
//             r={faceW*0.04} 
//             fill={avatar.eyeColor || '#2b2b2b'} 
//           />
          
//           {/* Boca - expressões */}
//           {avatar.expression === 'happy' && (
//             <path 
//               d={`M${faceX + faceW*0.3} ${faceY + faceH*0.7} Q150 ${faceY + faceH*0.8} ${faceX + faceW*0.7} ${faceY + faceH*0.7}`}
//               fill="#ff6b6b"
//               stroke="#8b0000"
//               strokeWidth="1.5"
//             />
//           )}
//           {avatar.expression === 'neutral' && (
//             <line 
//               x1={faceX + faceW*0.3} 
//               y1={faceY + faceH*0.7} 
//               x2={faceX + faceW*0.7} 
//               y2={faceY + faceH*0.7} 
//               stroke="#8b0000"
//               strokeWidth="2"
//             />
//           )}
//         </g>

//         {/* Sobrancelhas - expressivas */}
//         <path 
//           d={`M${faceX + faceW*0.2} ${faceY + faceH*0.25} Q${faceX + faceW*0.3} ${faceY + faceH*0.2} ${faceX + faceW*0.4} ${faceY + faceH*0.25}`}
//           fill="none"
//           stroke={avatar.hairColor}
//           strokeWidth="3"
//           strokeLinecap="round"
//         />
//         <path 
//           d={`M${faceX + faceW*0.6} ${faceY + faceH*0.25} Q${faceX + faceW*0.7} ${faceY + faceH*0.2} ${faceX + faceW*0.8} ${faceY + faceH*0.25}`}
//           fill="none"
//           stroke={avatar.hairColor}
//           strokeWidth="3"
//           strokeLinecap="round"
//         />

//         {/* Acessórios - posicionamento perfeito */}
//         {avatar.accessory !== 'none' && (
//           <g dangerouslySetInnerHTML={{ __html: accessories[avatar.accessory].path }} 
//              transform={`translate(0, ${accessories[avatar.accessory].yOffset})`} />
//         )}
//       </svg>
//     );
//   }, [avatar]);

//   return (
//     <div className="avatar-canvas">
//       {avatarSvg}
//       <button className="download-btn" onClick={() => {
//         // Código para download permanece o mesmo
//       }}>
//         Baixar Avatar
//       </button>
//     </div>
//   );
// };

// export default AvatarCanvas;