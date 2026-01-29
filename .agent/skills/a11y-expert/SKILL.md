# ♿ Accessibility (A11y) Expert Skill

## Implementation Rules
UIを作成・修正する際は、以下のルールを厳守せよ。

### 1. Semantic HTML
*   ボタンには `<button>` を使う。`div` や `span` に `onClick` をつける場合は、必ず `role="button"` と `tabIndex="0"`、そして `onKeyDown` ハンドラを追加せよ。
*   見出し (`h1`~`h6`) は見た目のサイズではなく、文書構造の階層に従って選定せよ。

### 2. Forms & Inputs
*   全ての `input` には、視覚的に隠されていたとしても必ず `label` を紐付けるか、`aria-label` を付与せよ。
*   エラーメッセージは `aria-describedby` で入力フィールドと紐付けよ。

### 3. Visual Checks (Code-based)
*   Tailwindの色彩設定において、前景色と背景色のコントラスト比が 4.5:1 未満になる組み合わせを警告せよ。