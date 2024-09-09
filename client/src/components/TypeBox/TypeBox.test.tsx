import { render } from '@testing-library/react-native';
import React from 'react';

import { TypeBox } from './TypeBox';
import { PokemonTypes } from '../../types';

describe('TypeBox component', () => {
  it('renders correctly with given props', () => {
    const { getByText } = render(<TypeBox typeName={PokemonTypes.Grass} />);
    expect(getByText('Grass')).toBeTruthy();
  });
});
