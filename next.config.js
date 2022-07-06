const path = require('path')

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    outputStandalone: true,
    outputFileTracingRoot: path.join(__dirname, '../../')
  },
  reactStrictMode: true
}

module.exports = nextConfig
