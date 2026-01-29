# 🛡️ Security Auditor Skill

## Audit Checklist
エージェントは、DB操作や認証に関わるコードを触る際、以下のチェックリストを強制的に適用せよ。

### 1. Database (Supabase/PostgreSQL)
*   [ ] **RLS Enabled**: 全てのテーブルで `Row Level Security` が有効化されているか？
*   [ ] **Policies**: `USING` と `WITH CHECK` ポリシーが明示的に定義されているか？ `true` (全許可) は開発環境以外で禁止。

### 2. API & Functions (Convex/Next.js)
*   [ ] **Validation**: ユーザー入力（Arguments）は Zod 等で型検証されているか？
*   [ ] **Authorization**: 処理の先頭で `ctx.auth.getUser()` 等による権限チェックが行われているか？

### 3. Secrets
*   [ ] **No Hardcoding**: コード内に AWS Key, Stripe Key 等が含まれていないか？ 必ず `process.env` を使用せよ。
