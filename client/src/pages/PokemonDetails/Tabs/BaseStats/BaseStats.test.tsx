import { render, waitFor } from '@testing-library/react-native';
import React from 'react';

import { BaseStats } from './BaseStats';
import { BaseStats as BaseStatsType } from '../../../../types/PokemonDetails';

describe('BaseStats', () => {
  const mockBaseStats: BaseStatsType = {
    hp: 45,
    attack: 49,
    defense: 49,
    specialAttack: 65,
    specialDefense: 65,
    speed: 45,
    total: 45 + 49 + 49 + 65 + 65 + 45,
  };

  it('renders nothing when baseStats is not provided', () => {
    const { queryByText } = render(<BaseStats baseStats={undefined} />);

    // Since no data is provided, we expect that nothing is rendered.
    expect(queryByText('HP')).toBeNull();
  });

  it('renders the stat bars when baseStats is provided', () => {
    const { getByTestId } = render(<BaseStats baseStats={mockBaseStats} />);

    // Check if the individual stat names and values are rendered
    expect(getByTestId('stats-HP')).toBeTruthy();
    expect(getByTestId('stats-Attack')).toBeTruthy();
    expect(getByTestId('stats-Defense')).toBeTruthy();
    expect(getByTestId('stats-Sp.Atk')).toBeTruthy();
    expect(getByTestId('stats-Sp.Def')).toBeTruthy();
    expect(getByTestId('stats-Speed')).toBeTruthy();
  });

  it('calculates and renders the correct total stats', async () => {
    const { getByText } = render(<BaseStats baseStats={mockBaseStats} />);

    const totalStats = 45 + 49 + 49 + 65 + 65 + 45; // Calculate manually

    // Ensure the total stats are rendered correctly
    await waitFor(() => {
      expect(getByText(totalStats.toString())).toBeTruthy();
    });
  });
});
