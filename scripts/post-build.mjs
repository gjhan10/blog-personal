import { copyFileSync, existsSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { join, relative, sep } from 'node:path';

const SITE_URL = 'https://gjhan10.github.io/blog-personal';
const dir = join('dist', 'blog-personal', 'browser');

const shell = existsSync(join(dir, 'index.csr.html')) ? 'index.csr.html' : 'index.html';
copyFileSync(join(dir, shell), join(dir, '404.html'));
writeFileSync(join(dir, '.nojekyll'), '');

const routes = [];
(function walk(d) {
  for (const name of readdirSync(d)) {
    const p = join(d, name);
    if (statSync(p).isDirectory()) walk(p);
    else if (name === 'index.html') {
      const route = relative(dir, d).split(sep).join('/');
      routes.push(route);
    }
  }
})(dir);
routes.sort();

const today = new Date().toISOString().slice(0, 10);
const urls = routes
  .map((r) => `  <url><loc>${SITE_URL}/${r}</loc><lastmod>${today}</lastmod></url>`)
  .join('\n');
writeFileSync(join(dir, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`);

console.log(`post-build: 404.html <- ${shell}, .nojekyll, sitemap.xml (${routes.length} rutas)`);
