import React from 'react';
import { TaskProvider } from './task';

const AppProvider: React.FC = ({ children }) => (
  <TaskProvider>
    {children}
  </TaskProvider>
);

export default AppProvider;