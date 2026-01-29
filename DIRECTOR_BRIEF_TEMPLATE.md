# 🚀 Project Request: [HeadlessCMS+LP]

> **Director's Note:**
> このドキュメントは、Architect Agentに対する「唯一の正解ソース（Single Source of Truth）」です。

## 1. 🎯 Vision & Business Goal (なぜやるのか)

- **解決したい課題**: ターゲットや流入経路に合わせてコンテンツを動的に変化させ、"刺さる"LPを提供したい。
- **プロジェクトの目的**: コンバージョン率の向上と、パーソナライズによる「自分事化」。
- **成功の定義 (KPI)**: サイト（LP)からの問い合わせが月間3件以上。

## 2. 👤 Target Users (誰が使うのか)

- **メインユーザー**: 現状に生きづらさや名前のない悩みを抱えているすべての人
- **重視する体験**:
  - **視覚的・空間的な没入感**: 既存のチャットUIではなく、サイト全体が有機的に変化する体験。
  - **直感的操作**: リテラシーを問わないインターフェース。

## 3. 📦 Core Features (MVP Scope) (何を作るのか)

**Priority: High (必須機能)**

1. **CMS (Payload CMS v3)**:
   - Next.js App Router統合型。
   - 管理者がテキスト・画像・基本コンポーネントを管理。
2. **Spatial Generative UI**:
   - Vercel AI SDK (RSC) を活用。
   - ユーザー入力や文脈に合わせて、UIコンポーネントが動的（Stream）に生成・配置される。
   - チャット形式ではなく、画面上のオブジェクトが変形（Morph）して最適解が提示される演出。
3. **Rich Visuals**:
   - 3D的/物理演算的な動き (Fancy Components, Cult UI)。
   - 高級感とミステリアスさを演出 (Aceternity UI, Magic UI)。

**⛔ Out of Scope (今回はやらないこと)**

- ユーザー認証（会員登録）
- 決済機能

## 4. 🎨 UI/UX & Vibe (どんな体験か)

- **デザインの雰囲気**: 白黒、禅、ミニマル、高級感、ミステリアス
- **Keywords**: Liquid, Morphing, Kinetic.

## 5. 🧠 Tech Strategy Decisions (技術戦略)

- **Frontend**: Next.js (App Router)
- **CMS**: **Payload CMS v3.0** (with Postgres/Sqlite on Vercel)
  - _理由_: Next.js統合型でデプロイが容易かつ、管理画面が強力。
- **Generative Engine**: **Vercel AI SDK (RSC)**
  - _用途_: `streamUI` を使用し、サーバーサイドでコンポーネントを構築してストリーミングする。
- **UI Logic**:
  - 通常のLPとしてPayloadの静的データを表示しつつ、特定のAction（ボタンクリック等）で「Generative Mode」へ移行。
  - 画面全体がアニメーションし、ユーザー専用のコンテンツに書き換わる。
- **Component Libraries**:
  - **Aceternity UI** (Bento Grid, Effects)
  - **Magic UI** (Clean animations)
  - **Cult UI** (Brutalism/Unique)
  - **Fancy Components** (Physics/3D feel)

## 6. 🛡️ Quality & Audit Standards

- **Core Web Vitals**: アニメーション多用のため、PerformanceスコアよりUX（体感速度）を重視するが、LCPは意識する。
- **Director's Audit**:
  1. **Visual Impact**: 初見で「おっ」と思わせる動きがあるか。
  2. **CMS Usability**: Payload管理画面で運用が回るか。

## 7. 📝 Constraints & Budget

- **納期**: 1週間でMVP
- **リポジトリ**: GitHub Private
