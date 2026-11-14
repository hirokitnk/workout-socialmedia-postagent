import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/**
 * 活動レポート。src/content/reports/ に Markdown を置くと記事になります。
 * `npm run new:report -- "タイトル"` で下書きを作れます。
 */
const reports = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/reports' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    /** 一覧と検索結果に出る要約。地域名や練習内容を入れると検索に効きます。 */
    description: z.string(),
    location: z.string().optional(),
    distanceKm: z.number().optional(),
    participants: z.number().int().optional(),
    tags: z.array(z.string()).default([]),
    /** true の間は本番に出ません（開発サーバーでは表示されます） */
    draft: z.boolean().default(false),
  }),
});

export const collections = { reports };
