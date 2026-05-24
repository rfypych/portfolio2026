export default async function handler(req, res) {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: 'URL parameter is required' });
  }

  // Security Check 1: Prevent SSRF (Server-Side Request Forgery)
  // Only allow fetching from Google Drive
  if (!url.startsWith('https://drive.google.com/')) {
    return res.status(403).json({ error: 'Forbidden: Only Google Drive URLs are allowed' });
  }

  try {
    const fetchResponse = await fetch(url);
    
    if (!fetchResponse.ok) {
      return res.status(fetchResponse.status).json({ error: `Failed to fetch from source: ${fetchResponse.statusText}` });
    }

    const arrayBuffer = await fetchResponse.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Set headers
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Cache-Control', 's-maxage=86400');
    // Note: Removed permissive CORS headers (*). Since the frontend calls this API 
    // relatively (/api/fetch-pdf), they are on the same domain. The browser's 
    // Same-Origin Policy will automatically block unauthorized external sites from using this API.
    
    res.status(200).send(buffer);
  } catch (error) {
    console.error('Proxy fetch error:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
}
