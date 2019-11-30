import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

describe('Test App component', () => {
  it('renders without crashing', () => {
    const { container } = render(<App />);

    expect(container).toMatchSnapshot();
  });
});
