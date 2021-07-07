import React, { Fragment } from 'react';
import Helmet from 'react-helmet';
import 'lazysizes';

import Header from './components/Header';
import Routes from './Routes';
import SmoothScroll from './utils/smoothScroll';

const App = () => {
  SmoothScroll(document, 90, 12);

  return (
    <Fragment>
      <Helmet
        titleTemplate={'%s | A Blue Lemon Productions'}
        defaultTitle='A Blue Lemon Productions'>
        <link rel='canonical' href='https://abluelemon.com' />
        <meta
          name='description'
          content='We achieve a positive economic and social impact of our events generated for the surrounding areas, while also providing visibility for the surrounding businesses.'
        />
      </Helmet>
      <Header />
      <Routes />
    </Fragment>
  );
};

export default App;
