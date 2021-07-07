import React from 'react';
import { shallow, mount } from 'enzyme';
import Landing from '../Landing';

describe('<Landing />', () => {
  it('should render itself', () => {
    const component = mount(<Landing />);
    expect(component).toMatchSnapshot();
  });
});
