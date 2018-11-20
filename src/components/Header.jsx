import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

import Navigation from './Navigation';
import logo from '../assets/image/logo_tiny.png';
import { useScrollPosition } from './Hooks';

const Container = styled.header`
  position: fixed;
  top: 0;
  display: flex;
  align-items: center;
  width: 100%;
  height: 73px;
  z-index: 1000;
`;

const logoLink = css`
  position: relative;
  flex: 1;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  z-index: 1002;
`;

const LogoLink = styled(Link)`
  ${logoLink}
`;

const Logo = styled.img`
  margin-left: 2rem;
  width: 70px;
  height: auto;
`;

const Background = styled.div`
  position: absolute;
  top: -73px;
  left: 0;
  background: #262938;
  width: 100%;
  height: 73px;
  z-index: 999;
  opacity: 0.6;
  transition: top 0.3s ease-in-out, opacity 0.5s ease-in-out;

  ${props => props.animate && css`
    top: 0;
    opacity: .9;
  `}
`;

const Header = () => {
  const [animate, setAnimate] = useState(false)
  const scroll = useScrollPosition();

  useEffect(() => {
    if (!animate && scroll > 350) {
      setAnimate(true)
    } 
    if (animate && scroll < 350) {
      setAnimate(false)
    }
  })

  return (
    <Container>
      <LogoLink to='/'>
        <Logo src={logo} alt='Abluelemon logo' />
      </LogoLink>
      <Navigation />
      <Background animate={animate} />
    </Container>
  );
};

export default Header;
