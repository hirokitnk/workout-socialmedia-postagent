/**
 * クラブ情報はこのファイルにまとめています。
 * 「TODO」と書かれた箇所を実際の内容に書き換えてください。
 * ここを変えると、ページ本文・<title>・構造化データ（Google向け）にまとめて反映されます。
 */

export const club = {
  name: 'Zen Running Club',
  nameJa: 'ゼン ランニング クラブ',
  tagline: '走ることを、ととのえる時間に。',
  /** 検索結果に出る説明文（120字前後が目安）。地域名を入れると地域検索に効きます。 */
  description:
    '〇〇エリアで活動するランニングクラブ。初心者から経験者まで、自分のペースで気持ちよく走ることを大切にしています。体験参加はいつでも歓迎です。', // TODO: 〇〇を地域名に
  /** 活動地域。例: 「東京都 世田谷区」 */
  area: '〇〇', // TODO
  /** 主な集合場所 */
  meetingPoint: {
    name: '〇〇公園 正面入口', // TODO
    address: '〇〇県〇〇市〇〇 1-2-3', // TODO
    mapUrl: 'https://maps.google.com/', // TODO: Googleマップの共有リンク
  },
  email: 'hello@example.com', // TODO
  /** 体験参加フォーム（Googleフォームなど）のURL。空にすると「準備中」表示になります。 */
  joinFormUrl: '', // TODO
  social: {
    instagram: '', // 例: https://www.instagram.com/zenrunningclub/
    strava: '', // 例: https://www.strava.com/clubs/xxxxxx
    x: '',
  },
  foundingYear: 2026,
} as const;

/** 定例練習 */
export const regularSessions = [
  {
    title: 'モーニングラン',
    day: '毎週土曜日',
    time: '7:00 – 8:30',
    place: club.meetingPoint.name,
    distance: '5 – 10 km',
    pace: '6:00 – 7:30 /km（グループ分けあり）',
    note: '走り終えたら軽いストレッチと呼吸の時間を取ります。',
  },
  {
    title: 'ナイトジョグ',
    day: '毎週水曜日',
    time: '19:30 – 20:30',
    place: club.meetingPoint.name,
    distance: '5 km 前後',
    pace: 'おしゃべりできるペース',
    note: '仕事帰りでも参加しやすい、ゆるめの練習です。',
  },
] as const;

/**
 * 直近の開催予定。日付が過ぎたものは自動で表示されなくなります。
 * Googleのイベント検索に載るよう、構造化データ（Event）も自動で出力します。
 */
export const upcomingEvents: {
  title: string;
  /** ISO 8601 形式（例: 2026-11-21T07:00:00+09:00） */
  start: string;
  end: string;
  description: string;
}[] = [
  {
    title: '土曜モーニングラン',
    start: '2026-11-21T07:00:00+09:00',
    end: '2026-11-21T08:30:00+09:00',
    description: '5〜10kmを3つのペースグループに分かれて走ります。初参加の方も歓迎です。',
  },
  {
    title: '水曜ナイトジョグ',
    start: '2026-11-25T19:30:00+09:00',
    end: '2026-11-25T20:30:00+09:00',
    description: 'おしゃべりできるペースで5km前後を走ります。',
  },
  {
    title: '土曜モーニングラン',
    start: '2026-11-28T07:00:00+09:00',
    end: '2026-11-28T08:30:00+09:00',
    description: '5〜10kmを3つのペースグループに分かれて走ります。初参加の方も歓迎です。',
  },
];

export const fees = [
  { label: '体験参加', price: '無料（2回まで）' },
  { label: '月会費', price: '1,000円' },
  { label: 'スポット参加', price: '500円 / 回' },
] as const; // TODO: 実際の料金に

export const faqs = [
  {
    q: '走るのが遅くても大丈夫ですか？',
    a: 'もちろんです。ペースごとにグループを分け、誰も置いていかないように走ります。歩く時間があっても構いません。',
  },
  {
    q: '何を持っていけばいいですか？',
    a: '走りやすい服装とシューズ、飲み物があれば十分です。荷物はスタッフが見ていられる場所に置けます。',
  },
  {
    q: '雨の日はどうなりますか？',
    a: '小雨なら実施します。中止の場合は前日の20時までにInstagramとメールでお知らせします。',
  },
  {
    q: '「Zen」とはどういう意味ですか？',
    a: '記録や順位よりも、呼吸を整え、自分の身体と向き合う時間を大切にしたいという想いからです。走ったあとの静かな時間も含めて、ランニングを楽しみます。',
  },
] as const;

export const nav = [
  { href: '/about', label: '活動案内' },
  { href: '/reports', label: '活動レポート' },
  { href: '/join', label: '体験参加' },
] as const;
