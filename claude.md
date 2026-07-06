# claude.md

> このファイルはClaudeへの指示書です。プロジェクトの文脈・ルール・自動化の設定を記述します。
> Claudeはこのファイルを読み込み、一貫したコード生成・自動化を行います。

---

## プロジェクト概要

- **目的**: コードの自動化・生成を効率化する
- **フェーズ**: v0.1（初期構築中）
- **成長方針**: 使いながら育てる。気づいたルールはここに追記する。

---

## Claudeへの基本指示

### コード生成ルール

- コードは常に動作するものを書く（スケルトンや擬似コードは避ける）
- 言語・フレームワークはプロジェクトに明示されたものを使う
- 既存コードを修正するときは差分だけを示す（全体の貼り直しは避ける）
- コメントは日本語で書く

### 自動化の原則

- 繰り返し作業はスクリプト化する
- 手順が3ステップ以上になったらMakefileやシェルスクリプトに落とす
- エラーハンドリングを必ず含める
- 冪等性（何度実行しても同じ結果になること）を意識する

### 応答スタイル

- 説明は簡潔に。コードが主、説明が従
- 実行可能なコマンドは必ずコードブロックに入れる
- 「何をするコードか」を1行コメントで冒頭に書く

### デザインカンプ実装・修正フロー

デザインカンプ通りに実装できなかった箇所は、なぜ実装できなかったのか、徹底的に原因をリサーチし、解明すること。

原因が解明した後に修正を行う。修正については、原因が確認できた段階で承認を得る必要はなく、修正を進めてよい。

**すべての修正項目について、修正後に必ずブラウザで該当箇所を表示し、スクリーンショットを撮って、修正が正しく反映されていることを自分で確認すること。確認して問題があれば、再度修正すること。**

---

## 技術スタック

```yaml
language: HTML / JavaScript
stylesheet: SCSS (Sass)
framework: (未設定)
package_manager: (未設定)
test_runner: (未設定)
```

---

## SCSS コーディング規約

### ファイル先頭

```scss
@use "../global/forward" as*;
```

### 命名規則

BEM 記法を使用する。

| 種別 | 書き方 | 例 |
|------|--------|----|
| ブロック | `.block` | `.header` |
| エレメント | `.block__element` | `.header__logo` |
| モディファイア | `.block--modifier` | （必要時に追加） |
| JS状態管理 | `.block.js-state .block__element` | `.header.js-scroll .header-box` |

### ネスト構造

**`@include` 以外のネストは使用しない。**

```scss
/* NG — 子要素・擬似クラスのネスト */
.header__logo {
    width: rem(225);
    &:hover { opacity: .7; }
    img { width: 100%; }
}

/* OK — フラットに分けて記述 */
.header__logo {
    width: rem(225);
}
.header__logo:hover {
    opacity: .7;
}
.header__logo img {
    width: 100%;
}
```

`@include mq()` はネスト内で使用可。

```scss
/* OK — @include はネストで使用可 */
.header-box {
    padding-inline: rem(40);
    @include mq(sp) {
        padding-inline: 20px;
    }
}
```

### 余白（マージン・パディング）

論理プロパティを使用する。

| 方向 | プロパティ |
|------|-----------|
| 上マージン | `margin-block-start` |
| 下マージン | `margin-block-end` |
| 左右マージン | `margin-inline` |
| 上下パディング | `padding-block` |
| 左右パディング | `padding-inline` |

```scss
/* NG */
margin-top: rem(40);
margin-bottom: rem(20);

/* OK */
margin-block-start: rem(40);
margin-block-end: rem(20);
```

### サイズ指定

`px` の代わりに `rem()` 関数を使用する。

```scss
/* NG */
max-width: 225px;

/* OK */
max-width: rem(225);
```

### レスポンシブ

`@include mq(sp)` を使用する（セレクタ内の `@include` として記述）。

```scss
.header__logo {
    width: rem(225);
    @include mq(sp) {
        width: rem(188);
    }
}
```

### トランジション

ホバーアニメーションは `transition` で指定する。

```scss
.header__logo {
    transition: 0.4s;
}
.header__logo:hover {
    opacity: .7;
}
```

---

## FLOCSSファイル構成（新規制作の基本構造）

新規プロジェクト開始時は、以下のフォルダ・ファイル構成を基本とする。

```
scss/
├── style.scss                    # エントリポイント（@useの集約のみ）
│
├── global/                       # 変数・mixin（CSS未出力）
│   ├── _variables.scss
│   ├── _mixin.scss
│   └── _forward.scss             # @forward 'variables'; @forward 'mixin';
│
├── base/                         # リセット・基底スタイル
│   ├── _destyle.scss
│   └── _base.scss
│
├── layout/                       # l- クラス（骨格レイアウト）
│   └── _layout.scss
│
├── component/                    # c- / 再利用UIパーツ
│   ├── _header.scss
│   ├── _drawer.scss
│   ├── _btn.scss
│   ├── _slider.scss
│   ├── _footer.scss
│   ├── _sub-fv.scss              # サブページ共通FV
│   └── _sub-nav.scss             # サブページ共通ナビ
│
├── project/                      # ページ固有スタイル
│   ├── top/
│   │   ├── _fv.scss
│   │   ├── _about.scss
│   │   ├── _service.scss
│   │   ├── _news.scss
│   │   ├── _contact.scss
│   │   ├── _modal.scss
│   │   ├── _sec.scss
│   │   └── _sp.scss
│   ├── about/
│   │   └── _sub-about.scss
│   ├── service/
│   │   └── _sub-service.scss
│   ├── contact/
│   │   └── _sub-contact.scss
│   └── thanks/
│       └── _sub-thanks.scss
│
└── utility/                      # u- ユーティリティクラス
    ├── _utility.scss
    └── _br.scss                  # .sp-br / .pc-br 改行制御クラス
```

### style.scss レイヤー順序

```scss
// Foundation — Global（CSS未出力）
@use './global/forward';
// Foundation — Base
@use './base/destyle';
@use './base/base';
// Layout
@use './layout/layout';
// Object — Component
@use './component/header';
@use './component/drawer';
@use './component/btn';
@use './component/slider';
@use './component/footer';
@use './component/sub-fv';
@use './component/sub-nav';
// Object — Project（トップ）
@use './project/top/sp';
@use './project/top/fv';
@use './project/top/about';
@use './project/top/service';
@use './project/top/news';
@use './project/top/contact';
@use './project/top/modal';
// Object — Project（サブページ）
@use './project/about/sub-about';
@use './project/service/sub-service';
@use './project/contact/sub-contact';
@use './project/thanks/sub-thanks';
// Utility
@use './utility/utility';
```

### 変数定義（_variables.scss）

```scss
// カラー
$color-primary:        #007FC6;   // メインブルー（CareSend）
$color-gradient-from:  #02D1FF;   // グラデーション開始色
$color-bg-gray:        #F9F9F9;   // 背景グレー
$color-text:           #333333;   // 基本テキスト
$color-white:          #fff;      // 白

// フォント
$font-base:   'Noto Sans JP', sans-serif;
$font-accent: 'Goldman', sans-serif;

// ブレークポイント
$breakpoint-sp:   768px;
$breakpoint-tab:  1024px;
$breakpoint-wide: 1280px;
```

### 変数の使い方ルール

- **各SCSSファイルの先頭**に必ず `@use` を記述する
  - `component/` `layout/` `base/` `utility/` → `@use '../global/forward' as *;`
  - `project/*/` → `@use '../../global/forward' as *;`
- ハードコードを避ける：色は `$color-*`、サイズは `$content-max-width` / `$sidebar-width`、メディアクエリは `@include mq(sp/tab/wide)` を使う
- `768px` / `1024px` / `1280px` に対応しない独自ブレークポイントは `@media screen and (max-width: Xpx)` で直書きする

### リンクのクリック・ホバー領域

ヘッダーロゴなど、**コンテナ全体をクリック・ホバー可能にする場合**は `a` タグに `height: 100%` と `display: flex; align-items: center` を指定する。

```scss
/* NG — a タグが画像サイズ（32px）にしかならず、上端に寄る */
.header__logo a {
    transition: 0.4s;
}

/* OK — コンテナ（ヘッダー高さ）全体がクリック・ホバー領域になる */
.header__logo a {
    display: flex;
    align-items: center;
    height: 100%;
    transition: 0.4s;
}
```

この設定が必要なケース:
- fixed ヘッダー内のロゴリンク
- カード全体をリンクにするとき
- ナビアイテムのクリック領域を広げるとき

---

### レイアウト構造（HTML）

```html
<body>
  <div class="l-side">
    <header class="header">...</header>
  </div>
  <main class="l-main">
    <section>
      <div class="l-inner">...</div>     <!-- max-width コンテナ -->
    </section>
  </main>
  <footer class="footer">...</footer>
  <script src="js/main.js"></script>
</body>
```

---

## 自動化タスク一覧

| タスク | コマンド | ステータス |
|--------|----------|------------|
| （未登録） | — | — |

---

## 成長ログ

### v0.1 — 初期作成
- claude.md を新規作成
- 基本ルールを定義
- 自動化の原則を設定

### v0.2 — SCSS規約追加
- `_header.scss` を参照してSCSSコーディング規約を追記
- ネスト禁止ルール（`@include` 除く）を明記
- 論理プロパティ（`margin-block-start` / `margin-block-end`）を明記

### v0.4 — リンクのクリック領域ルール追加
- ヘッダーロゴ修正を機に、`a` タグの `height: 100%; display: flex; align-items: center;` をコーディング規約として明文化

### v0.3 — FLOCSSファイル構成・変数化
- BEM構成をFLOCSSアーキテクチャに再編（Foundation / Layout / Object / Utility）
- `global/` に変数・mixin・forwardを集約
- 全SCSSファイルに `@use '../global/forward' as *;` を追加し変数を活用
- ハードコードの色・サイズ・ブレークポイントを `$color-*` / `$sidebar-width` / `@include mq()` に置換
- 共通コンポーネント（`_sub-fv.scss` / `_sub-nav.scss`）を新設
- `l-inner` 共通レイアウトクラスを追加（WordPress化対応）

---

## 次に育てること（TODO）

- [x] 技術スタックを埋める
- [ ] 最初の自動化タスクを登録する
- [x] プロジェクト固有のコーディング規約を追加する
- [ ] CI/CD連携の設定を追記する
- [ ] よく使うプロンプトパターンをテンプレート化する

---

*このファイルはプロジェクトとともに育ちます。気づいたことをどんどん追記してください。*
