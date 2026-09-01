import type { RequestHandler } from './$types';

export const prerender = true;

export const GET: RequestHandler = async () => {
    const baseUrl = 'https://deltacv.org';

    // Core static pages
    const staticPages = [
        { url: '/', changefreq: 'monthly', priority: '1.0' },
        { url: '/visiongraph', changefreq: 'monthly', priority: '0.9' },
        { url: '/visionbench', changefreq: 'monthly', priority: '0.9' },
        { url: '/people', changefreq: 'monthly', priority: '0.8' },
        { url: '/blog', changefreq: 'weekly', priority: '0.8' },
    ];

    // Automatically scan author profile directories
    const authorModules = import.meta.glob(
        '/src/routes/**/people/*/author.ts',
        { eager: true }
    );
    const authorPages = Object.keys(authorModules).map((path) => {
        const folder = path.split('/').slice(-2, -1)[0];
        return {
            url: `/people/${folder}`,
            changefreq: 'weekly',
            priority: '0.8',
        };
    });

    // Automatically scan blog posts (.svx files)
    const postModules = import.meta.glob('/src/posts/*.svx', { eager: true });
    const blogPages = Object.keys(postModules).map((path) => {
        const slug = path.split('/').pop()?.replace('.svx', '') || '';
        return {
            url: `/blog/${slug}`,
            changefreq: 'monthly',
            priority: '0.7',
        };
    });

    const allPages = [...staticPages, ...authorPages, ...blogPages];

    const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages
    .map(
        (page) => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
    )
    .join('\n')}
</urlset>`;

    return new Response(sitemapXml, {
        headers: {
            'Content-Type': 'application/xml',
            'Cache-Control': 'max-age=0, s-maxage=3600',
        },
    });
};
