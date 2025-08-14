import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaFileDownload, FaPhone, FaBars, FaTimes, FaEnvelope } from 'react-icons/fa';

const NavContainer = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 70px;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(10px);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
  z-index: 1000;
  border-bottom: 1px solid var(--primary);
`;

const Logo = styled(Link)`
  color: var(--primary);
  font-size: 1.5rem;
  font-weight: bold;
  text-decoration: none;
  font-family: 'Share Tech Mono', monospace;
  text-transform: uppercase;
  letter-spacing: 2px;
  
  &:hover {
    text-shadow: 0 0 10px var(--primary);
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;

  @media (max-width: 768px) {
    position: fixed;
    top: 70px;
    right: ${({ isOpen }) => (isOpen ? '0' : '-100%')};
    flex-direction: column;
    background: rgba(0, 0, 0, 0.95);
    backdrop-filter: blur(10px);
    width: 250px;
    height: calc(100vh - 70px);
    padding: 2rem;
    transition: right 0.3s ease;
    border-left: 1px solid var(--primary);
  }
`;

const NavLink = styled(Link)`
  color: #00ffe5;
  text-decoration: none;
  font-family: 'Share Tech Mono', monospace;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  padding: 0.5rem 1rem;
  transition: all 0.3s ease;
  position: relative;
  
  &:hover {
    color: #fff;
    text-shadow: 0 0 8px rgba(0, 255, 229, 0.8);
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 0;
    height: 2px;
    background: #00ffe5;
    transition: all 0.3s ease;
    transform: translateX(-50%);
  }

  &:hover::after {
    width: 80%;
  }

  @media (max-width: 768px) {
    font-size: 1.2rem;
    width: 100%;
    text-align: center;
    padding: 1rem 0;
    border-bottom: 1px solid rgba(0, 255, 229, 0.1);
  }
`;

const MailLink = styled.a`
  color: #00ffe5;
  text-decoration: none;
  font-family: 'Share Tech Mono', monospace;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  padding: 0.5rem 1rem;
  transition: all 0.3s ease;
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    color: #fff;
    text-shadow: 0 0 8px rgba(0, 255, 229, 0.8);
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 0;
    height: 2px;
    background: #00ffe5;
    transition: all 0.3s ease;
    transform: translateX(-50%);
  }

  &:hover::after {
    width: 80%;
  }
`;

const ActionButton = styled(motion.a)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: ${props => props.primary ? 'var(--primary)' : 'transparent'};
  color: ${props => props.primary ? 'var(--background)' : 'var(--primary)'};
  border: 1px solid var(--primary);
  border-radius: 4px;
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.9rem;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 0 15px rgba(0, 255, 229, 0.3);
    background: ${props => props.primary ? 'var(--primary)' : 'rgba(0, 255, 229, 0.1)'};
  }

  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
    margin: 0.5rem 0;
  }
`;

const HamburgerButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: var(--primary);
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  transition: all 0.3s ease;
  z-index: 1000;

  &:hover {
    color: var(--accent);
  }

  @media (max-width: 768px) {
    display: block;
  }
`;

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <NavContainer>
      <Logo to="/">Cyber Cricket</Logo>
      
      <HamburgerButton onClick={toggleMenu}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </HamburgerButton>

      <NavLinks isOpen={isOpen}>
        <NavLink to="/" onClick={closeMenu}>Home</NavLink>
        <NavLink to="/about" onClick={closeMenu}>Character</NavLink>
        <NavLink to="/projects" onClick={closeMenu}>Projects</NavLink>
        <NavLink to="/contact" onClick={closeMenu}>Join Party</NavLink>
        
        <ActionButton 
          href="/kaustubh-cv.pdf"
          download="Kaustubh_Muley_OK.pdf"
          primary
          onClick={closeMenu}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaFileDownload /> CV
        </ActionButton>
        
        <ActionButton 
          href="tel:+917972903306"
          onClick={closeMenu}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaPhone /> Call
        </ActionButton>

        <MailLink href="mailto:mkaustubh2026@gmail.com" target="_blank" rel="noopener noreferrer">
          <FaEnvelope /> MAIL
        </MailLink>
      </NavLinks>
    </NavContainer>
  );
};

export default Navbar; 