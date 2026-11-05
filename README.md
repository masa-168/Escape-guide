# Escape 公式スキルガイド

## ローカルで開く

`index.html` をブラウザーで開きます。ビルドやパッケージのインストールは不要です。

## 内容を編集する

- `guide-data.js` の `skills` で名前・効果・強化・立ち回りを編集できます。`columns` が性能表の列名、`values` がLv.1からの行です。アクティブの `active()` には基礎再使用時間（秒）と各レベルの性能を渡します。
- `builds` でおすすめ構成を編集できます。`skills` にはカタログの `id` を順に指定します。`summary` に狙い、`tactic` に採用理由や使い方を書きます。初期の3構成は現行仕様に基づく提案例です。
- `tactics` に組み合わせと立ち回りを追加できます。トップの説明は `index.html`、配色・余白は `style.css` です。
- スキル画像は `assets/icons/<id>.png` に置きます。IDを変更するときは、構成と立ち回りの参照、画像ファイル名、既存の詳細URLも確認してください。

## スキル情報の確認元

- 名称と分類は `SkillCatalog.cs`、取得枠とレベル上限は `GameManager.cs` と `RunUpgradeSettings.asset`。
- 効果と強化は各スキルの実装、`RunUpgradeSettings.cs`、`PlayerSkill.cs`、`PlayerAutoShooter.cs`、`PlayerBullet.cs`、敵・ボスの制御コードとウェーブ設定を参照しました。炎弾・氷結弾・雷光弾の基礎値は Stage01〜Stage03 の保存済みシーンで照合しています。
- ヒーリングは戦闘時の実装（即時30％＋5秒間毎秒5％）を採用しました。旧説明の18％と異なります。オオモノ狩りは再取得可能ですが全レベル1.5倍です。移動速度アップは1回のみ取得できます。
- 表は基礎性能です。ボスの被ダメージ制限や無詠唱による短縮は、各アクティブの数値表に加算していません。

## 素材と公開手順

背景は Unity のタイトル画像 `TitleForest.png` のWebP変換です。盾・氷結弾のPNGは既存の `ShieldIcon.png` と `WaterBallSnowflakeIcon.png` を使用し、残る14種は選択画面の `SkillIconProvider.cs` と `SkillCatalog.cs` のパターンと配色を画像化しました。

1. 別のPublicリポジトリのルートに、このフォルダの中身を置きます。`index.html` と隠しファイルの `.nojekyll` も含めます。
2. リポジトリの **Settings → Pages** で **Deploy from a branch** を選び、公開ブランチ（例 `main`）と **/(root)** を選択します。[GitHub Pages公式手順](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)
3. Pagesに表示された公開URLをスマホで開いて確認し、そのURLを会場掲示用QRコードにします。

## 著作権・利用条件

© 2026 Escape 制作チーム. All Rights Reserved.

本サイトに掲載されている文章、画像、イラスト、アイコン、デザイン、プログラム等について、Escape制作チームが保有する権利を留保します。権利者の事前の許可がある場合、または法令により認められる場合を除き、無断転載・複製・再配布・改変・二次利用を禁止します。

本プロジェクトはオープンソースとして利用許諾していません。公開リポジトリをGitHub上で閲覧・フォークするなど、GitHub利用規約により認められる範囲で機能を利用できます。[GitHub利用規約（D.5）](https://docs.github.com/en/site-policy/github-terms/github-terms-of-service#5-license-grant-to-other-users)

サイト上の表記は [著作権・利用条件ページ](terms.html) で確認できます。
