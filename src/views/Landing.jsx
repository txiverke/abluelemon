import React, { Fragment, useState, useEffect } from 'react';
import Loadable from 'react-loadable';

import Loader from '../components/Loader';
import url from '../assets/image/background.jpg';

import Background from '../components/Background';

const AboutSection = Loadable({
  loader: () =>
    import(/* webpackChunkName: 'about-section' */ '../components/About-section'),
  loading: Loader,
});

const Footer = Loadable({
  loader: () => import(/* webpackChunkName: 'footer' */ '../components/Footer'),
  loading: Loader,
});

const Landing = () => {
  const [lazy, setLazy] = useState(false);

  useEffect(
    () => {
      AboutSection.preload();
      Footer.preload();
      setLazy(true);
    },
    [lazy],
  );

  return (
    <Fragment>
      <Background image={url} />
      {!!lazy && <AboutSection />}
      {!!lazy && <Footer />}
    </Fragment>
  );
};

export default Landing;
