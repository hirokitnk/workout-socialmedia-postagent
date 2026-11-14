#!/usr/bin/env node
/**
 * 活動レポートの下書きを作る。
 *   npm run new:report -- "タイトル" [--date 2026-11-21] [--slug autumn-run]
 * src/content/reports/<日付>-<slug>.md が draft: true で作られます。
 * 公開するときは draft: false に変えて push してください。
 */
import { existsSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseArgs } from 'node:util';

const { values, positionals } = parseArgs({
  allowPositionals: true,
  options: {
    date: { type: 'string' },
    slug: { type: 'string' },
  },
});

const title = positionals.join(' ').trim();
if (!title) {
  console.error('使い方: npm run new:report -- "タイトル" [--date YYYY-MM-DD] [--slug english-slug]');
  process.exit(1);
}

const today = new Intl.DateTimeFormat('sv-SE', { timeZone: 'Asia/Tokyo' }).format(new Date());
const date = values.date ?? today;
if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
  console.error(`--date は YYYY-MM-DD 形式で指定してください: ${date}`);
  process.exit(1);
}

// URLは英数字のほうが共有しやすいので、slug未指定なら日付+連番にする
const base = values.slug
  ? values.slug.toLowerCase().replace(/[^a-z0-9-]+/g, '-').replace(/^-|-$/g, '')
  : 'report';
const dir = join(dirname(fileURLToPath(import.meta.url)), '../src/content/reports');
let name = `${date}-${base}`;
for (let i = 2; existsSync(join(dir, `${name}.md`)); i++) name = `${date}-${base}-${i}`;
const file = join(dir, `${name}.md`);

const body = `---
title: ${JSON.stringify(title)}
date: ${date}
description: ""  # 検索結果に出る要約（地域名・練習内容を入れる）
location: ""
# distanceKm: 10
# participants: 12
tags: []
draft: true
---

## 今日の練習

## 走ったあとに
`;

writeFileSync(file, body);
console.log(`作成しました: ${file}`);
