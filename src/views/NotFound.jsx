import React, { useContext } from 'react';
import Helmet from 'react-helmet';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

import { LocalesContext } from '../components/Context';

const Container = styled.section`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem;
  box-sizing: border-box;
`;

const H1 = styled.h1`
  color: #15b6cd;
  font-size: 10rem;
  margin: 0;
  line-height: 1;
`;

const H2 = styled.h2`
  color: #15b6cd;
  margin: 0;
  text-align: center;
`;

const P = styled.p`
  text-align: center;
`;

const linkBack = css`
  background: transparent;
  color: #15b6cd;
  padding: 0.5rem 1.5rem;
  margin-top: 1.5rem;
  border: 1px solid #15b6cd;
  border-radius: 25px;
  transition: color 500ms ease-in-out, border-color 500ms ease-in-out;

  &:hover {
    color: white;
    border-color: white;
    text-decoration: none;
  }
`;

const LinkBack = styled(Link)`
  ${linkBack}
`;

const NotFound = props => {
  const LOCALES = useContext(LocalesContext);

  return (
    <Container>
      <Helmet title='Page not found' />
      <H1>404</H1>
      <H2>{LOCALES.NOT_FOUND_TITLE}</H2>
      <P>{LOCALES.NOT_FOUND_TEXT}</P>
      <LinkBack to='/'>{LOCALES.GO_HOME}</LinkBack>
    </Container>
  );
};

export default NotFound;
