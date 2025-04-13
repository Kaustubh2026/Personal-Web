import React, { useEffect, useRef, useState } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { motion, useAnimation, useInView as useFramerInView } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Stars, Float, useGLTF, Environment, MeshDistortMaterial, Text3D, Center } from '@react-three/drei';
import { FaCode, FaBrain, FaRocket, FaServer, FaGithub, FaLinkedin, FaInstagram, FaDatabase, FaTrophy, FaChartLine, FaRobot } from 'react-icons/fa';
import { useMediaQuery } from 'react-responsive';
import profileImage from '../assets/kaustubh-profile.jpg';

// Advanced animations
const noise = keyframes`
  0% { transform: translate(0, 0) }
  10% { transform: translate(-5%, -5%) }
  20% { transform: translate(-10%, 5%) }
  30% { transform: translate(5%, -10%) }
  40% { transform: translate(-5%, 15%) }
  50% { transform: translate(-10%, 5%) }
  60% { transform: translate(15%, 0) }
  70% { transform: translate(0, 10%) }
  80% { transform: translate(-15%, 0) }
  90% { transform: translate(10%, 5%) }
  100% { transform: translate(5%, 0) }
`;

const float = keyframes`
  0% { transform: translateY(0px) }
  50% { transform: translateY(-2px) }
  100% { transform: translateY(0px) }
`;

const pulse = keyframes`
  0% { opacity: 0.95; }
  50% { opacity: 1; }
  100% { opacity: 0.95; }
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideUp = keyframes`
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

const slideIn = keyframes`
  from { transform: translateX(-20px); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
`;

const rotate = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const glitch = keyframes`
  0% {
    text-shadow: 0.05em 0 0 #00fffc, -0.03em -0.04em 0 #fc00ff,
                 0.025em 0.04em 0 #fffc00;
  }
  15% {
    text-shadow: 0.05em 0 0 #00fffc, -0.03em -0.04em 0 #fc00ff,
                 0.025em 0.04em 0 #fffc00;
  }
  16% {
    text-shadow: -0.05em -0.025em 0 #00fffc, 0.025em 0.035em 0 #fc00ff,
                 -0.05em -0.05em 0 #fffc00;
  }
  49% {
    text-shadow: -0.05em -0.025em 0 #00fffc, 0.025em 0.035em 0 #fc00ff,
                 -0.05em -0.05em 0 #fffc00;
  }
  50% {
    text-shadow: 0.05em 0.035em 0 #00fffc, 0.03em 0 0 #fc00ff,
                 0 -0.04em 0 #fffc00;
  }
  99% {
    text-shadow: 0.05em 0.035em 0 #00fffc, 0.03em 0 0 #fc00ff,
                 0 -0.04em 0 #fffc00;
  }
  100% {
    text-shadow: -0.05em 0 0 #00fffc, -0.025em -0.04em 0 #fc00ff,
                 -0.04em -0.025em 0 #fffc00;
  }
`;

const scanline = keyframes`
  0% {
    transform: translateY(-100%);
  }
  100% {
    transform: translateY(100%);
  }
`;

const AboutContainer = styled(motion.div)`
  min-height: 100vh;
  padding: 120px 2rem 2rem;
  position: relative;
  background: #0a0a0a;
  color: #fff;
  overflow: hidden;
  perspective: 1000px;

  &::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 50% 50%, rgba(255, 0, 128, 0.05) 0%, transparent 50%),
      radial-gradient(circle at 0% 0%, rgba(0, 255, 255, 0.05) 0%, transparent 50%),
      radial-gradient(circle at 100% 100%, rgba(255, 0, 255, 0.05) 0%, transparent 50%);
    z-index: 0;
  }

  &::after {
    display: none;
  }
`;

const CanvasContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  pointer-events: none;
  opacity: 0.7;
  animation: ${fadeIn} 2s ease-out;
`;

const Content = styled(motion.div)`
  position: relative;
  z-index: 2;
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 4rem;
`;

const CharacterCard = styled(motion.div)`
  background: rgba(0, 255, 252, 0.05);
  border: 1px solid rgba(0, 255, 252, 0.2);
  border-radius: 4px;
  padding: 2rem;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, transparent, rgba(0, 255, 252, 0.1));
    z-index: 1;
  }
`;

const CharacterImageContainer = styled.div`
  position: relative;
  width: 280px;
  height: 280px;
  flex-shrink: 0;
  transform-style: preserve-3d;
  perspective: 1000px;
  margin: 0 auto;
  margin-bottom: 2rem;
`;

const CharacterImage = styled.div`
  width: 100%;
  height: 100%;
  border: 2px solid rgba(0, 255, 252, 0.5);
  border-radius: 50%;
  overflow: hidden;
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.3s ease, border-color 0.3s ease;

  &:hover {
    border-color: rgba(0, 255, 252, 0.8);
    transform: scale(1.01);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, rgba(0, 255, 252, 0.1), transparent);
    mix-blend-mode: overlay;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top center;
    transform: scale(1.1);
    filter: contrast(1.05) brightness(1);
    transition: transform 0.3s ease;
  }

  &:hover img {
    transform: scale(1.12);
  }
`;

const CharacterInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  z-index: 1;
  animation: ${slideIn} 1s ease-out 0.6s both;
`;

const CharacterTitle = styled.h2`
  font-size: 2.5rem;
  color: #00fffc;
  text-align: center;
  margin-bottom: 1rem;
  font-weight: 700;
  font-family: 'Share Tech Mono', monospace;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  animation: ${glitch} 1s linear infinite;
`;

const CharacterDescription = styled.p`
  color: rgba(0, 255, 252, 0.8);
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 2rem;
  font-family: 'Share Tech Mono', monospace;
  text-align: center;
`;

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-top: 2rem;
`;

const StatCard = styled(motion.div)`
  background: rgba(0, 255, 252, 0.05);
  border: 1px solid rgba(0, 255, 252, 0.2);
  border-radius: 4px;
  padding: 1rem;
  text-align: center;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    border-color: rgba(0, 255, 252, 0.5);
    box-shadow: 0 0 20px rgba(0, 255, 252, 0.3);
  }
`;

const StatLabel = styled.div`
  color: #00fffc;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
  font-family: 'Share Tech Mono', monospace;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const StatValue = styled.div`
  color: #fc00ff;
  font-size: 1.5rem;
  font-weight: 700;
  font-family: 'Share Tech Mono', monospace;
  text-shadow: 0 0 10px rgba(252, 0, 255, 0.5);
`;

const SkillsSection = styled(motion.div)`
  background: rgba(0, 255, 252, 0.05);
  border: 1px solid rgba(0, 255, 252, 0.2);
  border-radius: 4px;
  padding: 2rem;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, transparent, rgba(0, 255, 252, 0.1));
    z-index: 1;
  }
`;

const SkillsTitle = styled.h2`
  font-size: 2rem;
  color: #00fffc;
  text-align: center;
  margin-bottom: 2rem;
  font-weight: 700;
  font-family: 'Share Tech Mono', monospace;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  animation: ${glitch} 1s linear infinite;
`;

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const SkillCard = styled(motion.div)`
  background: rgba(0, 255, 252, 0.05);
  border: 1px solid rgba(0, 255, 252, 0.2);
  border-radius: 4px;
  padding: 1.5rem;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    border-color: rgba(0, 255, 252, 0.5);
    box-shadow: 0 0 20px rgba(0, 255, 252, 0.3);
  }
`;

const SkillIcon = styled.div`
  color: #00fffc;
  font-size: 2rem;
  margin-bottom: 1rem;
  text-shadow: 0 0 10px rgba(0, 255, 252, 0.5);
`;

const SkillTitle = styled.h3`
  color: #00fffc;
  font-size: 1.2rem;
  margin-bottom: 1rem;
  font-weight: 600;
  font-family: 'Share Tech Mono', monospace;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const SkillItems = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const SkillItem = styled.li`
  color: rgba(0, 255, 252, 0.8);
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
  font-family: 'Share Tech Mono', monospace;
  position: relative;
  padding-left: 1.5rem;
  
  &::before {
    content: '>';
    position: absolute;
    left: 0;
    color: #fc00ff;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-top: 2rem;
  justify-content: center;
  animation: ${slideUp} 1s ease-out 1.5s both;
`;

const SocialLink = styled(motion.a)`
  color: #fff;
  font-size: 1.5rem;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(255, 0, 128, 0.3);
  border-radius: 50%;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  background: rgba(20, 20, 40, 0.7);
  backdrop-filter: blur(5px);
  cursor: pointer;
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(45deg, rgba(255, 0, 128, 0.2), transparent);
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 0 20px rgba(255, 0, 128, 0.4);
    color: #ff0080;
    border-color: rgba(255, 0, 128, 0.6);
    
    &::before {
      opacity: 1;
    }
  }
`;

// 3D Model Component
const Model = () => {
  return (
    <Float
      speed={4}
      rotationIntensity={1}
      floatIntensity={2}
    >
      <mesh>
        <torusKnotGeometry args={[1, 0.3, 100, 16]} />
        <MeshDistortMaterial
          color="#ff0080"
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0}
          metalness={0.8}
        />
      </mesh>
    </Float>
  );
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
};

const stats = [
  { label: 'Name', value: 'Kaustubh Muley' },
  { label: 'Phone', value: '+91 7972903306' },
  { label: 'Email', value: 'mkaustubh2026@gmail.com' },
  { label: 'Interests', value: 'Cricket & CP' }
];

const skills = [
  {
    title: 'Frontend',
    icon: <FaCode />,
    items: ['React','TypeScript', 'Styled Components', 'Framer Motion','HTML','CSS','JavaScript']
  },
  {
    title: 'Database',
    icon: <FaDatabase />,
    items: ['SQL','Redis','Supabase']
  },
  {
    title: 'Cricket Analytics',
    icon: <FaTrophy />,
    items: ['Match Analysis', 'Player Statistics', 'Performance Metrics', 'Data Visualization']
  },
  {
    title: 'AI/ML',
    icon: <FaRobot />,
    items: ['LLMs','Scikit-learn','NLP']
  }
];

const About = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useFramerInView(ref, {
    once: true,
    amount: 0.2
  });

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [controls, isInView]);

  const handleMouseMove = () => {};
  const handleMouseLeave = () => {};

  return (
    <AboutContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <CanvasContainer>
        <Canvas camera={{ position: [0, 0, 8] }}>
          <ambientLight intensity={0.3} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ff0080" />
          <Stars radius={300} depth={60} count={5000} factor={4} saturation={0} fade speed={0.5} />
          <Model />
          <Environment preset="night" />
        </Canvas>
      </CanvasContainer>
      
      <Content ref={ref}>
        <CharacterCard 
          ref={cardRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <CharacterImageContainer>
            <CharacterImage>
              <img src={profileImage} alt="Kaustubh Muley" />
            </CharacterImage>
          </CharacterImageContainer>
          <CharacterInfo>
            <CharacterTitle>Kaustubh Muley</CharacterTitle>
            <CharacterDescription>
              A passionate developer with a love for competitive programming and cricket.
              Combining analytical thinking with creative problem-solving to build innovative solutions.
            </CharacterDescription>
            <StatsContainer>
              {stats.map((stat, index) => (
                <StatCard
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <StatLabel>{stat.label}</StatLabel>
                  <StatValue>{stat.value}</StatValue>
                </StatCard>
              ))}
            </StatsContainer>
            <SocialLinks>
              <SocialLink 
                href="https://github.com/Kaustubh2026" 
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -5 }}
              >
                <FaGithub />
              </SocialLink>
              <SocialLink 
                href="https://www.linkedin.com/in/kaustubh-muley-827b76257/" 
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -5 }}
              >
                <FaLinkedin />
              </SocialLink>
              <SocialLink 
                href="https://www.instagram.com/_kaus2bh/" 
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -5 }}
              >
                <FaInstagram />
              </SocialLink>
            </SocialLinks>
          </CharacterInfo>
        </CharacterCard>

        <SkillsSection 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <SkillsTitle>Skill Tree</SkillsTitle>
          <SkillsGrid>
            {skills.map((skill, index) => (
              <SkillCard
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <SkillIcon>{skill.icon}</SkillIcon>
                <SkillTitle>{skill.title}</SkillTitle>
                <SkillItems>
                  {skill.items.map((item, itemIndex) => (
                    <SkillItem key={itemIndex}>{item}</SkillItem>
                  ))}
                </SkillItems>
              </SkillCard>
            ))}
          </SkillsGrid>
        </SkillsSection>
      </Content>
    </AboutContainer>
  );
};

export default About; 