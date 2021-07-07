import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';

import TitleSection from './Title-section';
import Loader from './Loader';
import Box from './Box';
import { useWindowSize, useScrollPosition } from './Hooks';
import { LocalesContext } from './Context';
import * as API from '../utils/API';

const Container = styled.section`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: ${props => props.position + 'px'};
  min-height: ${props => props.position + 'px'};
  padding: 3% 10% 1rem;
  box-sizing: border-box;
  background: #262938;
  z-index: 1;
  opacity: 0.99;

  @media only screen and (min-width: 768px) and (max-width: 1224px) {
    padding: 5%;
  }

  @media only screen and (max-width: 768px) {
    flex-direction: column;
    padding: 1.5rem;
  }
`;

const Boxes = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 4rem 0 5rem;

  @media only screen and (min-width: 768px) and (max-width: 1224px) {
    flex-wrap: wrap;
    justify-content: flex-start;
  }

  @media only screen and (max-width: 768px) {
    flex-direction: column;
    margin-bottom: 1rem;
  }
`;

const AboutSection = () => {
  const [data, setData] = useState([]);
  const [render, setRender] = useState(false);
  const LOCALES = useContext(LocalesContext);
  const { h: height } = useWindowSize();
  const scroll = useScrollPosition();

  function fetchData() {
    const promise = API.get('users');
    promise
      .then(res => {
        if (res.success) {
          const sliced = res.data.splice(res.data.findIndex(user => user.name === 'Hassan Mokdad'), 1)
          setData(res.data);
        } else {
          setData([]);
        }
      })
      .catch(err => {
        setData([]);
        console.log(err);
      });
  }

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(
    () => {
      if (scroll > height / 4) {
        setRender(true);
      }

      if (scroll < height / 4) {
        setRender(false);
      }
    },
    [scroll],
  );

  if (data && !data.length) return <Loader />;

  return (
    <Container id='aboutContent' position={height}>
      <TitleSection
        title={LOCALES.ABOUT_TITLE}
        text={LOCALES.ABOUT_TEXT}
        show={render}
      />

      <Boxes>
        {data
          .sort((a, b) => (a._id > b._id ? -1 : 1))
          .map((a, i) => (
            <Box order={i + 1} key={a._id} {...a} />
          ))}
      </Boxes>
    </Container>
  );
};

export default AboutSection;
