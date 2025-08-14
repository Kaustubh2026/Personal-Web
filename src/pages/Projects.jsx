import { motion } from 'framer-motion';
import styled, { keyframes } from 'styled-components';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

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

const ProjectsContainer = styled(motion.div)`
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

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  padding: 0 1rem;
`;

const ProjectCard = styled(motion.div)`
  background: rgba(0, 255, 252, 0.05);
  border: 1px solid rgba(0, 255, 252, 0.2);
  border-radius: 4px;
  overflow: hidden;
  transition: all 0.3s ease;
  position: relative;
  
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
  
  &:hover {
    transform: translateY(-5px);
    border-color: rgba(0, 255, 252, 0.5);
    box-shadow: 0 0 20px rgba(0, 255, 252, 0.3);
  }
`;

const ProjectImage = styled.div`
  width: 100%;
  height: 200px;
  overflow: hidden;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, rgba(0, 255, 252, 0.2), transparent);
    z-index: 1;
  }
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }
  
  ${ProjectCard}:hover & img {
    transform: scale(1.05);
  }
`;

const ProjectContent = styled.div`
  padding: 1.5rem;
  position: relative;
  z-index: 2;
`;

const ProjectTitle = styled.h3`
  font-size: 1.5rem;
  color: #00fffc;
  margin-bottom: 1rem;
  font-weight: 600;
  font-family: 'Share Tech Mono', monospace;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  text-shadow: 0 0 10px rgba(0, 255, 252, 0.5);
`;

const ProjectDescription = styled.p`
  color: rgba(0, 255, 252, 0.8);
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  font-family: 'Share Tech Mono', monospace;
`;

const ProjectLinks = styled.div`
  display: flex;
  gap: 1rem;
`;

const ProjectLink = styled(motion.a)`
  color: #00fffc;
  font-size: 1.2rem;
  transition: all 0.3s ease;
  text-shadow: 0 0 10px rgba(0, 255, 252, 0.5);
  
  &:hover {
    color: #fc00ff;
    transform: translateY(-2px);
    text-shadow: 0 0 20px rgba(252, 0, 255, 0.5);
  }
`;

const projects = [
  {
    title: "Krishisanjivani",
    description: "A platform for farmers to get fair price for their crops and many more.",
    image: "https://ik.imagekit.io/storybird/images/67154d3f-f221-481d-81b2-370cda2b1d7a/23_383184328.png?tr=q-80",
    tech: "React,ARIMA ,Random Forest, Tailwind CSS",
    github: "https://github.com/Kaustubh2026/KrishisanjivaniFM",
    live: "https://krishisanjivani-fm.vercel.app/"
  },
  {
    title: "Nature Nurture",
    description: "Nature Nurture is a web platform that helps parents discover and book nature-based activities for children aged 2-8, promoting outdoor play and reducing screen time.",
    image: "https://source.unsplash.com/random/800x600?Kids",
    tech: "React,Tailwind CSS ,SQL,Railway",
    github: "https://github.com/Kaustubh2026/Projectone",
    live: "https://projectone-chi-seven.vercel.app/"
  },
  {
    title: "BBros",
    description: "• Designed a real-time social media analytics tool. That Generates Ads for the company using Streamlit and Lang Flow framework. ",
    image: "https://source.unsplash.com/random/800x600?food",
    tech: "LangFlow,AstraDB",
    github: "https://github.com/Tarunkasliwal/BeerBros_mumbai",
    live: "https://project3.com"
  },
  {
    title: "WeatherUI",
    description: "Designed a real-time weather app using React and OpenWeather API. ",
    image: "https://source.unsplash.com/random/800x600?weather",
    tech: "React,OpenWeather API,Tailwind CSS ,Material UI",
    github: "https://github.com/Kaustubh2026/WeatherUI",
    live: "https://weather-ui-nu.vercel.app/"
  },
  {
    title: "FutureForge",
    description: "An AI-powered platform for students to get personalized study plans and resources.",
    image: "https://source.unsplash.com/random/800x600?study",
    tech: "React,OpenAI API,Node.js,Gemini API,Tailwind CSS ,Material UI",
    github: "https://github.com/Kaustubh2026/FutureForge",
    live: "https://future-forge-omega.vercel.app/"
  }, 
  {
    title: "EventHub",
    description: "Designed a real-time event management system using React and Node.js. ",
    image: "https://source.unsplash.com/random/800x600?event",
    tech: "React,Node.js,Tailwind CSS ,Material UI ,Vue.js",
    github: "https://github.com/Kaustubh2026/EventHub",
    live: "https://fantastic-bavarois-d51936.netlify.app/"
  }
];

const Projects = () => {
  return (
    <ProjectsContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <Content>
        <PageTitle
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Match Gallery
        </PageTitle>

        <ProjectsGrid>
          {projects.map((project, index) => (
            <ProjectCard
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <ProjectImage>
                <img src={project.image} alt={project.title} />
              </ProjectImage>
              <ProjectContent>
                <ProjectTitle>{project.title}</ProjectTitle>
                <ProjectDescription>{project.description}</ProjectDescription>
                <ProjectLinks>
                  <ProjectLink
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -5 }}
                  >
                    <FaGithub />
                  </ProjectLink>
                  <ProjectLink
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -5 }}
                  >
                    <FaExternalLinkAlt />
                  </ProjectLink>
                </ProjectLinks>
              </ProjectContent>
            </ProjectCard>
          ))}
        </ProjectsGrid>
      </Content>
    </ProjectsContainer>
  );
};

export default Projects; 