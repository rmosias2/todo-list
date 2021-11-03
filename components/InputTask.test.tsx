import React from 'react';
import { screen, render, fireEvent, waitFor } from '@testing-library/react';
import InputTask from './InputTask';
import AppProvider from '../hooks';

beforeEach(() => {
    render(
        <AppProvider>
            <InputTask />
        </AppProvider>
    )
});


test('render inputTask component', () => {
    const inputTask = screen.getByTestId('taskform-todo-app');
    expect(inputTask).toBeInTheDocument();
});

test('add new task on inputTask component', async () => {
    const inputTask = screen.getByTestId('taskinput-todo-app');
    fireEvent.change(inputTask, { target: { value: "teste input value"} });
    
    await waitFor(() => {
        expect(screen.queryByPlaceholderText(/teste input value/i));
      });
});