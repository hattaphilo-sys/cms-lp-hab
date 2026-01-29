# 🚀 Project Request: [プロジェクト名を記入]

> **Director's Note:**
> このドキュメントは、Architect Agentに対する「唯一の正解ソース（Single Source of Truth）」です。
> 曖昧な表現は避け、ビジネスゴールと制約条件を明確に記述してください。
> 空欄の箇所は「提案して（Suggest）」と記述しても構いません。

## 1. 🎯 Vision & Business Goal (なぜやるのか)
- **解決したい課題**:
  - [例: 営業チームが顧客データをスプレッドシートで管理しており、共有と更新が非効率]
- **プロジェクトの目的**:
  - [例: 社内業務の効率化、SaaSとして販売しMRR 100万円を目指す、など]
- **成功の定義 (KPI)**:
  - [例: データの検索時間が50%短縮されること]
  - [例: 3ヶ月以内にMVPをリリースし、初期ユーザー10人を獲得すること]

## 2. 👤 Target Users (誰が使うのか)
- **メインユーザー**: [例: 30代の非テック系営業担当者]
- **利用環境**: [例: 主にPCのChromeブラウザ、移動中にスマホでも確認したい]
- **リテラシー**: [例: ITツールに不慣れなので、直感的なUIが必須]

## 3. 📦 Core Features (MVP Scope) (何を作るのか)
**Priority: High (必須機能)**
1. [機能名]: [詳細な挙動。例: Googleアカウントでのログイン機能]
2. [機能名]: [例: 顧客データのCRUD（作成・読み取り・更新・削除）]
3. [機能名]: [例: データをCSVでエクスポートする機能]

**Priority: Low (あれば良い / 後回し)**
- [例: ダークモード対応]
- [例: Slackへの通知機能]

**⛔ Out of Scope (今回はやらないこと)**
- [重要: AIの暴走を防ぐため、作らないものを明記する]
- [例: 決済機能、ネイティブアプリ化、多言語対応]

## 4. 🎨 UI/UX & Vibe (どんな体験か)
- **デザインの雰囲気**: [例: 清潔感のある白基調、信頼感のある青をアクセントに]
- **参考サイト/アプリ**: [URLがあれば貼る]
- **重視する体験**:
  - [例: 画面遷移を極力減らし、1画面で完結させる]
  - [例: 読み込み速度をとにかく最優先にする]

## 5. 🧠 Tech Strategy Decisions (技術戦略)
※ 以下の選択肢から指定するか、「Architectに一任」としてください。

- **Frontend**: Next.js (App Router) + Tailwind CSS + Shadcn/UI
- **Mobile Strategy**:
  - [ ] Webアプリ (PWA) で十分
  - [ ] Capacitorでラップしてアプリストアに出す予定
- **Backend Strategy (どちらかを選択)**:
  - [ ] **Mode A: Convex** (推奨: 開発スピード重視、リアルタイム性、TypeScript完結)
  - [ ] **Mode B: Supabase** (推奨: 既存SQL資産の活用、厳格なRDBが必要な場合)
- **Heavy Logic / Workflow**:
  - [ ] n8n を使用する (複雑な外部連携、AI処理など)
  - [ ] 使用しない / Backend Functionsで実装する

  ### Mobile Application Strategy
> スマホアプリ（iOS/Androidアプリ）としてストア配布する計画はありますか？

- [ ] **Web Only (Responsive Web)**
    - *基本*: ブラウザ（Safari/Chrome）での利用のみ。ストア配布なし。
- [ ] **PWA (Progressive Web App)**
    - *指定*: ホーム画面に追加アイコンを表示させたいが、ストア審査は通さない。
- [ ] **Native Packaging (Capacitor / Expo)**
    - *重要*: 将来的にApple/Googleのストアで配布したい。
    - *影響*: Architectは「Webビューで動く前提」の技術選定（Capacitor等の導入）を行います。

## 6. 🛡️ Quality & Audit Standards (品質・監査基準)
**本プロジェクトでは以下の基準を「完了の定義」とします。**

- [x] **WCAG 2.1 Level AA**: コントラスト比、キーボード操作、Alt属性の遵守。
- [x] **Core Web Vitals**: LCP, CLS, INP を考慮した実装。
- [x] **Director's Audit (納品前チェックリスト)**:
  1. **E2Eテスト**: Playwrightによる主要シナリオの完走証明。
  2. **セキュリティ**: `npm audit` でHighリスクなし。
  3. **エラー監視**: Sentryの導入と通知確認。
  4. **復旧手順**: バックアップとリストア手順のドキュメント化。

## 7. 📝 Constraints & Budget (制約事項)
- **予算/コスト**: [例: 月額固定費を$20以下に抑えたい]
- **納期**: [例: 1週間でMVPを動かしたい]
- **その他**: [例: ソースコードはGitHubのプライベートリポジトリで管理]
