import fs from 'fs/promises';
import { load } from 'cheerio';

// Base URL of the website we want to scrape
const BASE_URL = 'https://jumuiyafoundation.org';

// Known paths to explore
const PATHS_TO_SCRAPE = [
  '/',
  '/about-us',
  '/what-we-do',
  '/our-impact',
  '/blog',
  '/contact-us'
];

async function scrapePage(path) {
  const url = `${BASE_URL}${path}`;
  console.log(`Scraping ${url}...`);
  
  try {
    const res = await fetch(url);
    if (!res.ok) {
        console.warn(`Failed to fetch ${url}: ${res.status} ${res.statusText}`);
        return null;
    }

    const html = await res.text();
    const $ = load(html);
    
    // Remove unwanted elements
    $('script, style, noscript, nav, footer, header').remove();
    
    const pageContent = {
        title: $('title').text().trim(),
        headings: [],
        paragraphs: [],
        images: [],
    };
    
    // Extract headings
    $('h1, h2, h3, h4').each((_, el) => {
        const text = $(el).text().replace(/\s+/g, ' ').trim();
        if (text) pageContent.headings.push(text);
    });
    
    // Extract paragraphs
    $('p, span').each((_, el) => {
        const text = $(el).text().replace(/\s+/g, ' ').trim();
        if (text && text.length > 20) { // Only keep substantial text chunks
            pageContent.paragraphs.push(text);
        }
    });

    // Deduplicate paragraphs
    pageContent.paragraphs = [...new Set(pageContent.paragraphs)];
    
    // Extract images
    $('img').each((_, el) => {
        let src = $(el).attr('src');
        const alt = $(el).attr('alt');
        if (src) {
            // make image URLs absolute
            if (src.startsWith('/')) {
                src = `${BASE_URL}${src}`;
            }
            pageContent.images.push({ src, alt: alt || '' });
        }
    });
    
    return pageContent;
  } catch (err) {
    console.error(`Error scraping ${url}:`, err.message);
    return null;
  }
}

async function runScraper() {
  const siteContent = {};
  
  for (const path of PATHS_TO_SCRAPE) {
      const data = await scrapePage(path);
      if (data) {
          siteContent[path] = data;
      }
      // Be polite and add a small delay between requests
      await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  await fs.writeFile('scraped-content.json', JSON.stringify(siteContent, null, 2));
  console.log('✅ Scraping completed! Content saved to scraped-content.json');
}

runScraper();
