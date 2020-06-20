import React, { Fragment, useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

import { IconArrow } from './Icons';
import { useScrollPosition } from './Hooks';
import Title from './Title';

import '../css/Background.css';

const iconStyling = css`
  position: absolute;
  top: -5rem;
  left: 50%;
  transform: translateX(-50%);
`;

const Icon = styled(IconArrow)`
  ${iconStyling}
`;

const Background = (props) => {
  const { video, text } = props;
  const [render, setRender] = useState(false);
  const [background, setBackground] = useState(
    Array.isArray(video) ? video[0].playVideo() : video,
  );
  const scroll = useScrollPosition();
  const position = Math.floor(scroll / 10);
  let index = 0;

  useEffect(() => {
    setRender(true);
  }, [render]);

  function renderBackground() {
    index = index < video.length - 1 ? index + 1 : 0;
    setBackground(video[index]);
  }

  useEffect(() => {
    renderBackground;
  }, []);

  return (
    <div>
      <div id='fullwidth-video'>
        <div className='fullwidth-video-bg'>
          <video
            playsInline
            autoPlay
            muted
            onPlaying="this.controls = 'false'"
            loop>
            <source
              src={background}
              type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"'
            />
            <source
              src='/assets/videos/my-video.webm'
              type='video/webm; codecs="vp8, vorbis"'
            />
            <source
              src='/assets/videos/my-video.ogv'
              type='video/ogg; codecs="theora, vorbis"'
            />
          </video>
        </div>
      </div>
    </div>
  );
};

Background.propTypes = {
  text: PropTypes.string,
  image: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
};

export default Background;
