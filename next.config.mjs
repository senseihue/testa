/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  crossOrigin: 'use-credentials',
  images: {
    unoptimized: true,
  },
  rewrites: () => ([
      { source: '/gateway/:path*', destination: process.env.APP_API_URL },
  ])
}

export default nextConfig
