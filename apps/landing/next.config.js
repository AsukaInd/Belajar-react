module.exports = {
  reactStrictMode: true,
  async rewrites() {
    const prod = [{
      source: "/app",
      destination: "/app/index.html",
    }]

    const dev = {
      fallback: [
        {
          source: '/:path*',
          destination: `http://localhost:3001/:path*`,
        },
      ],
    }

    return process.env.DEV ? dev : prod
  },
};
