/** @type {import('next').NextConfig} */
const nextConfig = {
  // 输出独立部署包
  output: 'standalone',
  
  // 实验性功能
  experimental: {
    // 服务器组件外部包
    serverComponentsExternalPackages: ['better-sqlite3'],
  },
};

export default nextConfig;
