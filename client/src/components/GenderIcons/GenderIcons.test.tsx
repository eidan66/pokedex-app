import { render } from '@testing-library/react-native';
import React from 'react';

import { GenderIcons } from './GenderIcons';

describe('GenderIcons', () => {
  it('renders male and female icons with correct values', () => {
    const { getByText } = render(<GenderIcons maleValue={70} femaleValue={30} />);

    expect(getByText('70%')).toBeTruthy();
    expect(getByText('30%')).toBeTruthy();
  });

  it('matches the snapshot', () => {
    const tree = render(<GenderIcons maleValue={70} femaleValue={30} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
