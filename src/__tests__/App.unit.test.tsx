import React from 'react';
import { shallow } from 'enzyme';
import App from '../App';

describe('>>>A P P --- Shallow Render REACT COMPONENTS', () => {
    let wrapper: any;

    beforeEach(()=>{
        wrapper = shallow(<App />)
    })

    it('+++ render App component', () => {
       expect(wrapper.length).toEqual(1)
    });
});