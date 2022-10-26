import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { Provider } from 'react-redux';
import store from './store';

test('App renders generate button', () => {
  render(
    <Provider store={store}>  
        <App />
    </Provider>
);
  const generateBtn = screen.getByText('GENERATE');
  expect(generateBtn).toBeInTheDocument();
});

test('App renders + button', () => {
  render(
    <Provider store={store}>  
        <App />
    </Provider>
);
  const addBtn = screen.getByText('+');
  expect(addBtn).toBeInTheDocument();
});
