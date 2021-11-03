import React from 'react';
import { screen, render } from '@testing-library/react';
import TaskList from './TaskList';
import AppProvider from '../hooks';
beforeEach(() => {
    render(
        <AppProvider>
            <TaskList />
        </AppProvider>
    )
});

test('render TaskList component', async () => {
    expect(screen.getByTestId('taskfieldlist-todoApp')).toBeInTheDocument();
});