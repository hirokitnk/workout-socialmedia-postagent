# workout-socialmedia-postagent

Zen Running Club の公式サイトと、活動を SNS・サイトに発信するためのツール群。

```
site/                 公式サイト（Astro の静的サイト）
firebase.json         Firebase Hosting の設定（site/dist を配信）
.github/workflows/    main への push で自動デプロイ
```

## サイト

### ローカルで動かす

```sh
cd site
npm install
npm run dev        # http://localhost:4321
npm run build      # 型チェック + 本番ビルド（site/dist）
```

Node.js 22.23.4 以上が必要です。

### よく触るファイル

| やりたいこと | ファイル |
|---|---|
| クラブ名・地域・集合場所・料金・FAQ・SNSリンクを変える | `site/src/config.ts`（`TODO` の箇所を埋める） |
| 開催予定を追加する | `site/src/config.ts` の `upcomingEvents` |
| 活動レポートを書く | `npm run new:report -- "タイトル" --slug english-slug` → `site/src/content/reports/` |
| 独自ドメインに切り替える | `site/src/site-url.mjs` |

- レポートは `draft: true` の間、本番に出ません（`npm run dev` では表示されます）。公開するときは `draft: false` にして push します。
- `description` は検索結果に出る要約です。地域名と練習内容を入れると地域検索で見つかりやすくなります。
- 終わった開催予定は、毎朝の自動ビルドで表示から消えます。

### SEO まわりで自動で入るもの

- `<title>` / meta description / canonical / OGP（`public/og.png`）
- `sitemap-index.xml` と `robots.txt`
- 構造化データ（JSON-LD）: クラブ情報（SportsOrganization）、開催予定（Event）、レポート（BlogPosting）、パンくず

### 初回のデプロイ設定（1回だけ）

1. [Firebase コンソール](https://console.firebase.google.com/) でプロジェクトを作る
   - プロジェクトIDが `zen-running-club` 以外になった場合は `.firebaserc` と `site/src/site-url.mjs` を書き換える
2. ローカルで Firebase CLI からデプロイ用の設定を作る
   ```sh
   npm install -g firebase-tools
   firebase login
   firebase init hosting:github
   ```
   - 「既存の firebase.json を上書きするか」と聞かれたら **No**
   - 自動で作られるワークフローは不要なので削除し、GitHub の Secrets に登録された `FIREBASE_SERVICE_ACCOUNT_<プロジェクトID>` を `FIREBASE_SERVICE_ACCOUNT` という名前で登録し直す
3. main に push すると `.github/workflows/deploy-site.yml` が本番にデプロイします。PR ではプレビューURLが発行されます。

### 独自ドメイン

Firebase コンソール → Hosting → 「カスタムドメインを追加」で DNS を設定し、`site/src/site-url.mjs` を新しいURLに変えて push します。

## 公開後にやること（集客）

- [Google ビジネスプロフィール](https://www.google.com/business/) にクラブを登録し、サイトURLを載せる
- [Google Search Console](https://search.google.com/search-console) にサイトを登録し、`sitemap-index.xml` を送信する
- Strava クラブ・Instagram のプロフィールにサイトURLを載せる
