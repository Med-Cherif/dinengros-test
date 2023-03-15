module.exports = {
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  devIndicators: {
    autoPrerender: false,
  },
  env: {
    port: 3000,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "assets.vercel.com",
        port: "",
        pathname: "/image/upload/**",
      },
    ],
    domains: ["dinergros.khotwa-tech.com", "testdinengros.khotwa-tech.com"],
  },

  async redirects() {
    return [
      {
        source: "/backend",
        destination: "https://dinengros.khotwa-tech.com", // Matched parameters can be used in the destination
        permanent: true,
      },
    ];
  },
};
