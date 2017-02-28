import test from 'ava';
import React from 'react';
import {shallow} from 'enzyme';

import Link from '../src/components/Link.js';

test('it renders an anchor tag', (t) => {
  const wrapper = shallow(<Link active={false} onClick={()=>{}}>{'hello'}</Link>);
  t.true(wrapper.is('a'));
});

test('renders an active link', (t) => {
  const wrapper = shallow(<Link active={true} onClick={()=>{}}>{'hello'}</Link>);
  t.true(wrapper.is('span'));
});

test('onclick works', (t) => {
  const clickTest = function () {
    t.pass();
  };
  const wrapper = shallow(<Link active={false} onClick={clickTest}>{'hello'}</Link>);
  wrapper.find('a').simulate('click');
});
