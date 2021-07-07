import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

const Title = styled.h2`
  color: #15b6cd;
  margin: 4.5rem 0 1rem;
  opacity: 0;
  z-index: 1;
  transition: opacity 1000ms cubic-bezier(0.19, 1, 0.22, 1),
    margin-top 800ms cubic-bezier(0.19, 1, 0.22, 1);

  ${props =>
    props.render &&
    css`
      opacity: 1;
      margin-top: 3rem;
    `}
`;

const Text = styled.h3`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  text-align: center;
  opacity: 0;
  transition: opacity 1000ms cubic-bezier(0.19, 1, 0.22, 1),
    margin-top 800ms cubic-bezier(0.19, 1, 0.22, 1);

  &:last-of-type {
    border-bottom: 2px dotted #30354c;
    margin: 0 0 6rem;
    padding-bottom: 4rem;
  }

  ${props =>
    props.render &&
    css`
      opacity: 1;
      margin-top: 0;
    `}

  @media only screen and (max-width: 1024px) {
    width: 100%;

    &:last-of-type {
      border-bottom: 2px dotted #30354c;
      margin: 0 0 5rem;
      padding-bottom: 4rem;
    }
  }
`;

const TitleSection = props => {
  const [render, setRender] = useState(false);
  const { title, text, show } = props;

  const renderText = typeof text === 'string' ? true : false;

  useEffect(
    () => {
      setRender(show);
    },
    [show],
  );

  return (
    <Fragment>
      <Title render={render}>{title}</Title>
      {!!renderText && <Text render={render}>{text}</Text>}
      {!renderText &&
        text.map(t => (
          <Text key={t} render={render}>
            {t}
          </Text>
        ))}
    </Fragment>
  );
};

TitleSection.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
};

export default TitleSection;
