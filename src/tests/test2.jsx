// 2. フォームに学習内容と時間を入力して登録ボタンを押すと新たに記録が追加されている
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('新たに記録が追加されること', () => {
    render(<App />);
    const titleInput = screen.getByPlaceholderText('内容');
    const timeInput = screen.getByPlaceholderText('時間(h)');
    const registerButton = screen.getByText('登録');

    fireEvent.change(titleInput, { target: { value: 'Reactの勉強' } });
    fireEvent.change(timeInput, { target: { value: '2' } });
    fireEvent.click(registerButton);

    const newRecord = screen.getByText(/Reactの勉強 - 2時間/i);
    expect(newRecord).toBeInTheDocument();
});
