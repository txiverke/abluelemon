import React, { Fragment, useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

import { IconArrow } from './Icons';
import { useScrollPosition } from './Hooks';
import Title from '../components/Title';

const Figure = styled.figure`
  position: fixed;
  top: 0;
  left: 0;
  margin: 0;
  width: 100%;
  min-height: 100%;
  overflow: hidden;
`;

const Image = styled.div.attrs({
  style: props => ({
    top: 2 * -props.position + 'px',
  }),
})`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-position: 50% 50%;
  background-size: cover;
  background-repeat: no-repeat;
  opacity: 0;
  transition: opacity 0.5s ease-in-out;

  ${props =>
    props.render &&
    css`
      opacity: 1;
    `}
`;

const iconStyling = css`
  position: absolute;
  top: -5rem;
  left: 50%;
  transform: translateX(-50%);
`;

const Icon = styled(IconArrow)`
  ${iconStyling}
`;

const Background = props => {
  const { image, text } = props;
  const [render, setRender] = useState(false);
  const [background, setBackground] = useState(
    Array.isArray(image) ? image[0] : image,
  );
  const scroll = useScrollPosition();
  const position = Math.floor(scroll / 10);
  let index = 0;

  useEffect(
    () => {
      setRender(true);
    },
    [render],
  );

  function renderBackground() {
    index = index < image.length - 1 ? index + 1 : 0;
    setBackground(image[index]);
  }

  useEffect(() => {
    if (Array.isArray(image)) {
      var interval = setInterval(() => {
        renderBackground();
      }, 10000);
    }
    return () => clearInterval(interval)
  }, []);                                                                   

  return (
    <Fragment>
      <Title text={text} />
      <Figure>
        <Image
          render={render}
          position={position}
          style={{ backgroundImage: `url(${background})` }}
        />
      </Figure>
      <Icon {...props} />
    </Fragment>
  );
};

Background.propTypes = {
  text: PropTypes.string,
  image: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
};

export default Background;
