import React from 'react';
import { screen, waitFor, fireEvent, render } from '@testing-library/react';
import ToggleTheme from './ToggleTheme';

beforeEach(() => {
    render(<ToggleTheme />)
});

test('render app in light mode', () => {
      expect(screen.getByRole('button', {
        name: /switch to dark mode/i
      })).toBeInTheDocument();
});

test('render toggle in dark mode', async () => {
    const buttonToggleTheme = await screen.getByRole('button', {
        name: /switch to dark mode/i
    })

    fireEvent.click(buttonToggleTheme);

    await waitFor(() => {
      expect(screen.getByRole('button', {
        name: /switch to dark mode/i
      })).toBeInTheDocument();
    });
  });