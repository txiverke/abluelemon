import React from 'react';
import { shallow, mount } from 'enzyme';
import Projects from '../Projects';

/**
 * @todo - Switch to shallow when jest works shallow in React Hooks
 */

describe('<Projects />', () => {
  it('should render itself', () => {
    const component = mount(<Projects />);
    expect(component).toMatchSnapshot();
  });
});
