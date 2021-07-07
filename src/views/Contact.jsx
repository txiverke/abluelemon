import React, { Fragment, useState, useEffect, useContext } from 'react';
import Helmet from 'react-helmet';
import styled, { css } from 'styled-components';

import Footer from '../components/Footer';
import TitleSection from '../components/Title-section';
import { useWindowSize } from '../components/Hooks';
import { LocalesContext } from '../components/Context';
import map from '../assets/image/map.jpg';

const Container = styled.section`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 4% 10% 3rem;
  box-sizing: border-box;
  background: #262938;
  z-index: 1;
  min-height: ${props => props.position + 'px'};
  margin-top: -0.5rem;

  @media only screen and (max-width: 768px) {
    flex-direction: column;
    padding: 3rem 1rem 1rem;
  }
`;

const Figure = styled.figure`
  position: absolute;
  top: 0;
  left: 0;
  margin: 0;
  width: 100%;
  min-height: 100%;
  overflow: hidden;
  z-index: 0;
`;

const Image = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-position: 50% 50%;
  background-size: cover;
  background-repeat: no-repeat;
  opacity: 0;
  transition: opacity 0.3s ease-in-out, top 0.5s ease-out;

  ${props =>
    props.render &&
    css`
      opacity: 1;
    `}
`;

const Body = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  z-index: 1;

  @media only screen and (max-width: 1224px) {
    margin-top: -2rem;
  }
`;

const Address = styled.address`
  width: 100%;
  text-align: center;
  margin: 0 0 5%;

  @media only screen and (max-width: 1224px) {
    &:nth-child(2) {
      margin: 0;
    }
  }
`;

const Title = styled.h4`
  margin-bottom: 0.5rem;
`;

const Contact = () => {
  const [render, setRender] = useState(false);
  const LOCALES = useContext(LocalesContext);
  const { h: height } = useWindowSize();

  useEffect(() => {
    setRender(true);
  }, []);

  return (
    <Fragment>
      <Helmet
        title='Contact'
        meta={[{ name: 'description', content: 'Contact' }]}
      />
      <Container position={height}>
        <Figure>
          <Image render={render} style={{ backgroundImage: `url(${map})` }} />
        </Figure>
        <TitleSection
          title={LOCALES.CONTACT_TITLE}
          text={LOCALES.CONTACT_DESCRIPTION}
          show={render}
        />
        <Body>
          {LOCALES.CONTACTS.map(contact => (
            <Address key={contact.MAIL}>
              <Title>{contact.OFFICE}</Title>
              {contact.CONTACT}
              <br />
              {contact.ADDRESS}
              <br />
              {!!contact.PHONE && contact.PHONE}
              {!!contact.PHONE && <br />}
              E-Mail:&nbsp;
              <a href={`mailto: ${contact.MAIL}`}>{contact.MAIL}</a>
            </Address>
          ))}
        </Body>
      </Container>
      <Footer />
    </Fragment>
  );
};
export default Contact;
