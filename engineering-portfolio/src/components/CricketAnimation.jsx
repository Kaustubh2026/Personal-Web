import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes, createGlobalStyle } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Stars, Float, useGLTF, Environment, MeshDistortMaterial, Text3D, Center } from '@react-three/drei';
import { FaSun, FaMoon, FaPhone, FaFileDownload } from 'react-icons/fa';

// Add Global Styles for Custom Cursor
const GlobalStyle = createGlobalStyle`
  body {
    cursor: none !important;
  }
`;

// Steam animation
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

// Custom cursor styles
const Cursor = styled.div`
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
`;

// Modern animation keyframes
const float = keyframes`
  0% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(5deg); }
  100% { transform: translateY(0px) rotate(0deg); }
`;

const pulse = keyframes`
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.05); opacity: 0.8; }
  100% { transform: scale(1); opacity: 1; }
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideUp = keyframes`
  from { transform: translateY(50px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

const slideIn = keyframes`
  from { transform: translateX(-50px); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
`;

const rotate = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const glitch = keyframes`
  0% { transform: translate(0); }
  20% { transform: translate(-2px, 2px); }
  40% { transform: translate(-2px, -2px); }
  60% { transform: translate(2px, 2px); }
  80% { transform: translate(2px, -2px); }
  100% { transform: translate(0); }
`;

const scanline = keyframes`
  0% { transform: translateY(-100%); }
  100% { transform: translateY(100%); }
`;

const enterButton = keyframes`
  0% { transform: scale(0.8); opacity: 0; }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); opacity: 1; }
`;

// Styled components
const AnimationContainer = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: #000;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  z-index: 1000;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: 
      radial-gradient(circle at center, rgba(0, 255, 229, 0.03) 0%, transparent 70%),
      linear-gradient(180deg, #000000 0%, #001a1a 100%);
    z-index: 0;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: rgba(0, 255, 229, 0.3);
    animation: ${scanline} 2s linear infinite;
    opacity: 0.2;
  }
`;

const ContentWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1;
  
  &::before {
    content: '';
    position: absolute;
    width: 300px;
    height: 300px;
    background: radial-gradient(circle, rgba(0, 255, 229, 0.1) 0%, transparent 70%);
    border-radius: 50%;
    z-index: -1;
  }
`;

const CanvasContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
`;

const Title = styled.h1`
  font-family: 'Share Tech Mono', monospace;
  font-size: 4rem;
  color: #fff;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  text-shadow: 
    0 0 10px rgba(0, 255, 229, 0.5),
    2px 2px 0px rgba(255, 0, 255, 0.2),
    -2px -2px 0px rgba(0, 255, 255, 0.2);
  margin-bottom: 1rem;
  animation: ${glitch} 0.3s infinite;
  z-index: 2;
  
  &::before,
  &::after {
    content: attr(data-text);
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    opacity: 0.8;
  }

  &::before {
    color: #ff00ff;
    transform: translate(2px, 2px);
  }

  &::after {
    color: #00ffff;
    transform: translate(-2px, -2px);
  }
`;

const Subtitle = styled.h2`
  font-family: 'Share Tech Mono', monospace;
  font-size: 1.5rem;
  color: #00ffe5;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 2rem;
  text-shadow: 0 0 5px rgba(0, 255, 229, 0.5);
  z-index: 2;
`;

const CTAButton = styled(motion.button)`
  font-family: 'Share Tech Mono', monospace;
  font-size: 1.2rem;
  color: #00ffe5;
  background: transparent;
  border: 2px solid #00ffe5;
  padding: 1rem 2rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 1000;
  box-shadow: 0 0 10px rgba(0, 255, 229, 0.3);
  position: relative;
  margin-top: 2rem;
  
  &:hover {
    background: rgba(0, 255, 229, 0.1);
    transform: translateY(-5px);
    box-shadow: 0 0 20px rgba(0, 255, 229, 0.5);
  }
`;

const SocialLinks = styled.div`
  position: absolute;
  bottom: 2rem;
  display: flex;
  gap: 1.5rem;
  z-index: 2;
`;

const SocialLink = styled(motion.a)`
  color: #fff;
  font-size: 1.5rem;
  transition: all 0.3s ease;
  
  &:hover {
    color: rgba(0, 255, 252, 1);
    transform: translateY(-5px);
  }
`;

const FloatingElement = styled(motion.div)`
  position: absolute;
  width: 50px;
  height: 50px;
  background: rgba(0, 255, 229, 0.1);
  border: 1px solid rgba(0, 255, 229, 0.3);
  border-radius: 10px;
  animation: ${float} 6s ease-in-out infinite;
  z-index: 1;
  box-shadow: 0 0 15px rgba(0, 255, 229, 0.2);
`;

const TeaCup = styled.div`
  position: relative;
  width: 60px;
  height: 60px;
  background: linear-gradient(45deg, #00ffe5, #001a1a);
  border-radius: 0 0 50% 50%;
  border: 2px solid #00ffe5;
  box-shadow: 0 0 15px rgba(0, 255, 229, 0.3);
  
  &::before {
    content: '';
    position: absolute;
    top: 5px;
    left: 50px;
    width: 20px;
    height: 20px;
    border: 2px solid #00ffe5;
    border-radius: 50%;
    border-left: none;
    transform: rotate(45deg);
  }
`;

const Steam = styled.div`
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
`;

const FloatingTeaCup = styled(motion.div)`
  position: absolute;
  animation: ${float} 6s ease-in-out infinite;
  z-index: 1;
`;

// Update AnimatedSphere to TeaCupModel
const TeaCupModel = () => {
  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
      <group scale={[0.5, 0.5, 0.5]}>
        <mesh>
          <cylinderGeometry args={[1, 0.8, 1, 32]} />
          <meshStandardMaterial
            color="#00ffe5"
            metalness={0.8}
            roughness={0.2}
            emissive="#003333"
          />
        </mesh>
        <mesh position={[1.2, 0, 0]}>
          <torusGeometry args={[0.3, 0.1, 16, 32, Math.PI]} />
          <meshStandardMaterial
            color="#00ffe5"
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
      </group>
    </Float>
  );
};

const ThemeToggle = styled(motion.button)`
  position: absolute;
  top: 20px;
  right: 20px;
  background: transparent;
  border: none;
  color: var(--primary);
  font-size: 1.5rem;
  cursor: pointer;
  z-index: 10;
  padding: 10px;
  border-radius: 50%;
  border: 2px solid var(--primary);
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background: rgba(0, 255, 229, 0.1);
    transform: scale(1.1);
  }
`;

const ProfileSection = styled.div`
  position: relative;
  width: 300px;
  height: 300px;
  margin-bottom: 2rem;
  z-index: 3;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 20px;
    border: 2px solid var(--primary);
    box-shadow: 0 0 20px rgba(0, 255, 229, 0.3);
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  z-index: 2;
`;

const ActionButton = styled(motion.a)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.8rem 1.5rem;
  background: ${props => props.primary ? 'var(--primary)' : 'transparent'};
  color: ${props => props.primary ? 'var(--background)' : 'var(--primary)'};
  border: 2px solid var(--primary);
  border-radius: 8px;
  font-family: 'Share Tech Mono', monospace;
  font-size: 1rem;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 0 10px rgba(0, 255, 229, 0.2);

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 0 20px rgba(0, 255, 229, 0.4);
    background: ${props => props.primary ? 'var(--primary)' : 'rgba(0, 255, 229, 0.1)'};
  }

  svg {
    font-size: 1.2rem;
  }
`;

const ModernIntro = ({ onAnimationComplete }) => {
  const [showButton, setShowButton] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const animationRef = useRef(null);

  useEffect(() => {
    // Show button immediately
    setShowButton(true);

    // Add cursor movement tracking
    const handleMouseMove = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Auto-complete after 8 seconds if not clicked
    const autoCompleteTimer = setTimeout(() => {
      if (isVisible) {
        setIsVisible(false);
        if (onAnimationComplete) {
          onAnimationComplete();
        }
      }
    }, 8000);

    return () => {
      clearTimeout(autoCompleteTimer);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isVisible, onAnimationComplete]);

  const handleEnterClick = () => {
    setIsVisible(false);
    if (onAnimationComplete) {
      onAnimationComplete();
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          <GlobalStyle />
          <Cursor 
            className={isHovering ? 'hovering' : ''}
            style={{ 
              left: cursorPos.x, 
              top: cursorPos.y,
              transform: `translate(-50%, -50%) ${isHovering ? 'scale(1.5)' : 'scale(1)'}` 
            }} 
          />
          <AnimationContainer
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            ref={animationRef}
          >
            <CanvasContainer>
              <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} />
                <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
                <TeaCupModel />
                <Environment preset="city" />
              </Canvas>
            </CanvasContainer>
            
            <ContentWrapper>
              <ProfileSection>
                <img src="/your-photo.jpg" alt="Your Profile" />
              </ProfileSection>

              <Title 
                data-text="CYBER CRICKET"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                CYBER CRICKET
              </Title>
              <Subtitle
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                Where Technology Meets Cricket Excellence
              </Subtitle>
              
              <ActionButtons>
                <ActionButton
                  href="/your-cv.pdf"
                  download
                  primary
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                >
                  <FaFileDownload /> Download CV
                </ActionButton>
                <ActionButton
                  href="tel:+your-phone-number"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                >
                  <FaPhone /> Call Me
                </ActionButton>
              </ActionButtons>

              <CTAButton
                onClick={handleEnterClick}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                Enter Arena
              </CTAButton>
              
              <SocialLinks>
                {['github', 'linkedin', 'twitter'].map((platform) => (
                  <SocialLink 
                    key={platform}
                    href={`https://${platform}.com`}
                    target="_blank"
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                  >
                    <i className={`fab fa-${platform}`}></i>
                  </SocialLink>
                ))}
              </SocialLinks>
            </ContentWrapper>
            
            {/* Floating tea cups */}
            {[0, 1, 2, 3].map((i) => (
              <FloatingTeaCup
                key={i}
                style={{
                  top: ['20%', '30%', '70%', '80%'][i],
                  left: i % 2 === 0 ? '20%' : '80%',
                  animationDelay: `${i * 0.5}s`
                }}
              >
                <TeaCup>
                  <Steam />
                  <Steam />
                  <Steam />
                </TeaCup>
              </FloatingTeaCup>
            ))}
          </AnimationContainer>
        </>
      )}
    </AnimatePresence>
  );
};

export default ModernIntro; 