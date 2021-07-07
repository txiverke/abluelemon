import React from 'react';
import styled from 'styled-components';

import { useWindowSize } from './Hooks';

const Container = styled.section`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  margin-top: ${props => props.position + 'px'};
  min-height: ${props => props.position + 'px'};
  padding: 3% 15% 1rem;
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

const Title = styled.h4`
  color: #15b6cd;
  margin-bottom: 0;
  line-height: 1;
`;

const Main = styled.h3`
  margin-top: 0.5rem;
  line-height: 1.4;
`;

const Paragraph = styled.p`
  line-height: 1.6;
`;

const ProjectBody = props => {
  const { title, description } = props;
  const { h: height } = useWindowSize();

  const [main, ...paragraphs] = description;

  return (
    <Container position={height}>
      <Title>{title}</Title>
      <Main>{main}</Main>
      {paragraphs.map((par, i) => (
        <Paragraph key={i}>{par}</Paragraph>
      ))}
    </Container>
  );
};

export default ProjectBody;
