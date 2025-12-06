/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/energy-coach',
  assetPrefix: '/energy-coach/',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
