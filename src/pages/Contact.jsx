import { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaInstagram, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

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

const ContactContainer = styled(motion.div)`
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
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const ContactForm = styled(motion.form)`
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

const FormTitle = styled.h2`
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

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
  position: relative;
  z-index: 2;
`;

const Label = styled.label`
  display: block;
  color: #00fffc;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
  font-family: 'Share Tech Mono', monospace;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.8rem;
  background: rgba(0, 255, 252, 0.05);
  border: 1px solid rgba(0, 255, 252, 0.2);
  border-radius: 4px;
  color: #fff;
  font-family: 'Share Tech Mono', monospace;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: rgba(0, 255, 252, 0.5);
    box-shadow: 0 0 20px rgba(0, 255, 252, 0.3);
  }
  
  &::placeholder {
    color: rgba(0, 255, 252, 0.5);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.8rem;
  background: rgba(0, 255, 252, 0.05);
  border: 1px solid rgba(0, 255, 252, 0.2);
  border-radius: 4px;
  color: #fff;
  font-family: 'Share Tech Mono', monospace;
  min-height: 150px;
  resize: vertical;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: rgba(0, 255, 252, 0.5);
    box-shadow: 0 0 20px rgba(0, 255, 252, 0.3);
  }
  
  &::placeholder {
    color: rgba(0, 255, 252, 0.5);
  }
`;

const SubmitButton = styled(motion.button)`
  width: 100%;
  padding: 1rem;
  background: transparent;
  border: 2px solid #00fffc;
  border-radius: 4px;
  color: #00fffc;
  font-size: 1.1rem;
  font-weight: 600;
  font-family: 'Share Tech Mono', monospace;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 255, 252, 0.1);
    transform: translateX(-100%);
    transition: transform 0.3s ease;
  }
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 0 20px rgba(0, 255, 252, 0.5);
    
    &::before {
      transform: translateX(0);
    }
  }
`;

const ContactInfo = styled(motion.div)`
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

const InfoTitle = styled.h2`
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

const InfoList = styled.div`
  position: relative;
  z-index: 2;
`;

const InfoItem = styled(motion.div)`
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
  padding: 1rem;
  background: rgba(0, 255, 252, 0.05);
  border: 1px solid rgba(0, 255, 252, 0.2);
  border-radius: 4px;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    border-color: rgba(0, 255, 252, 0.5);
    box-shadow: 0 0 20px rgba(0, 255, 252, 0.3);
  }
`;

const InfoIcon = styled.div`
  color: #00fffc;
  font-size: 1.5rem;
  margin-right: 1rem;
  text-shadow: 0 0 10px rgba(0, 255, 252, 0.5);
`;

const InfoText = styled.div`
  color: rgba(0, 255, 252, 0.8);
  font-size: 1rem;
  font-family: 'Share Tech Mono', monospace;
`;

const SocialLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin-top: 2rem;
  position: relative;
  z-index: 2;
`;

const SocialLink = styled(motion.a)`
  color: #00fffc;
  font-size: 1.5rem;
  transition: all 0.3s ease;
  text-shadow: 0 0 10px rgba(0, 255, 252, 0.5);
  
  &:hover {
    color: #fc00ff;
    transform: translateY(-2px);
    text-shadow: 0 0 20px rgba(252, 0, 255, 0.5);
  }
`;

const Contact = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add form submission logic here
  };

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
  };

  return (
    <ContactContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <Content>
        <ContactForm
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          onSubmit={handleSubmit}
        >
          <FormTitle>Join The Team</FormTitle>
          <FormGroup>
            <Label>Name</Label>
            <Input
              type="text"
              name="name"
              value={formState.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
            />
          </FormGroup>
          <FormGroup>
            <Label>Email</Label>
            <Input
              type="email"
              name="email"
              value={formState.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </FormGroup>
          <FormGroup>
            <Label>Message</Label>
            <TextArea
              name="message"
              value={formState.message}
              onChange={handleChange}
              placeholder="Enter your message"
              required
            />
          </FormGroup>
          <SubmitButton
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Send Message
          </SubmitButton>
        </ContactForm>
        
        <ContactInfo
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <InfoTitle>Contact Info</InfoTitle>
          <InfoList>
            <InfoItem
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              whileHover={{ y: -5 }}
            >
              <InfoIcon><FaEnvelope /></InfoIcon>
              <InfoText>mkaustubh2026@gmail.com</InfoText>
            </InfoItem>
            <InfoItem
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              whileHover={{ y: -5 }}
            >
              <InfoIcon><FaPhone /></InfoIcon>
              <InfoText>+91 7972903306</InfoText>
            </InfoItem>
            <InfoItem
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              whileHover={{ y: -5 }}
            >
              <InfoIcon><FaMapMarkerAlt /></InfoIcon>
              <InfoText>Pune,India</InfoText>
            </InfoItem>
          </InfoList>
          
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
              href="https://instagram.com/_kaus2bh/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -5 }}
            >
              <FaInstagram />
            </SocialLink>
          </SocialLinks>
        </ContactInfo>
      </Content>
    </ContactContainer>
  );
};

export default Contact; 