// 1. タイトルが表示されていること
import { render, screen } from '@testing-library/react';
import App from './App';

test('タイトルが表示されていること', () => {
    render(<App />);
    const titleElement = screen.getByText(/学習記録/i);
    expect(titleElement).toBeInTheDocument();
});
