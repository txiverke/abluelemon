import React, { useState, useEffect } from 'react';
import Helmet from 'react-helmet';
import Loadable from 'react-loadable';

import ProjectBody from '../components/Project-body';
import Loader from '../components/Loader';
import Background from '../components/Background';
import { getLastStr } from '../utils/helpers';
import config from '../config';

const { API_URL, fetch_options } = config;

const Footer = Loadable({
  loader: () => import(/* webpackChunkName: 'footer' */ '../components/Footer'),
  loading: Loader,
});

const Project = props => {
  const [data, setData] = useState({});
  const [lazy, setLazy] = useState(false);
  const { pathname } = props.location ? props.location : window.location;

  function fetchData(id) {
    fetch(`${API_URL}projects/${id}`, fetch_options.get)
      .then(res => res.json())
      .then(res => {
        if (res.success) {
          setData(res.data);
        } else {
          setData({});
        }
      })
      .catch(err => setData({}));
  }

  useEffect(() => {
    if (Object.keys(data).length === 0) {
      const id = getLastStr(pathname, '-');
      fetchData(id);
    }
  }, []);

  useEffect(
    () => {
      Footer.preload();
      setLazy(true);
    },
    [lazy],
  );

  if (Object.keys(data).length === 0) return <Loader msg={'Loading project'} />;

  return (
    <section>
      <Helmet
        title={data.title}
        meta={[
          { name: 'description', content: data.description[0] },
          { property: 'og:title', content: data.title },
        ]}
      />
      <Background url={data.images[1]} text={data.title} />
      <ProjectBody />
      {!!lazy && <Footer />}
    </section>
  );
};

export default Project;
