export default async function handler(req, res) {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: 'URL parameter is required' });
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
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Cache-Control', 's-maxage=86400');
    
    res.status(200).send(buffer);
  } catch (error) {
    console.error('Proxy fetch error:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
}
