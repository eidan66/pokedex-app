import { render } from '@testing-library/react-native';
import React from 'react';

import { About } from './About';
import { About as AboutType } from '../../../../types/PokemonDetails';

describe('About', () => {
  const mockAboutData: AboutType = {
    species: 'Seed',
    height: 70, // in decimeters
    weight: 69, // in hectograms
    abilities: [
      { name: 'Overgrow', isHidden: false },
      { name: 'Chlorophyll', isHidden: true },
    ],
    gender: {
      male: 88.1,
      female: 11.9,
    },
    eggGroups: ['Monster', 'Grass'],
    eggCycle: 'Grass Egg Group',
  };

  it('renders nothing when about data is not provided', () => {
    const { queryByText } = render(<About about={undefined} />);

    // Since no data is provided, we expect that nothing is rendered.
    expect(queryByText('Species')).toBeNull(); // Checking for a label that would normally be present.
  });

  it('renders correct data when about data is provided', () => {
    const { getByText } = render(<About about={mockAboutData} />);

    // Check species, height, weight, abilities, gender, egg groups, and egg cycle
    expect(getByText('Seed')).toBeTruthy();
    expect(getByText('7 m')).toBeTruthy(); // 70 decimeters -> 7 meters
    expect(getByText('6.9 kg')).toBeTruthy(); // 69 hectograms -> 6.9 kilograms
    expect(getByText('Chlorophyll (Hidden)')).toBeTruthy();
    expect(getByText('88.1%')).toBeTruthy(); // Male percentage
    expect(getByText('11.9%')).toBeTruthy(); // Female percentage
    expect(getByText('Monster, Grass')).toBeTruthy(); // Egg Groups
    expect(getByText('Grass Egg Group')).toBeTruthy(); // Egg Cycle
  });
});
