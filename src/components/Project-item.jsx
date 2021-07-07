import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { getSlug, truncateStr } from '../utils/helpers';
import location_icon from '../assets/image/location.png';

const Container = styled.article.attrs({
  style: props => ({
    transitionDelay: 200 * props.order + 'ms',
  }),
})`
  width: 32%;
  min-height: 600px;
  position: relative;
  background: #2a2e3e;
  padding: 1.5rem;
  margin-bottom: 2%;
  box-sizing: border-box;
  opacity: 0;
  transition: opacity 500ms ease-in-out, margin-top 500ms ease-in-out;

  &:nth-child(3n + 2) {
    margin-left: 2%;
    margin-right: 2%;
  }

  @media only screen and (min-width: 769px) and (max-width: 1224px) {
    width: 48%;
    margin-bottom: 2%;
    padding: 1.5rem;

    &:nth-child(3n + 2) {
      margin-left: 0;
      margin-right: 0;
    }

    &:nth-child(2n + 1) {
      margin-right: 2%;
      margin-left: 0;
    }
  }

  @media only screen and (max-width: 768px) {
    width: 100%;
    margin-bottom: 3rem;
    padding: 1.5rem;
    min-height: 500px;

    &:nth-child(3n + 2) {
      margin-left: 0;
      margin-right: 0;
    }
  }

  ${props =>
    props.render &&
    css`
      opacity: 1;
      margin-top: 0;
    `}
`;

const figure = css`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 300px;
  margin: 0;
  overflow: hidden;
`;

const Label = styled.span`
  position: absolute;
  right: 1rem;
  bottom: -3rem;
  background: transparent;
  color: white;
  font-size: 0.8rem;
  border: 1px solid;
  border-radius: 1rem;
  padding: 0.25rem 0.5rem;
  z-index: 1;
  opacity: 0;
  transition: bottom 1500ms cubic-bezier(0.075, 0.82, 0.165, 1),
    opacity 1500ms cubic-bezier(0.075, 0.82, 0.165, 1);
`;

const Figure = styled(Link)`
  ${figure}
`;

const Image = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(1);
  width: auto;
  height: 150%;
  opacity: 0.5;
  transition: transform 1500ms cubic-bezier(0.075, 0.82, 0.165, 1),
    opacity 1000ms cubic-bezier(0.075, 0.82, 0.165, 1);

  &:hover {
    transform: translate(-50%, -50%) scale(1.5);
    opacity: 1;
  }

  &:hover + ${Label} {
    bottom: 0.9rem;
    opacity: 0.8;
  }
`;

const Title = styled.h2`
  position: relative;
  color: #15b6cd;
  margin-top: 300px;
  margin-bottom: 0.5rem;
`;

const Text = styled.p`
  color: #dddddd;
  margin: 0 0 4rem;
`;

const Footer = styled.footer`
  position: absolute;
  bottom: 1rem;
  width: 92%;
  left: 4%;
  padding-top: 1rem;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  border-top: 1px dotted #1f212b;
`;

const FigureIcon = styled.figure`
  margin: 0;
  padding: 0;
  display: flex;
  flex: 1;
  align-items: center;
`;

const FooterText = styled.em`
  color: #dddddd;
  font-size: 0.9rem;
  margin-left: 0.5rem;
`;

const Time = styled.time`
  position: absolute;
  right: 0;
  font-size: 0.8rem;
  background: transparent;
  color: #15b6cd;
  border: 1px solid;
  padding: 0.25rem 0.5rem;
  border-radius: 25px;
`;

const ProjectItem = props => {
  const [render, setRender] = useState(false);
  const { order, title, images, _id, location, year, description } = props;
  const slug = getSlug(`${title} ${_id}`);

  useEffect(
    () => {
      setRender(true);
    },
    [render],
  );

  return (
    <Container render={render} order={order}>
      <Figure to={`/projects/${slug}`}>
        <Image className='lazyload' data-src={images[0]} alt={title} />
        <Label>View Project</Label>
      </Figure>
      <Title className='tit-box'>{title}</Title>
      <Text>{truncateStr(description[0])}</Text>
      <Footer>
        <FigureIcon>
          <img data-src={location_icon} alt={location} className='lazyload' />
          <FooterText>{location}</FooterText>
        </FigureIcon>
        <Time dateTime='{year}'>{year}</Time>
      </Footer>
    </Container>
  );
};

ProjectItem.propTypes = {
  order: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  images: PropTypes.array.isRequired,
};

export default ProjectItem;
