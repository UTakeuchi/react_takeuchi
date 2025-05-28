//自動テスト実行時用のモック
export const supabase = {
    from: () => ({
        select: () => ({ data: [], error: null }),
        insert: () => ({ data: [], error: null }),
        delete: () => ({ data: [], error: null }),
    }),
};