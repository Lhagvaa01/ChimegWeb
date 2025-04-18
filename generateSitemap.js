const axios = require('axios');
const fs = require('fs');

// Define the API endpoint and authorization token
const API_URL = 'http://202.131.237.185:3030/get_SiteProduct/0/';
const TOKEN = 'token 218d68b6dfe280a288a396352f7d720a18a00997';

// Base URL of your website
const BASE_URL = 'http://202.131.237.185:3030';

// Fetch product data from the API
async function fetchProducts() {
  try {
    const response = await axios.get(API_URL, {
      headers: {
        Authorization: TOKEN,
      },
    });
    return response.data.dtl; // Assuming 'dtl' contains the array of products
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

// Generate sitemap XML
async function generateSitemap() {
  const products = await fetchProducts();

  // Static URLs
  const urls = [
    { loc: `${BASE_URL}/`, priority: '1.0', changefreq: 'daily' },
    { loc: `${BASE_URL}/about`, priority: '0.8', changefreq: 'monthly' },
    { loc: `${BASE_URL}/contact`, priority: '0.8', changefreq: 'monthly' },
    { loc: `${BASE_URL}/programminfo`, priority: '0.8', changefreq: 'monthly' },
    { loc: `${BASE_URL}/products`, priority: '0.9', changefreq: 'weekly' },
  ];

  // Add product URLs with names to sitemap
  products.forEach((product) => {
    urls.push({
      loc: `${BASE_URL}/product-detail/${product.itemCode}`, // Assuming 'itemCode' is the unique identifier
      priority: '0.7',
      changefreq: 'weekly',
      name: product.name, // Assuming 'itemName' is the product name field
    });
  });

  // Construct XML with product names
  const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${urls
      .map(
        (url) => `
    <url>
      <loc>${url.loc}</loc>
      <changefreq>${url.changefreq}</changefreq>
      <priority>${url.priority}</priority>
    </url>`
      )
      .join('')}
  </urlset>`;

  // Write the XML to a file
  fs.writeFileSync('public/sitemap.xml', sitemapContent, 'utf8');
  fs.writeFileSync('/sitemap.xml', sitemapContent, 'utf8');
  console.log('Sitemap has been generated successfully with product names.');
}

generateSitemap();
