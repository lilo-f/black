import { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { auth, googleProvider, facebookProvider } from '../firebaseConfig'; // Configure seu Firebase
import { signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import '../styles/LoginPage.css';

const Login = ({ setIsAuthenticated }) => {
  const [isLoginMode, setIsLoginMode] = useState(true); // Alternar entre Login e Cadastro
  const [credentials, setCredentials] = useState({ email: '', password: '', nickname: '' });
  const [eyeState, setEyeState] = useState('normal'); // normal, watching, angry, closed
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const eyeRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Efeito para o olho seguir o mouse
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!eyeRef.current) return;
      
      const eye = eyeRef.current;
      const eyeRect = eye.getBoundingClientRect();
      const eyeCenterX = eyeRect.left + eyeRect.width / 2;
      const eyeCenterY = eyeRect.top + eyeRect.height / 2;
      
      const angle = Math.atan2(e.clientY - eyeCenterY, e.clientX - eyeCenterX);
      const distance = Math.min(
        Math.sqrt(Math.pow(e.clientX - eyeCenterX, 2) + Math.pow(e.clientY - eyeCenterY, 2)),
        50
      );
      
      const pupilX = Math.cos(angle) * distance * 0.3;
      const pupilY = Math.sin(angle) * distance * 0.3;
      
      eye.style.setProperty('--pupil-x', `${pupilX}px`);
      eye.style.setProperty('--pupil-y', `${pupilY}px`);
      
      // Muda o estado do olho
      if (e.clientY < eyeCenterY - 50) setEyeState('watching');
      else if (distance < 30) setEyeState('angry');
      else setEyeState('normal');
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Alternar entre Login e Cadastro
  const toggleAuthMode = () => {
    setIsLoginMode(!isLoginMode);
    setError('');
  };

  // Login com Email/Senha
  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setEyeState('angry');
    setIsLoading(true);

    try {
      if (isLoginMode) {
        await signInWithEmailAndPassword(auth, credentials.email, credentials.password);
      } else {
        if (!credentials.nickname) {
          throw new Error("Escolha um nickname!");
        }
        await createUserWithEmailAndPassword(auth, credentials.email, credentials.password);
      }
      
      setIsAuthenticated(true);
      navigate(location.state?.from?.pathname || '/dashboard');
    } catch (err) {
      setError(err.message);
      setEyeState('angry');
      setTimeout(() => setEyeState('normal'), 1500);
    } finally {
      setIsLoading(false);
    }
  };

  // Login com Google
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      setIsAuthenticated(true);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    }
  };

  // Login com Facebook
  const handleFacebookLogin = async () => {
    try {
      const result = await signInWithPopup(auth, facebookProvider);
      setIsAuthenticated(true);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="black-tiger-den">
      <div className="jungle-canvas">
        <div className="jungle-layer layer-1"></div>
        <div className="jungle-layer layer-2"></div>
        <div className="jungle-layer layer-3"></div>
      </div>
      
      <div className="tiger-gate">
        <div className="tiger-portal">
          {/* Olho de Tigre Interativo */}
          <div 
            ref={eyeRef}
            className={`tiger-eye ${eyeState}`}
          >
            <div className="eye-lid"></div>
            <div className="eye-socket">
              <div className="eye-iris">
                <div className="eye-pupil"></div>
                <div className="eye-glint"></div>
              </div>
            </div>
            <div className="eye-fur top"></div>
            <div className="eye-fur bottom"></div>
          </div>
          
          <h1 className="tiger-gate-title">{isLoginMode ? 'ENTRAR' : 'CRIAR CONTA'}</h1>
          
          {error && <div className="tiger-warning">{error}</div>}
          
          <form onSubmit={handleEmailLogin} className="tiger-form">
            {!isLoginMode && (
              <div className="tiger-input-group">
                <input
                  name="nickname"
                  type="text"
                  value={credentials.nickname}
                  onChange={(e) => setCredentials({...credentials, nickname: e.target.value})}
                  placeholder="Seu nickname"
                  className="tiger-input"
                  required
                />
              </div>
            )}
            
            <div className="tiger-input-group">
              <input
                name="email"
                type="email"
                value={credentials.email}
                onChange={(e) => setCredentials({...credentials, email: e.target.value})}
                placeholder="Email"
                className="tiger-input"
                required
              />
            </div>
            
            <div className="tiger-input-group">
              <input
                name="password"
                type="password"
                value={credentials.password}
                onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                placeholder="Senha"
                className="tiger-input"
                required
              />
            </div>
            
            <button 
              type="submit" 
              disabled={isLoading}
              className={`tiger-button ${isLoading ? 'loading' : ''}`}
            >
              {isLoading ? (
                <div className="tiger-spinner"></div>
              ) : (
                isLoginMode ? 'ENTRAR' : 'CRIAR CONTA'
              )}
            </button>
          </form>
          
          <div className="social-login">
            <button onClick={handleGoogleLogin} className="social-btn google-btn">
              <span>Entrar com Google</span>
            </button>
            <button onClick={handleFacebookLogin} className="social-btn facebook-btn">
              <span>Entrar com Facebook</span>
            </button>
          </div>
          
          <p className="toggle-auth-mode">
            {isLoginMode ? 'Não tem uma conta?' : 'Já tem uma conta?'}
            <button onClick={toggleAuthMode} className="toggle-btn">
              {isLoginMode ? 'Crie uma' : 'Faça login'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;