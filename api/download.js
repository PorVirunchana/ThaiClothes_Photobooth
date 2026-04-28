// Vercel API route for downloading photo
// Accepts base64 image data and returns as downloadable file

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { imageData } = req.body;
    
    if (!imageData) {
      return res.status(400).json({ error: 'No image data provided' });
    }

    // Remove data URL prefix if present
    const base64Data = imageData.replace(/^data:image\/\w+;base64,/, '');
    
    // Set headers for file download
    res.setHeader('Content-Type', 'image/jpeg');
    res.setHeader('Content-Disposition', 'attachment; filename="thai-photobooth.jpg"');
    
    // Send the binary data
    const buffer = Buffer.from(base64Data, 'base64');
    res.send(buffer);
    
  } catch (error) {
    console.error('Download error:', error);
    res.status(500).json({ error: 'Failed to process image' });
  }
}