---
description: 「納品直前に、バグ・セキュリティ・アクセシビリティを総点検したいとき」
---

# 🕵️ Quality Audit Workflow
プロジェクトの品質基準（Quality Standards）に基づき、現在のコードベースを厳格に監査します。

## Steps
1.  **Check Rules**: `.agent/rules/quality-standards.md` を読み込む。
2.  **Static Analysis**:
    *   `npm run lint` を実行。
    *   Type Check を実行。
    *   ハードコードされた秘密情報（API Key等）がないか grep 検索。
3.  **Verify UI**: (Frontend実装がある場合)
    *   主要なコンポーネントが WCAG 2.1 AA (コントラスト比、Aria Label) に準拠しているか確認。
    *   モバイルレスポンシブ対応に明らかな欠落がないかコードベースで確認。
4.  **Report**: `docs/QUALITY_REPORT.md` に結果を出力し、修正が必要な箇所をリストアップする。