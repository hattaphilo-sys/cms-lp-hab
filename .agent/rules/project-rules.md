# 🏗️ Project Engineering Rules

## 1. 🛠️ Tech Stack Constraints

| Category      | Technology            | Version / Rule                             |
| :------------ | :-------------------- | :----------------------------------------- |
| **Framework** | Next.js (App Router)  | Latest Stable                              |
| **CMS**       | **Payload CMS v3.0**  | Next.js Integration Mode                   |
| **GenAI**     | Vercel AI SDK         | `npm i ai @ai-sdk/react`                   |
| **Styling**   | Tailwind CSS          | `v3.4+`                                    |
| **Motion**    | Framer Motion         | `AnimatePresence`, `layoutId` for morphing |
| **DB**        | Postgres (via Vercel) | Payload Standard                           |

## 2. 🎨 Design System & Libraries (The "Mysterious Zen")

**Primary Vibe**: Monochrome, Fluid, Kinetic.

**Allowed Libraries (Copy/Paste basis):**

1.  **Aceternity UI**: 主に「Bento Grid」「Backgrounds」に使用。
2.  **Magic UI**: 「Text Effects」「Marquee」に使用。
3.  **Cult UI / ibelick**: 「Buttons」「Inputs」「Micro-interactions」に使用。
4.  **Fancy Components**: 物理演算や粒子の表現が必要な場合に使用。

**Implementation Rule**:

- ライブラリは `npm install` するのではなく、`components/ui` または `components/fancy` 等にソースコードをコピーしてカスタマイズすること（shadcn/ui方式）。
- 過度な装飾でメインコンテンツ（テキスト）が読めなくならないよう注意する。

## 3. 📂 Directory Structure (Payload Integrated)

```
/
├── app/
│   ├── (payload)/      # Payload CMS Admin Routes
│   │   ├── admin/
│   │   └── api/
│   ├── (site)/         # Public Site
│   │   ├── page.tsx
│   │   └── actions.tsx # Server Actions for GenUI
│   └── layout.tsx
├── components/
│   ├── ui/             # Shadcn & Standard UI
│   ├── visual/         # Aceternity/Magic/Cult/Fancy Components
│   └── blocks/         # CMS Block Components
├── collections/        # Payload Schema Definitions
│   ├── Pages.ts
│   ├── Media.ts
│   └── Users.ts
├── lib/
│   └── utils.ts
└── payload.config.ts   # Payload Configuration
```

## 4. 🧠 Generative UI Pattern

**"Spatial Morphing" Protocol**:

1.  **Trigger**: ユーザーのアクション（例: 悩みを選択）。
2.  **State**: `useAIState` / `useUIState` でUIの状態を管理。
3.  **Transition**: ローディング中は「幾何学的なオブジェクト」が回転・変形するアニメーションを表示（ChatのLoading dotsは禁止）。
4.  **Result**: `streamUI` により、サーバーからRSC（React Server Component）がストリーミングされ、画面上のエリアに「実体化」する。

## 5. 🧪 Quality Gates

1.  **Payload Types**: `payload-types.ts` を生成し、Frontendで型安全に使用すること。
2.  **Performance**: `next/image` と `next/dynamic` を活用し、Heavyなアニメーションライブラリのロード分散を行うこと。
