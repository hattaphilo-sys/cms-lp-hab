---
trigger: manual
---

# 🛡️ Project Quality Standards & Definition of Done

このドキュメントは、本プロジェクトにおける「品質の最低基準」と「完了の定義」を定めた憲法です。
エージェントは、いかなる理由があっても**この基準を下回る成果物を納品してはなりません**。

---

## 1. ♿ Accessibility Standards (WCAG 2.1 Level AA)
**対象: Frontend Agent, Integration Agent**

UIは「誰でも使える」状態でなければなりません。以下の違反はバグとして扱います。

*   **Contrast**: テキストと背景のコントラスト比は **4.5:1** 以上を確保すること。
*   **Keyboard Navigation**: マウスを使わず、`Tab` キーと `Enter/Space` キーだけですべての操作が完了すること。
*   **Focus Indicators**: フォーカス時のリング（アウトライン）を CSS で消してはならない（`outline: none` 禁止）。
*   **Semantic HTML**: ボタンには `<button>` を使い、`div` や `span` に `onClick` をつける「偽ボタン」を禁止する。
*   **Alt Text**: 画像生成や配置の際は、装飾用でない限り具体的な `alt` テキストを付与すること。

---

## 2. ⚡ Performance & Core Web Vitals
**対象: Frontend Agent, Integration Agent**

「動く」だけでなく「快適」でなければなりません。

*   **Layout Stability (CLS)**: 画像には必ず `width` / `height` 属性、またはアスペクト比を指定し、読み込み時のガタつき（レイアウトシフト）をゼロにする。
*   **Interaction to Next Paint (INP)**: ボタンクリック時のフィードバック（ローディング表示など）は即座に行う。重い処理でUIをフリーズさせない。
*   **Lazy Loading**: ファーストビュー（Above the Fold）以外の画像や重いコンポーネントは遅延読み込みさせる。

---

## 3. 🛡️ Security & Data Integrity
**対象: Backend Agent, Integration Agent**

データ漏洩や破損は許されません。

*   **Row Level Security (Supabase)**: RLSポリシーなしでテーブルを作成することを**厳禁**とする。
    *   ❌ `true` (全公開)
    *   ⭕ `auth.uid() == user_id` (所有者のみ)
*   **Validation (Convex/API)**: クライアントからの入力値は「すべて悪意がある」と想定し、Zod等で厳格にバリデーションする。
*   **Secrets**: APIキーや接続文字列をコード内にハードコードしてはならない。必ず `.env` を使用する。

---

## 4. 🧹 Code Quality & Maintenance
**対象: All Agents**

「未来の自分」が読めるコードを書いてください。

*   **No "Any"**: TypeScriptの `any` 型の使用を禁止する。型定義が難しい場合は `unknown` を使い、ナローイングを行うこと。
*   **Comments**: コードの「動作（What）」ではなく「意図（Why）」をコメントに残すこと。
    *   Bad: `// iを1増やす`
    *   Good: `// リトライ回数の上限に達したためインクリメント`
*   **Hardcoding**: 色コード（`#EF4444`）やマジックナンバーを直接書かず、Tailwindのクラスや定数を使用すること。

---

## 5. ✅ Definition of Done (完了の定義)

タスクを「完了」とするには、以下の条件をすべて満たす必要があります。

1.  **Self-Correction**: エージェント自身が一度コードを実行し、エラーが出ないことを確認済みである。
2.  **Standards Met**: 上記のアクセシビリティ、セキュリティ基準をクリアしている。
3.  **Handoff Ready**:
    *   作業が後続のエージェントに続く場合、`docs/handoff/` に引継ぎ資料が作成されている。
    *   ユーザーが介入不要でテストできる状態になっている。

---

## 6. 🚦 Audit Checklist (Integration Agent用)

Integration Agentは納品前に以下のコマンドを実行し、All Greenであることを確認せよ。

- [ ] `npm run lint` (静的解析エラーなし)
- [ ] `npm run type-check` (型エラーなし)
- [ ] `npm audit` (High以上の脆弱性なし)
- [ ] ブラウザでのE2Eシナリオテスト (正常系・異常系)