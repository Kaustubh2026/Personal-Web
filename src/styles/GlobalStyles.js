import { createGlobalStyle, keyframes } from 'styled-components';

const steam = keyframes`
  0% {
    transform: translateY(0) translateX(-50%) scale(1);
    opacity: 0;
  }
  50% {
    transform: translateY(-20px) translateX(-30%) scale(1.2);
    opacity: 0.5;
  }
  100% {
    transform: translateY(-40px) translateX(-50%) scale(1);
    opacity: 0;
  }
`;

const float = keyframes`
  0% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(5deg); }
  100% { transform: translateY(0px) rotate(0deg); }
`;

const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;500;600;700&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&display=swap');

  :root {
    /* Theme variables */
    --primary: #00ffe5;
    --primary-dark: #001a1a;
    --secondary: #ff00ff;
    --accent: #00ffff;
    --background: #000000;
    --surface: #001a1a;
    --text: #ffffff;
    --text-secondary: rgba(255, 255, 255, 0.7);
    
    --shadow-sm: 0 0 10px rgba(0, 255, 229, 0.3);
    --shadow-md: 0 0 20px rgba(0, 255, 229, 0.5);
    --shadow-lg: 0 0 30px rgba(0, 255, 229, 0.7);
    
    --spacing-xs: 0.5rem;
    --spacing-sm: 1rem;
    --spacing-md: 2rem;
    --spacing-lg: 4rem;
    --spacing-xl: 8rem;
    
    /* Cyberpunk Cricket Theme Colors */
    --cyber-cyan: #00fffc;
    --cyber-magenta: #fc00ff;
    --cyber-yellow: #fffc00;
    --cyber-green: #0a5c0a;
    --cyber-dark-green: #0a3c0a;
    --cyber-brown: #d2b48c;
    --cyber-glow: 0 0 20px rgba(0, 255, 252, 0.5);
    --cyber-glow-magenta: 0 0 20px rgba(252, 0, 255, 0.5);
    --cyber-glow-yellow: 0 0 20px rgba(255, 252, 0, 0.5);
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Rajdhani', 'Orbitron', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    background-color: var(--background);
    color: var(--text);
    overflow-x: hidden;
    line-height: 1.6;
    font-size: 16px;
    cursor: none !important;
    transition: background-color 0.3s ease, color 0.3s ease;
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: 700;
    line-height: 1.2;
    margin-bottom: var(--spacing-md);
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  p {
    margin-bottom: var(--spacing-md);
  }

  a {
    text-decoration: none;
    color: inherit;
    transition: var(--transition);
    position: relative;

    &:hover {
      color: var(--primary);
    }
  }

  button {
    cursor: pointer;
    border: none;
    outline: none;
    background: none;
    font-family: inherit;
    transition: var(--transition);
  }

  img {
    max-width: 100%;
    height: auto;
  }

  .container {
    max-width: var(--container-width);
    margin: 0 auto;
    padding: 0 var(--spacing-md);
  }

  ::-webkit-scrollbar {
    width: 8px;
    background: var(--background);
  }

  ::-webkit-scrollbar-track {
    background: var(--surface);
  }

  ::-webkit-scrollbar-thumb {
    background: var(--primary);
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: var(--secondary);
  }

  /* Cyberpunk Cricket Theme Styles */
  .cyber-text {
    font-family: 'Share Tech Mono', monospace;
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }

  .cyber-title {
    font-family: 'Share Tech Mono', monospace;
    color: var(--cyber-cyan);
    text-shadow: var(--cyber-glow);
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }

  .cyber-button {
    font-family: 'Share Tech Mono', monospace;
    background: transparent;
    border: 2px solid var(--cyber-cyan);
    color: var(--cyber-cyan);
    padding: 0.8rem 1.5rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    transition: var(--transition);
    
    &:hover {
      background: rgba(0, 255, 252, 0.1);
      box-shadow: var(--cyber-glow);
    }
  }

  .cyber-card {
    background: rgba(0, 255, 252, 0.05);
    border: 1px solid rgba(0, 255, 252, 0.2);
    border-radius: 4px;
    padding: 1.5rem;
    transition: var(--transition);
    
    &:hover {
      border-color: rgba(0, 255, 252, 0.5);
      box-shadow: var(--cyber-glow);
    }
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .fade-in {
    animation: fadeIn 0.6s ease-out forwards;
  }

  @keyframes typing {
    from { width: 0 }
    to { width: 100% }
  }

  @keyframes blink {
    50% { border-color: transparent }
  }

  .typing-animation {
    overflow: hidden;
    white-space: nowrap;
    border-right: 2px solid var(--primary);
    animation: 
      typing 3.5s steps(40, end),
      blink .75s step-end infinite;
  }

  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
  }

  .pulse {
    animation: pulse 2s infinite;
  }

  @keyframes glow {
    0% { box-shadow: 0 0 5px var(--primary), 0 0 10px var(--primary), 0 0 15px var(--primary); }
    50% { box-shadow: 0 0 10px var(--primary), 0 0 20px var(--primary), 0 0 30px var(--primary); }
    100% { box-shadow: 0 0 5px var(--primary), 0 0 10px var(--primary), 0 0 15px var(--primary); }
  }

  .glow {
    animation: glow 2s infinite;
  }

  @keyframes float {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
    100% { transform: translateY(0px); }
  }

  .float {
    animation: float 3s ease-in-out infinite;
  }

  /* Custom Cursor */
  .custom-cursor {
    width: 32px;
    height: 32px;
    background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%2300ffe5'%3E%3Cpath d='M2 21h18v-2H2v2zM20 8h-3V4H3c-1.1 0-2 .9-2 2v3h2V6h14v14H3v-3H1v3c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-2h3V8z'/%3E%3C/svg%3E") no-repeat center center;
    position: fixed;
    pointer-events: none;
    z-index: 9999;
    mix-blend-mode: difference;
    transition: transform 0.2s ease;
    
    &.hovering {
      transform: scale(1.5);
    }
  }

  /* Tea Cup Animation Classes */
  .tea-cup {
    position: relative;
    width: 60px;
    height: 60px;
    background: linear-gradient(45deg, var(--primary), var(--primary-dark));
    border-radius: 0 0 50% 50%;
    border: 2px solid var(--primary);
    box-shadow: var(--shadow-sm);
    
    &::before {
      content: '';
      position: absolute;
      top: 5px;
      left: 50px;
      width: 20px;
      height: 20px;
      border: 2px solid var(--primary);
      border-radius: 50%;
      border-left: none;
      transform: rotate(45deg);
    }
  }

  .steam {
    position: absolute;
    top: -10px;
    left: 50%;
    width: 8px;
    height: 8px;
    background: rgba(0, 255, 229, 0.5);
    border-radius: 50%;
    filter: blur(4px);
    animation: ${steam} 2s infinite;
    
    &:nth-child(2) {
      animation-delay: 0.4s;
      left: 35%;
    }
    
    &:nth-child(3) {
      animation-delay: 0.8s;
      left: 65%;
    }
  }

  .floating {
    animation: ${float} 6s ease-in-out infinite;
  }

  /* Cyberpunk Theme Classes */
  .cyber-text {
    color: var(--primary);
    text-shadow: 0 0 10px var(--primary);
  }

  .cyber-title {
    color: var(--text);
    text-shadow: 
      0 0 10px var(--primary),
      2px 2px 0px var(--secondary),
      -2px -2px 0px var(--accent);
  }

  .cyber-button {
    background: transparent;
    border: 2px solid var(--primary);
    color: var(--primary);
    padding: 1rem 2rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    box-shadow: var(--shadow-sm);
    transition: all 0.3s ease;
    
    &:hover {
      background: rgba(0, 255, 229, 0.1);
      transform: translateY(-5px);
      box-shadow: var(--shadow-md);
    }
  }

  .cyber-card {
    background: var(--surface);
    border: 1px solid var(--primary);
    border-radius: 8px;
    padding: var(--spacing-md);
    box-shadow: var(--shadow-sm);
    transition: all 0.3s ease;
    
    &:hover {
      transform: translateY(-5px);
      box-shadow: var(--shadow-md);
    }
  }

  /* Theme-aware transitions */
  .theme-transition {
    transition: all 0.3s ease;
  }
`;

export default GlobalStyles; 