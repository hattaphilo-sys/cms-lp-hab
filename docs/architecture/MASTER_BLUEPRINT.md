# 🗺️ Master Blueprint: Payload CMS + Spatial GenUI

## 🧱 Phase 1: Foundation (Architect & Director Work)

- [ ] **Project Setup**:
  - `npx create-next-app` (App Router).
  - `npx payload init` (Integrating Payload v3).
    *   `npm install ai @ai-sdk/google @ai-sdk/react framer-motion clsx tailwind-merge`
- [ ] **Dependencies**:
  - Install Aceternity/Magic UI required dependencies (`framer-motion`, `three` etc).

## 🎨 Phase 2: Frontend & Visuals (@frontend-agent)

**Mission**: "No Chat" Spatial UI Implementation.

- [ ] **Morphing Container**:
  - RSCストリーミングを受け取り、`AnimatePresence` でスムースに出現させるラッパーコンポーネントの実装。
- [ ] **Visual Components (Copy & Paste work)**:
  - `components/visual/BentoGrid.tsx` (from Aceternity)
  - `components/visual/TextReveal.tsx` (from Magic UI)
  - `components/visual/FluidCursor.tsx` (from Fancy)
- [ ] **Page Implementation**:
  - `app/(site)/page.tsx`:
    - 初期状態: Payloadから取得した静的ブロックを表示。
    - 対話モード: 画面中央に「問い」を表示し、回答に応じてUIを変形(GenUI)させる。

## ⚙️ Phase 3: CMS & Backend (@backend-agent)

**Mission**: Payload CMS Setup.

- [ ] **Payload Config**: `payload.config.ts`, `migrations/`.
- [ ] **Collections**:
  - `collections/Pages.ts` (with Blocks field).
  - `collections/Media.ts`.
- [ ] **Block Definitions**:
  - GenUIで使うコンポーネントとPayloadのBlockを1:1対応させる（AIが選択できるようにするため）。

## � Phase 4: Generative Logic (@integration-agent)

**Mission**: Connect AI to UI.

- [ ] **Server Actions**: `app/(site)/actions.tsx`
  - `streamUI` の実装。
  - Prompt Engineering: "Return a component that emphasizes 'peace of mind' using the BentoGrid component..."

## 🚦 Next Action

1.  **Project Init**: `npx create-next-app -e https://github.com/payloadcms/payload/tree/beta/templates/next-kotlin` (or standard init).
2.  **Environment**: Require Google Gemini API Key & Postgres Database (Vercel Postgres endorsed).
