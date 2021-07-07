import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Loadable from 'react-loadable';

import Loader from './components/Loader.jsx';
import Project from './views/Project';

const Landing = Loadable({
  loader: () => import(/* webpackChunkName: "landing" */ './views/Landing'),
  loading: Loader,
});

const Projects = Loadable({
  loader: () => import(/* webpackChunkName: "projects" */ './views/Projects'),
  loading: Loader,
});

const Contact = Loadable({
  loader: () => import(/* webpackChunkName: "contact" */ './views/Contact'),
  loading: Loader,
});

const NotFound = Loadable({
  loader: () => import(/** webpackChunkName: "not-found" */ './views/NotFound'),
  loading: Loader,
});

const Routes = () => (
  <Switch>
    <Route exact path='/' component={Landing} />
    <Route path='/projects/:slug' component={Project} />
    <Route path='/projects' component={Projects} />
    <Route path='/contact' component={Contact} />
    <Route component={NotFound} />
  </Switch>
);

export default Routes;
