export default function handler(req, res) {
  // Health check endpoint
  res.status(200).json({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  })
}
