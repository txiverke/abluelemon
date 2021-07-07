import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';

import TitleSection from './Title-section';
import ProjectItem from './Project-item';
import Loader from './Loader';
import { useWindowSize } from './Hooks';
import { LocalesContext } from './Context';
import * as API from '../utils/API'

const Container = styled.div`
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

  @media only screen and (min-width: 768px) and (max-width: 1224px) {
    padding: 5%;
    flex-wrap: wrap;
    justify-content: flex-start;
  }

  @media only screen and (max-width: 768px) {
    flex-direction: column;
    padding: 3rem 1rem 1rem;
  }
`;

const Body = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;

  @media only screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

const ProjectList = props => {
  const [data, setData] = useState([]);
  const [render, setRender] = useState(false);
  const LOCALES = useContext(LocalesContext);
  const { h: height } = useWindowSize();

  function fetchData() {
    API.get('projects')
      .then(res => {
        if (res.success) {
          setData(res.data);
        } else {
          setData([]);
        }
      })
      .catch(err => setData([]));
  }

  useEffect(() => {
    if (data && !data.lenght) {
      fetchData();
    }
  }, []);

  useEffect(
    () => {
      setRender(true);
    },
    [data],
  );

  if (data.lenght === 0) return <Loader msg={'Loading projects.'} />;

  return (
    <Container position={height}>
      <TitleSection
        title={LOCALES.PROJECTS_TITLE}
        text={LOCALES.PROJECTS_DESCRIPTION}
        show={render}
      />
      <Body>
        {data
          .sort((a, b) => (a.year > b.year ? -1 : 1))
          .map((d, i) => (
            <ProjectItem key={d._id} order={i + 1} {...d} />
          ))}
      </Body>
    </Container>
  );
};

export default ProjectList;
