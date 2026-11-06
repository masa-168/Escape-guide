# Escape 公式スキルガイド

## ローカルで開く

`index.html` をブラウザーで開きます。ビルドやパッケージのインストールは不要です。

## 内容を編集する

- `guide-data.js` の `skills` で名前・効果・強化・立ち回りを編集できます。`columns` が性能表の列名、`values` がLv.1からの行です。アクティブの `active()` には基礎再使用時間（秒）と各レベルの性能を渡します。
- `builds` でおすすめ構成を編集できます。`skills` にはカタログの `id` を順に指定します。`summary` に狙い、`tactic` に採用理由や使い方を書きます。初期の3構成は現行仕様に基づく提案例です。
- `tactics` に組み合わせと立ち回りを追加できます。トップの説明は `index.html`、配色・余白は `style.css` です。
- スキル画像は `assets/icons/<id>.png` に置きます。別のスキルと画像を共用する場合は `icon` に画像のIDを指定します。IDを変更するときは、構成と立ち回りの参照、画像ファイル名、既存の詳細URLも確認してください。

## スキル情報の確認元

- 名称と分類は `SkillCatalog.cs`、取得枠とレベル上限は `GameManager.cs` と `RunUpgradeSettings.asset`。
- 効果と強化は各スキルの実装、`RunUpgradeSettings.cs`、`PlayerSkill.cs`、`PlayerAutoShooter.cs`、`PlayerBullet.cs`、敵・ボスの制御コードとウェーブ設定を参照しました。炎弾・氷結弾・雷光弾の基礎値は Stage01〜Stage03 の保存済みシーンで照合しています。
- ダメージは、`EnemyHealth.cs` と `BossHealth.cs` が適用する通常のダメージ補正を含むHP減少量です。三方向射撃の側弾は固定ダメージです。ボスの被ダメージ上限とオオモノ狩りの補正は、攻撃ごとの表に含めていません。
- 再使用時間は無詠唱による短縮を適用する前の値です。回避強化は `PlayerDodge.cs` の基本値と `RunUpgradeSettings.cs` のレベル補正から算出しています。

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
