import { motion } from 'framer-motion';
import styled, { keyframes } from 'styled-components';
import { FaGraduationCap } from 'react-icons/fa';

const scanline = keyframes`
  0% {
    transform: translateY(-100%);
  }
  100% {
    transform: translateY(100%);
  }
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

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const float = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-15px);
  }
`;

const shimmer = keyframes`
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
`;

const borderGlow = keyframes`
  0%, 100% {
    border-color: rgba(0, 255, 252, 0.2);
    box-shadow: 0 0 5px rgba(0, 255, 252, 0.1);
  }
  50% {
    border-color: rgba(0, 255, 252, 0.6);
    box-shadow: 0 0 20px rgba(0, 255, 252, 0.4);
  }
`;

const pulse = keyframes`
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
`;

const EducationContainer = styled(motion.div)`
  min-height: 100vh;
  background: #000;
  padding: 6rem 2rem;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 50% 50%, rgba(0, 255, 252, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 0% 0%, rgba(252, 0, 255, 0.1) 0%, transparent 50%);
    z-index: 0;
  }

  &::after {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 100vh;
    background: linear-gradient(
      to bottom,
      transparent 50%,
      rgba(0, 255, 252, 0.1) 50%
    );
    background-size: 100% 4px;
    z-index: 1;
    pointer-events: none;
    animation: ${scanline} 8s linear infinite;
  }
`;

const Content = styled.div`
  position: relative;
  z-index: 2;
  max-width: 1200px;
  margin: 0 auto;
`;

const PageTitle = styled(motion.h1)`
  font-size: 3rem;
  color: #00fffc;
  text-align: center;
  margin-bottom: 4rem;
  font-weight: 700;
  font-family: 'Share Tech Mono', monospace;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  animation: ${glitch} 1s linear infinite;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const EducationGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2.5rem;
  padding: 0 1rem;
`;

const EducationCard = styled(motion.div)`
  background: rgba(0, 255, 252, 0.05);
  border: 2px solid rgba(0, 255, 252, 0.2);
  border-radius: 4px;
  padding: 2rem;
  position: relative;
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  animation: ${fadeInUp} 0.8s ease-out backwards, ${borderGlow} 3s ease-in-out infinite;
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
    pointer-events: none;
  }

  &::after {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: linear-gradient(45deg, transparent 30%, rgba(0, 255, 252, 0.1) 50%, transparent 70%);
    transform: rotate(45deg);
    z-index: 1;
    animation: ${shimmer} 3s infinite;
    pointer-events: none;
  }
  
  &:hover {
    transform: translateY(-12px) scale(1.02) rotateX(5deg);
    border-color: rgba(0, 255, 252, 0.8);
    box-shadow: 
      0 15px 40px rgba(0, 255, 252, 0.3),
      0 0 30px rgba(0, 255, 252, 0.2),
      inset 0 0 20px rgba(0, 255, 252, 0.05);
    background: rgba(0, 255, 252, 0.08);
  }
`;

const CardIcon = styled(motion.div)`
  font-size: 2.5rem;
  color: #00fffc;
  margin-bottom: 1rem;
  position: relative;
  z-index: 2;
  animation: ${float} 3s ease-in-out infinite;
  filter: drop-shadow(0 0 8px rgba(0, 255, 252, 0.6));
`;

const CardTitle = styled(motion.h3)`
  font-size: 1.5rem;
  color: #fff;
  margin-bottom: 0.5rem;
  font-family: 'Share Tech Mono', monospace;
  font-weight: 600;
  position: relative;
  z-index: 2;
  background: linear-gradient(90deg, #fff 0%, #00fffc 50%, #fff 100%);
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: shimmer 3s linear infinite;
`;

const Institution = styled(motion.p)`
  color: #00fffc;
  font-size: 1rem;
  margin-bottom: 0.5rem;
  font-family: 'Share Tech Mono', monospace;
  position: relative;
  z-index: 2;
  text-shadow: 0 0 10px rgba(0, 255, 252, 0.5);
`;

const Duration = styled(motion.p)`
  color: #aaa;
  font-size: 0.9rem;
  margin-bottom: 1rem;
  position: relative;
  z-index: 2;
  animation: ${pulse} 2s ease-in-out infinite;
`;

const Description = styled(motion.p)`
  color: #ccc;
  font-size: 0.95rem;
  line-height: 1.6;
  position: relative;
  z-index: 2;
  transition: all 0.3s ease;
  
  &:hover {
    color: #fff;
    text-shadow: 0 0 8px rgba(0, 255, 252, 0.3);
  }
`;

const Highlights = styled(motion.ul)`
  margin-top: 1rem;
  padding-left: 1.5rem;
  position: relative;
  z-index: 2;
  
  li {
    color: #bbb;
    margin-bottom: 0.5rem;
    font-size: 0.9rem;
    line-height: 1.5;
    transition: all 0.3s ease;
    
    &:before {
      color: #00fffc;
      font-weight: bold;
      margin-right: 0.5rem;
    }

    &:hover {
      color: #00fffc;
      transform: translateX(5px);
      text-shadow: 0 0 8px rgba(0, 255, 252, 0.4);
    }
  }
`;



export default function Education() {
  const educationData = [
    {
      id: 1,
      degree: "Bachelor of Technology",
      institution: "Vishwakarma Institute of Technology, Pune",
      duration: "2022 - 2026",
      field: "Artificial Intelligence & Data Science",
      highlights: [
        "CGPA: 8.75",
        "Core subjects: ML, AI , Web Dev, Data Structures, Algorithms, Database Management"
    
      ]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, rotateX: 90 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.8,
      },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, scale: 0.8, y: -30 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 10,
        duration: 1,
      },
    },
  };

  const iconVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 150,
        damping: 12,
      },
    },
    hover: {
      scale: 1.3,
      rotate: 360,
      transition: { duration: 0.6 },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <EducationContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <Content>
        <PageTitle
          variants={titleVariants}
          initial="hidden"
          animate="visible"
        >
          Education
        </PageTitle>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <EducationGrid>
            {educationData.map((edu, index) => (
              <EducationCard
                key={edu.id}
                variants={cardVariants}
                whileHover={{ 
                  y: -15,
                  rotateX: 10,
                }}
                whileTap={{ scale: 0.98 }}
              >
                <CardIcon
                  variants={iconVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover="hover"
                >
                  <FaGraduationCap />
                </CardIcon>

                <CardTitle
                  variants={textVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.1 }}
                >
                  {edu.degree}
                </CardTitle>

                <Institution
                  variants={textVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.2 }}
                  whileHover={{ x: 5 }}
                >
                  {edu.institution}
                </Institution>

                <Duration
                  variants={textVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.3 }}
                >
                  {edu.duration}
                </Duration>

                <Description
                  variants={textVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.4 }}
                >
                  {edu.field}
                </Description>

                <Description
                  variants={textVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.5 }}
                >
                  {edu.description}
                </Description>

                <Highlights
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {edu.highlights.map((highlight, idx) => (
                    <motion.li
                      key={idx}
                      variants={textVariants}
                      whileHover={{ x: 8 }}
                    >
                      {highlight}
                    </motion.li>
                  ))}
                </Highlights>
              </EducationCard>
            ))}
          </EducationGrid>
        </motion.div>
      </Content>
    </EducationContainer>
  );
}
