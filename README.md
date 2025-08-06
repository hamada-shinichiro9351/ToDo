# 🔥 Todo管理アプリ

やる気がみなぎるTodo管理アプリです。タスクを整理して、生産性を向上させましょう！

## ✨ 機能

### 基本機能
- ✅ **タスクの追加・編集・削除**
- ✅ **完了/未完了の切り替え**
- ✅ **データの永続化** (LocalStorage)

### 高度な機能
- 🎯 **優先度設定** - 高・中・低の3段階
- 📂 **カテゴリ分類** - 仕事、プライベート、買い物、健康、学習、一般
- 📅 **期限設定** - 日付選択と期限切れ警告
- 🔍 **フィルター・ソート** - 条件絞り込みと並び替え
- 📊 **進捗の可視化** - プログレスバーと統計情報
- ⚡ **一括操作** - すべて完了/解除、完了済み削除

### 自動ソート
- 🚀 **期限順がデフォルト** - 期限があるタスクを優先表示
- 📈 **期限の早い順** - 緊急度に応じた自動並び替え

## 🚀 デプロイ方法

### Vercel (推奨)
```bash
# Vercel CLIをインストール
npm install -g vercel

# デプロイ
vercel
```

### Netlify
```bash
# ビルド
npm run build

# distフォルダをNetlifyにアップロード
```

### GitHub Pages
```bash
# package.jsonに以下を追加
"homepage": "https://your-username.github.io/todo-app"

# デプロイ
npm run deploy
```

## 🛠️ 開発環境

```bash
# 依存関係のインストール
npm install

# 開発サーバーの起動
npm start

# ビルド
npm run build
```

## 🎨 技術スタック

- **React** - フロントエンドフレームワーク
- **LocalStorage** - データの永続化
- **CSS3** - モダンなスタイリング
- **レスポンシブデザイン** - モバイル対応

## 📱 対応ブラウザ

- Chrome (推奨)
- Firefox
- Safari
- Edge

## 🔧 カスタマイズ

### 色合いの変更
`src/App.css`の以下の部分を編集：
```css
body {
  background: linear-gradient(135deg, #ff9a9e 0%, #fecfef 50%, #fecfef 100%);
}
```

### カテゴリの追加
`src/components/Todo.js`の`getCategoryIcon`関数を編集

## 📄 ライセンス

MIT License

## 🤝 貢献

プルリクエストやイシューの報告を歓迎します！

---

**やる気がみなぎるTodo管理アプリで、生産性を向上させましょう！** 🚀
