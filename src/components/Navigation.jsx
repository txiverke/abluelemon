import React, { useState } from 'react';
import styled, { css } from 'styled-components';

import { IconMenu } from './Icons';
import NavigationItem from './Navigation-item';

const nav_data = [
  { url: '/', label: 'HOME' },
  { url: '/projects', label: 'PROJECTS' },
  { url: '/contact', label: 'CONTACT' },
];

const Nav = styled.nav`
  display: flex;
  align-items: center;
  margin-right: 2rem;
  z-index: 1001;
`;

const Icon = styled(IconMenu)`
  position: relative;
  display: none;
  z-index: 1001;

  &:hover {
    color: #15b6cd;
  }

  @media only screen and (max-width: 649px) {
    display: block;
  }
`;

const ListMenu = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  @media only screen and (max-width: 649px) {
    position: absolute;
    top: 0;
    left: -100%;
    flex-direction: column;
    background: #262938;
    width: 100%;
    height: 100vh;
    opacity: 0;
    transition: opacity 0.3s ease-in-out;

    ${props =>
      props.show &&
      css`
        left: 0;
        opacity: 0.98;
      `}

    ${props =>
      !props.show &&
      css`
        left: -100%;
        opacity: 0;
      `}
  }
`;

const Navigation = props => {
  const [visible, setVisible] = useState(false);

  const handleVisibility = () => {
    setVisible(!visible);
  };

  const handleClick = () => {
    if (visible) {
      setVisible(false);
    }
  };

  return (
    <Nav>
      <Icon visible={visible} handleIconClick={handleVisibility} {...props} />
      <ListMenu show={visible}>
        {nav_data.map(nav => (
          <NavigationItem
            handleClick={handleClick}
            key={nav.label}
            label={nav.label}
            url={nav.url}
          />
        ))}
      </ListMenu>
    </Nav>
  );
};

export default Navigation;
