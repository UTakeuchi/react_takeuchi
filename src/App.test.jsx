import { React } from 'react'

// モックデータを含むSupabaseクライアントのモック
const mockData = [];
jest.mock('./lib/supabaseClient', () => ({
    supabase: {
        from: () => ({
            select: () => ({
                order: () => ({
                    data: mockData,
                    error: null
                })
            }),
            insert: () => {
                const newRecord = { id: mockData.length + 1, title: 'Reactの勉強', time: 2 };
                mockData.push(newRecord);
                return { data: [newRecord], error: null };
            },
            delete: () => {
                if (mockData.length > 0) {
                    mockData.splice(0, 1);
                }
                return { data: null, error: null };
            },
        })
    }
}));

// 各テストの前にモックデータをクリア
beforeEach(() => {
    mockData.length = 0;
});

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { App } from './App';

test('タイトルが表示されていること', () => {
    render(<App />);
    const titleElement = screen.getByText(/学習記録一覧/i);
    expect(titleElement).toBeInTheDocument();
});

test('新たに記録が追加されること', async () => {
    render(<App />);

    const titleInput = screen.getByPlaceholderText('学習内容を入力');
    const timeInput = screen.getByPlaceholderText('学習時間を入力(数値のみ)');
    const registerButton = screen.getByRole('button', { name: /登録/ });

    fireEvent.change(titleInput, { target: { value: 'Reactの勉強' } });
    fireEvent.change(timeInput, { target: { value: '2' } });
    fireEvent.click(registerButton);

    await waitFor(() => {
        const newRecord = screen.getByText('Reactの勉強, 2時間');
        expect(newRecord).toBeInTheDocument();
    }, { timeout: 3000 });
});

test('学習記録が削除されること', async () => {
    render(<App />);

    // データを追加
    const titleInput = screen.getByPlaceholderText('学習内容を入力');
    const timeInput = screen.getByPlaceholderText('学習時間を入力(数値のみ)');
    const registerButton = screen.getByRole('button', { name: /登録/ });

    fireEvent.change(titleInput, { target: { value: 'テスト用データ' } });
    fireEvent.change(timeInput, { target: { value: '1' } });
    fireEvent.click(registerButton);

    // データが追加されるのを待つ
    await waitFor(() => {
        const added = screen.getByText((text) =>
            text.includes('テスト用データ') && text.includes('1時間')
        );
        expect(added).toBeInTheDocument();
    });

    // 削除ボタンを見つけて削除を実行
    const deleteButton = screen.getByRole('button', { name: /削除/ });
    fireEvent.click(deleteButton);

    // 削除されたことを確認
    await waitFor(() => {
        const deleted = screen.queryByText((text) =>
            text.includes('テスト用データ') && text.includes('1時間')
        );
        expect(deleted).not.toBeInTheDocument();
    });
});

test('入力なしで登録を押すとエラーが表示されること', () => {
    const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => { });
    render(<App />);

    const registerButton = screen.getByRole('button', { name: /登録/ });
    fireEvent.click(registerButton);

    expect(alertMock).toHaveBeenCalledWith('内容と時間を入力してください');
    alertMock.mockRestore();
});
