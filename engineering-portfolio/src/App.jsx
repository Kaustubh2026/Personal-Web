import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import GlobalStyles from './styles/GlobalStyles';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Projects from './pages/Projects';
import About from './pages/About';
import Contact from './pages/Contact';
import CricketAnimation from './components/CricketAnimation';
import './App.css';

const AppContainer = styled.div`
  min-height: 100vh;
  background: var(--background);
  position: relative;
`;

const Cursor = styled.div`
  width: 32px;
  height: 32px;
  position: fixed;
  pointer-events: none;
  z-index: 9999;
  mix-blend-mode: difference;
  transition: transform 0.2s ease;
`;

const FloatingTeaCup = styled.div`
  position: fixed;
  z-index: 1;
  pointer-events: none;
  opacity: 0.5;
  
  &.top-left {
    top: 20px;
    left: 20px;
  }
  
  &.top-right {
    top: 20px;
    right: 20px;
  }
  
  &.bottom-left {
    bottom: 20px;
    left: 20px;
  }
  
  &.bottom-right {
    bottom: 20px;
    right: 20px;
  }
`;

function App() {
  const [showAnimation, setShowAnimation] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    const handleMouseMove = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e) => {
      if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON' || 
          e.target.closest('a') || e.target.closest('button')) {
        setIsHovering(true);
      }
    };

    const handleMouseOut = () => {
      setIsHovering(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  const handleAnimationComplete = () => {
    setShowAnimation(false);
  };

  return (
    <Router>
      {showAnimation ? (
        <CricketAnimation onAnimationComplete={handleAnimationComplete} />
      ) : (
        <>
          <GlobalStyles />
          <AppContainer>
            <Navbar />
            <Cursor 
              className="custom-cursor"
              style={{ 
                left: cursorPos.x, 
                top: cursorPos.y,
                transform: `translate(-50%, -50%) ${isHovering ? 'scale(1.5)' : 'scale(1)'}` 
              }} 
            />
            
            {/* Decorative Tea Cups */}
            <FloatingTeaCup className="top-left floating">
              <div className="tea-cup">
                <div className="steam" />
                <div className="steam" />
                <div className="steam" />
              </div>
            </FloatingTeaCup>
            
            <FloatingTeaCup className="top-right floating">
              <div className="tea-cup">
                <div className="steam" />
                <div className="steam" />
                <div className="steam" />
              </div>
            </FloatingTeaCup>
            
            <FloatingTeaCup className="bottom-left floating">
              <div className="tea-cup">
                <div className="steam" />
                <div className="steam" />
                <div className="steam" />
              </div>
            </FloatingTeaCup>
            
            <FloatingTeaCup className="bottom-right floating">
              <div className="tea-cup">
                <div className="steam" />
                <div className="steam" />
                <div className="steam" />
              </div>
            </FloatingTeaCup>

            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
              </Routes>
            </AnimatePresence>
          </AppContainer>
        </>
      )}
    </Router>
  );
}

export default App;
