// import { useState } from 'react'
import AvatarCanvas from "../components/AvatarCanvas";
import AvatarPartSelector from "../components/AvatarPartSelector";
import ColorPicker from "../components/ColorPicker";
import '../styles/Avatar.css'


import { useState, useMemo } from 'react'


function App() {
  const [avatar, setAvatar] = useState({
    gender: 'female',
    faceShape: 'oval',
    hairStyle: 'curly',
    hairColor: '#5e3a21',
    skinColor: '#f5d0b9',
    eyeColor: '#3a5e5e',
    bgColor: '#87ceeb'
  })

  const updateAvatar = (key, value) => {
    setAvatar(prev => ({ ...prev, [key]: value }))
  }

  const AvatarCanvas = () => {
    const faceShapes = {
      round: { 
        path: 'M150,80 a70,70 0 1 1 0,140 a70,70 0 1 1 0,-140',
        features: { eyeY: 120, mouthY: 170 }
      },
      oval: { 
        path: 'M150,70 a75,90 0 0 1 0,140 a75,90 0 0 1 0,-140',
        features: { eyeY: 125, mouthY: 175 }
      },
      square: { 
        path: 'M80,70 h140 v140 h-140 z',
        features: { eyeY: 130, mouthY: 180 }
      },
      heart: {
        path: 'M150,90 Q220,40 280,90 Q300,150 150,220 Q0,150 20,90 Q80,40 150,90',
        features: { eyeY: 130, mouthY: 185 }
      },
      diamond: {
        path: 'M150,70 L220,150 L150,230 L80,150 Z',
        features: { eyeY: 135, mouthY: 190 }
      }
    }

    const hairStyles = {
      curly: { 
        path: 'M70,80 Q150,20 230,80 Q210,160 150,180 Q90,160 70,80',
        description: 'Cacheado'
      },
      long: { 
        path: 'M70,50 Q150,20 230,50 Q210,180 150,200 Q90,180 70,50',
        description: 'Longo'
      },
      bob: { 
        path: 'M80,60 Q150,40 220,60 Q200,150 150,160 Q100,150 80,60',
        description: 'Bob'
      },
      short: { 
        path: 'M80,70 Q150,50 220,70 Q200,120 150,130 Q100,120 80,70',
        description: 'Curto'
      },
      afro: {
        path: 'M70,80 Q150,30 230,80 Q210,150 150,170 Q90,150 70,80',
        description: 'Afro'
      }
    }

    const currentFace = faceShapes[avatar.faceShape]

    return (
      <svg width="300" height="300" viewBox="0 0 300 300" style={{ backgroundColor: '#fff' }}>
        {/* Fundo */}
        <rect width="300" height="300" fill={avatar.bgColor} rx="10" />
        
        {/* Cabelo */}
        <path 
          d={hairStyles[avatar.hairStyle].path} 
          fill={avatar.hairColor} 
          stroke="#333" 
          strokeWidth="1.5"
        />
        
        {/* Rosto */}
        <path 
          d={currentFace.path} 
          fill={avatar.skinColor} 
          stroke="#333" 
          strokeWidth="2"
        />
        
        {/* Olhos */}
        <circle cx="120" cy={currentFace.features.eyeY} r="15" fill="#fff" stroke="#333" strokeWidth="1.5" />
        <circle cx="180" cy={currentFace.features.eyeY} r="15" fill="#fff" stroke="#333" strokeWidth="1.5" />
        <circle cx="120" cy={currentFace.features.eyeY} r="7" fill={avatar.eyeColor} />
        <circle cx="180" cy={currentFace.features.eyeY} r="7" fill={avatar.eyeColor} />
        
        {/* Boca */}
        <path 
          d={`M130,${currentFace.features.mouthY} Q150,${currentFace.features.mouthY + 20} 170,${currentFace.features.mouthY}`}
          fill="#ff6b6b"
          stroke="#8b0000"
          strokeWidth="1.5"
        />
      </svg>
    )
  }

  return (
    <div className="app" style={{ backgroundColor: '#f5f5f5' }}>
      <h1>Editor de Avatar Premium</h1>
      <div className="editor">
        <AvatarCanvas />
        
        <div className="controls">
          <div className="control-group">
            <h3>Formato do Rosto</h3>
            <div className="options">
              {['round', 'oval', 'square', 'heart', 'diamond'].map(shape => (
                <button
                  key={shape}
                  className={avatar.faceShape === shape ? 'active' : ''}
                  onClick={() => updateAvatar('faceShape', shape)}
                >
                  {shape === 'round' ? 'Redondo' : 
                   shape === 'oval' ? 'Oval' : 
                   shape === 'square' ? 'Quadrado' :
                   shape === 'heart' ? 'Coração' : 'Diamante'}
                </button>
              ))}
            </div>
          </div>
          
          <div className="control-group">
            <h3>Estilo de Cabelo</h3>
            <div className="options">
              {Object.keys(hairStyles).map(style => (
                <button
                  key={style}
                  className={avatar.hairStyle === style ? 'active' : ''}
                  onClick={() => updateAvatar('hairStyle', style)}
                >
                  {hairStyles[style].description}
                </button>
              ))}
            </div>
            <input 
              type="color" 
              value={avatar.hairColor} 
              onChange={(e) => updateAvatar('hairColor', e.target.value)} 
            />
          </div>
          
          <div className="control-group">
            <h3>Aparência</h3>
            <label>
              Cor da Pele:
              <input 
                type="color" 
                value={avatar.skinColor} 
                onChange={(e) => updateAvatar('skinColor', e.target.value)} 
              />
            </label>
            <label>
              Cor dos Olhos:
              <input 
                type="color" 
                value={avatar.eyeColor} 
                onChange={(e) => updateAvatar('eyeColor', e.target.value)} 
              />
            </label>
          </div>
          
          <div className="control-group">
            <h3>Fundo</h3>
            <input 
              type="color" 
              value={avatar.bgColor} 
              onChange={(e) => updateAvatar('bgColor', e.target.value)} 
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App