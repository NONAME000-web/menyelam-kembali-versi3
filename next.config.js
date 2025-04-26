/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {}, // ← kalau kamu pakai "use server"
  },
  serverExternalPackages: ['argon2'], // ← sekarang pindah ke sini
  output: 'standalone', // ← opsional, untuk vercel deployment
};

module.exports = nextConfig;
