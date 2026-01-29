---
description: 「実装が進み、コードと設計書のズレを解消したいとき」
---

# 📝 Documentation Sync Workflow
このワークフローは、現在のソースコード（Single Source of Truth）を分析し、設計ドキュメントを現実に即して更新します。

## Steps
1.  **Analyze Code**: 現在の `src/` (Frontend) および `convex/` or `supabase/` (Backend) のコードを読み込む。
2.  **Update Contract**: 実装されたAPIの型定義と `docs/architecture/API_CONTRACT.md` に乖離があれば、ドキュメント側を更新（または実装修正を提案）する。
3.  **Update Handoffs**: `docs/handoff/` 内のファイルが古ければ、最新の仕様に基づいて更新する。
4.  **Generate Graph**: 必要であれば Mermaid 記法を用いてアーキテクチャ図を更新する。