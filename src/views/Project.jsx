import React, { useState, useEffect } from 'react';
import Helmet from 'react-helmet';
import Loadable from 'react-loadable';
import { Redirect } from 'react-router-dom';

import Loader from '../components/Loader';
import Background from '../components/Background';
import { getLastStr } from '../utils/helpers';
import config from '../config';

import * as API from '../utils/API';

const Footer = Loadable({
  loader: () => import(/* webpackChunkName: 'footer' */ '../components/Footer'),
  loading: Loader,
});

const ProjectBody = Loadable({
  loader: () =>
    import(/* webpackChunkName: 'project-body' */ '../components/Project-body'),
  loading: Loader,
});

const Project = props => {
  const [data, setData] = useState({});
  const [images, setImages] = useState(null);
  const [lazy, setLazy] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const { pathname } = props.location;

  function fetchData(id) {
    API.get(`projects/${id}`).then(res => {
      if (res.success) {
        let [a, ...images] = res.data.images;
        setImages(images);
        setData(res.data);
      } else {
        setData({});
        setRedirect(true);
      }
    });
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
      ProjectBody.preload();
      setLazy(true);
    },
    [lazy],
  );

  if (Object.keys(data).length === 0 && !redirect)
    return <Loader msg={'Loading project'} />;
  if (Object.keys(data).length === 0 && redirect)
    return <Redirect to='/not-found' />;

  return (
    <section>
      <Helmet
        title={data.title}
        meta={[
          { name: 'description', content: data.description[0] },
          { property: 'og:title', content: data.title },
        ]}
      />
      <Background image={images} text={data.title} />
      {!!lazy && <ProjectBody {...data} />}
      {!!lazy && <Footer />}
    </section>
  );
};

export default Project;
