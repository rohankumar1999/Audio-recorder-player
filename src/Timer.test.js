import React from 'react';
import { render } from '@testing-library/react';
import {shallow} from 'enzyme';
// import App from './App';
import Timer from './Timer';

describe('Test case for Button Clicks',() =>{
  let wrapper;
  it('Testing Button Click of start',() => {
    wrapper = shallow(<Timer/>);
    wrapper.find('#start').simulate('click');
    wrapper.update();
    expect(wrapper.state('st')).toEqual('recording');
  })
  
})