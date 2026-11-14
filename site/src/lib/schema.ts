/** Google 検索向けの構造化データ（schema.org / JSON-LD） */
import { club, upcomingEvents } from '../config';

export function organizationLd(site: URL) {
  const sameAs = Object.values(club.social).filter(Boolean);
  return {
    '@context': 'https://schema.org',
    '@type': 'SportsOrganization',
    '@id': new URL('/#organization', site).href,
    name: club.name,
    alternateName: club.nameJa,
    url: site.href,
    logo: new URL('/favicon.svg', site).href,
    description: club.description,
    sport: 'Running',
    areaServed: club.area,
    foundingDate: String(club.foundingYear),
    email: club.email,
    ...(sameAs.length ? { sameAs } : {}),
  };
}

function place() {
  return {
    '@type': 'Place',
    name: club.meetingPoint.name,
    address: club.meetingPoint.address,
  };
}

/** 終了していない開催予定（古い順） */
export function futureEvents(now = new Date()) {
  return upcomingEvents
    .filter((e) => new Date(e.end) > now)
    .sort((a, b) => a.start.localeCompare(b.start));
}

export function eventsLd(site: URL, now = new Date()) {
  return futureEvents(now).map((e) => ({
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: `${e.title}（${club.name}）`,
    description: e.description,
    startDate: e.start,
    endDate: e.end,
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    location: place(),
    organizer: { '@type': 'Organization', name: club.name, url: site.href },
    url: new URL('/join', site).href,
    isAccessibleForFree: true,
  }));
}

export function articleLd(
  site: URL,
  url: URL,
  data: { title: string; description: string; date: Date },
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: data.title,
    description: data.description,
    datePublished: data.date.toISOString(),
    mainEntityOfPage: url.href,
    image: new URL('/og.png', site).href,
    author: { '@type': 'Organization', name: club.name, url: site.href },
    publisher: { '@id': new URL('/#organization', site).href },
  };
}

export function breadcrumbLd(site: URL, items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: new URL(item.path, site).href,
    })),
  };
}
