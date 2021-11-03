import React from 'react';
import { screen, render } from '@testing-library/react';
import Header from './Header';


test('render Header component', () => {
    render(<Header />)

    expect(screen.getByTestId('header-todo-app')).toBeInTheDocument();
});