import { render } from '@testing-library/react-native';
import React from 'react';

import { Moves } from './Moves';
import { Move as MoveType } from '../../../../types/PokemonDetails';

describe('Moves', () => {
  const mockMoves: MoveType[] = [
    { name: 'Tackle', type: 'Normal', power: 40, accuracy: 99, levelLearnedAt: 1 },
    { name: 'Thunderbolt', type: 'Electric', power: 90, accuracy: 100, levelLearnedAt: 26 },
  ];

  it('renders nothing when moves data is not provided', () => {
    const { queryByText } = render(<Moves moves={undefined} />);
    expect(queryByText('Tackle')).toBeNull(); // Should render nothing
  });

  it('renders the correct number of MoveCard components when moves are provided', () => {
    const { getAllByText } = render(<Moves moves={mockMoves} />);

    const tackleMoves = getAllByText('Tackle');
    const thunderboltMoves = getAllByText('Thunderbolt');

    expect(tackleMoves.length).toBe(1);
    expect(thunderboltMoves.length).toBe(1);
  });

  it('renders the correct details for each move', () => {
    const { getByText } = render(<Moves moves={mockMoves} />);

    // Check that move details are displayed correctly
    expect(getByText('Tackle')).toBeTruthy();
    expect(getByText('Power: 40')).toBeTruthy();
    expect(getByText('Accuracy: 100%')).toBeTruthy();
    expect(getByText('Level Learned: 1')).toBeTruthy();

    expect(getByText('Thunderbolt')).toBeTruthy();
    expect(getByText('Power: 90')).toBeTruthy();
    expect(getByText('Accuracy: 100%')).toBeTruthy();
    expect(getByText('Level Learned: 26')).toBeTruthy();
  });
});
