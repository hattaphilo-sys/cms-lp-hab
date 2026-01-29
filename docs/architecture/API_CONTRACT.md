# 📜 API Contract (v2.0: Payload Edition)

## 1. 🗄️ Payload CMS Collections (`collections/*.ts`)

### Collection: `pages`

LPの各ページデータを管理します。

| Field    | Type     | Description                          |
| :------- | :------- | :----------------------------------- |
| `slug`   | `text`   | URL Path (index, about...)           |
| `layout` | `blocks` | 自由に配置可能なブロックのリスト     |
| `meta`   | `group`  | SEO Meta (Title, Description, Image) |

### Block: `HeroBlock`

| Field        | Type       | Description                   |
| :----------- | :--------- | :---------------------------- |
| `type`       | `select`   | "simple", "glitch", "3d-text" |
| `title`      | `text`     | Main Heading                  |
| `subtitle`   | `textarea` | Sub Heading                   |
| `background` | `upload`   | Background Image/Video        |

### Block: `VisionBlock`

| Field        | Type       | Description                        |
| :----------- | :--------- | :--------------------------------- |
| `content`    | `richText` | Description                        |
| `visualType` | `select`   | "bento", "trace-beam", "particles" |

### Collection: `media`

画像・動画アセットの管理。

## 2. 🤖 AI Actions (Server Actions)

### Action: `generatePersonalizedSection`

- **Path**: `app/(site)/actions.tsx`
- **Input**:
  - `userContext`: `{ worry: string, desire: string }`
- **Output**: `Stream<ReactNode>` (RSC)
- **Description**:
  - Vercel AI SDK `streamUI` を使用。
  - 入力に基づき、最適なメッセージとデザインを持つコンポーネント（例: `VisionBlock` のカスタム版）を生成して返す。
  - AIはPayloadに保存されているライブラリコンポーネントを組み合わせてUIを構築する。

## 3. 🔌 Workflows (n8n) defined in `DIRECTOR_BRIEF`

- **Trigger**: Form Submission (Contact)
- **Action**: Email Notification via Gmail/Resend
- (Integration point: Payload `afterChange` hook or API route)

## 4. 🛡️ Validation

- Playloadの `validate` 関数を使用し、入力必須項目等を保証する。
