# 2025年参院選 政党別得票率可視化アプリ

## 概要
2025年参議院議員選挙の比例代表における政党別得票率を、日本全国の都道府県別にインタラクティブなマップで可視化するWebアプリケーションです。MapLibre GL JSを使用して、各政党の得票率をコロプレス図（色分け地図）として表示し、ユーザーが政党別にレイヤーを切り替えて比較できます。

## 主な機能
- **政党別レイヤー表示**: 自民党、立憲民主党、国民民主党、公明党、れいわ新選組、日本共産党、日本保守党、日本維新の会、社会民主党など各政党の得票率を個別表示
- **インタラクティブな地図操作**: ズーム、パン、クリックによる詳細情報表示
- **都道府県別詳細情報**: 地図をクリックすると、その都道府県の各政党得票率と高齢化率をポップアップ表示
- **直感的な色分け**: 得票率0-5%（白）から40%以上（赤）まで5%刻みのグラデーション表示
- **レスポンシブデザイン**: デスクトップ・モバイル対応

## デモ
[GitHub Pagesで公開中](https://hirofumikanda.github.io/sanin2025-hirei-vote-share/)

## 技術構成

### フロントエンド
- **MapLibre GL JS**: オープンソースの地図ライブラリ
- **Vite**: 高速ビルドツール
- **Vanilla JavaScript**: フレームワークレス構成
- **CSS3**: レスポンシブデザイン

### データ・地図基盤
- **ベクタータイル**: 選挙データを効率的に配信
- **国土地理院タイル**: 地理院地図（白地図）をベースレイヤーとして使用
- **カスタムフォント**: 日本語表示のためのNoto Sans JP

### ホスティング
- **GitHub Pages**: 静的サイトホスティング
- **GitHub Actions**: 自動デプロイメント

## 使い方

### オンラインで利用
https://hirofumikanda.github.io/sanin2025-hirei-vote-share/

### ローカル開発環境での実行

#### 必要な環境
- Node.js (v16以上推奨)
- npm

#### セットアップ手順

1. リポジトリのクローン
```bash
git clone https://github.com/hirofumikanda/sanin2025-hirei-vote-share.git
cd sanin2025-hirei-vote-share
```

2. 依存関係のインストール
```bash
npm install
```

3. 開発サーバーの起動
```bash
npm run dev
```
ブラウザで `http://localhost:5173` にアクセス

4. プロダクションビルド
```bash
npm run build
```

5. GitHub Pagesへのデプロイ
```bash
npm run deploy
```

## プロジェクト構成

```
├── index.html          # メインHTMLファイル（UI構造・凡例）
├── main.js             # 地図ロジック・イベント処理・ポップアップ生成
├── index.css           # 凡例スタイリング
├── vite.config.js      # Viteビルド設定
├── package.json        # 依存関係・スクリプト定義
└── public/
    ├── styles/
    │   └── style.json  # MapLibreスタイル定義（全政党レイヤー設定）
    ├── tiles/
    │   └── pref-vote-share/  # ベクタータイルデータ（zoom/x/y構造）
    └── fonts/
        └── Noto Sans JP Regular/  # 日本語フォント
```

## ライセンス
MIT License
