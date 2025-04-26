/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {}, // ← kalau kamu pakai "use server"
  },
  serverExternalPackages: ['bcryptjs'], // ← sekarang pindah ke sini
  output: 'standalone', // ← opsional, untuk vercel deployment
};

module.exports = nextConfig;
