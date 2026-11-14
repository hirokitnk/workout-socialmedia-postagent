import { getCollection } from 'astro:content';

/** 公開対象のレポートを新しい順に返す（本番ビルドでは draft を除外） */
export async function getReports() {
  const all = await getCollection('reports', ({ data }) => import.meta.env.DEV || !data.draft);
  return all.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}
