import React from 'react';
import { shallow, mount } from 'enzyme';
import Contact from '../Contact';

xdescribe('<Contact />', () => {
  it('should render itself', () => {
    const component = mount(<Contact />);
    expect(component).toMatchSnapshot();
  });
});
