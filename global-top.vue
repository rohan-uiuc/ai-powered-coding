<template>
  <ThemeSwitcher />
</template>

<script setup>
import ThemeSwitcher from './components/ThemeSwitcher.vue'
import { inject } from '@vercel/analytics';
import { onMounted } from 'vue'

inject();

onMounted(() => {
  try {
    const currentUrl = window.location.href;
    const origin = window.location.origin;

    const title = 'Rohan Marwaha | AI, UIUC, NCSA | Illinois Chat Rohan';
    const description = 'Rohan Marwaha — Research Software Engineer at NCSA (UIUC). Keywords: Rohan UIUC, Rohan AI, Illinois Chat, UIUC Chat, NCSA AI, Rohan GitHub, Rohan LinkedIn, Rohan X/Twitter.';
    const keywords = [
      'rohan',
      'rohan marwaha',
      'rohan uiuc',
      'rohan ncsa',
      'rohan ai',
      'rohan ai uiuc',
      'rohan ai ncsa',
      'rohan uiuc ai',
      'rohan uiuc ncsa',
      'rohan illinois',
      'illinois chat',
      'illinois chat rohan',
      'uiuc chat',
      'ncsa ai',
      'illinois chat rohan',
      'rohan github',
      'rohan linkedin',
      'rohan x',
      'rohan twitter',
      'rohan ai twitter',
      'rohan ai linkedin',
      'rohan uiuc github',
      'rohan uiuc linkedin',
      'rohan uiuc twitter',
      'rohan marwaha uiuc',
      'rohan marwaha ncsa',
      'rohan marwaha ai',
      'rohan marwaha github',
      'rohan marwaha linkedin',
      'rohan marwaha twitter',
      'university of illinois urbana-champaign',
      'ncsa',
      'national center for supercomputing applications',
      'research software engineer',
      'illinois ai',
      'uiuc ai',
      'illinois chatbot',
      'illinois chat rohan',
    ].join(', ');

    function upsertMetaByName(name, content) {
      if (!content) return;
      let tag = document.querySelector(`meta[name="${name}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('name', name);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    }

    function upsertMetaByProperty(property, content) {
      if (!content) return;
      let tag = document.querySelector(`meta[property="${property}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('property', property);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    }

    function upsertLink(rel, href, extra = {}) {
      if (!href) return;
      let link = document.querySelector(`link[rel="${rel}"]`);
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', rel);
        document.head.appendChild(link);
      }
      link.setAttribute('href', href);
      for (const [key, value] of Object.entries(extra)) {
        link.setAttribute(key, value);
      }
    }

    function upsertScriptJsonLd(id, json) {
      let script = document.querySelector(`script[type="application/ld+json"][data-id="${id}"]`);
      if (!script) {
        script = document.createElement('script');
        script.type = 'application/ld+json';
        script.setAttribute('data-id', id);
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(json);
    }

    // Favicons and manifest
    upsertLink('icon', '/favicon.svg', { type: 'image/svg+xml' });
    upsertLink('apple-touch-icon', '/favicon.svg');
    upsertLink('manifest', '/site.webmanifest');
    upsertMetaByName('theme-color', '#0b1220');

    // Canonical
    upsertLink('canonical', currentUrl);

    // Basic SEO
    document.title = title;
    upsertMetaByName('description', description);
    upsertMetaByName('keywords', keywords);
    upsertMetaByName('author', 'Rohan Marwaha');
    upsertMetaByName('robots', 'index, follow');
    upsertMetaByName('googlebot', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');

    // Open Graph
    const ogImage = new URL('/images/preview.png', origin).href;
    upsertMetaByProperty('og:title', title);
    upsertMetaByProperty('og:description', description);
    upsertMetaByProperty('og:type', 'website');
    upsertMetaByProperty('og:url', currentUrl);
    upsertMetaByProperty('og:image', ogImage);
    upsertMetaByProperty('og:site_name', 'Rohan Marwaha');
    upsertMetaByProperty('profile:username', 'rohanmarwaha222');

    // Twitter
    upsertMetaByProperty('twitter:card', 'summary_large_image');
    upsertMetaByProperty('twitter:site', '@rohanmarwaha222');
    upsertMetaByProperty('twitter:title', title);
    upsertMetaByProperty('twitter:description', description);
    upsertMetaByProperty('twitter:image', ogImage);

    // Identity links
    upsertLink('me', 'mailto:rohan13@illinois.edu');
    upsertLink('me', 'https://twitter.com/rohanmarwaha222');
    upsertLink('me', 'https://github.com/rohan-uiuc');
    upsertLink('me', 'https://www.linkedin.com/in/rohanmarwaha');

    // JSON-LD: Person and WebSite
    const personId = `${origin}/#person`;
    const jsonLdGraph = [
      {
        '@context': 'https://schema.org',
        '@type': 'Person',
        '@id': personId,
        name: 'Rohan Marwaha',
        alternateName: 'Rohan',
        jobTitle: 'Research Software Engineer',
        affiliation: {
          '@type': 'Organization',
          name: 'NCSA (National Center for Supercomputing Applications)',
          url: 'https://ncsa.illinois.edu',
        },
        alumniOf: {
          '@type': 'CollegeOrUniversity',
          name: 'University of Illinois Urbana-Champaign',
          url: 'https://illinois.edu',
        },
        url: currentUrl,
        image: new URL('/images/Rohan Marwaha.jpeg', origin).href,
        email: 'mailto:rohan13@illinois.edu',
        sameAs: [
          'https://twitter.com/rohanmarwaha222',
          'https://github.com/rohan-uiuc',
          'https://www.linkedin.com/in/rohanmarwaha'
        ],
        knowsAbout: keywords.split(',').map(s => s.trim()).filter(Boolean),
      },
      {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        url: origin,
        name: title,
        publisher: { '@id': personId },
        inLanguage: 'en',
      },
      {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        url: currentUrl,
        name: title,
        description,
        isPartOf: { '@id': origin },
        inLanguage: 'en',
      }
    ];
    upsertScriptJsonLd('seo-graph', { '@graph': jsonLdGraph });
  } catch (err) {
    // no-op
  }
});
</script>

<style>
@import './styles/theme.css';
</style> 