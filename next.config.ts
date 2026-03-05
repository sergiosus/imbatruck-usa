import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/ru", destination: "/en", permanent: false },
      { source: "/ru/:path*", destination: "/en/:path*", permanent: false },
      { source: "/", destination: "/en", permanent: false },
      { source: "/listings", destination: "/en/listings", permanent: false },
      { source: "/post", destination: "/en/post", permanent: false },
      { source: "/post-listing", destination: "/en/post", permanent: false },
      { source: "/signin", destination: "/en/signin", permanent: false },
      { source: "/signup", destination: "/en/signup", permanent: false },
      { source: "/account", destination: "/en/account", permanent: false },
      { source: "/contact", destination: "/en/contact", permanent: false },
      { source: "/safety", destination: "/en/safety", permanent: false },
      { source: "/listing/:id", destination: "/en/listing/:id", permanent: false },
      { source: "/legal/privacy", destination: "/en/legal/privacy", permanent: false },
      { source: "/legal/terms", destination: "/en/legal/terms", permanent: false },
      { source: "/legal/cookies", destination: "/en/legal/cookies", permanent: false },
      { source: "/legal/dmca", destination: "/en/legal/dmca", permanent: false },
      { source: "/legal/disclaimer", destination: "/en/legal/disclaimer", permanent: false },
      { source: "/privacy", destination: "/en/legal/privacy", permanent: true },
      { source: "/terms", destination: "/en/legal/terms", permanent: true },
      { source: "/cookies", destination: "/en/legal/cookies", permanent: true },
      { source: "/dmca", destination: "/en/legal/dmca", permanent: true },
      { source: "/disclaimer", destination: "/en/legal/disclaimer", permanent: true },
    ];
  },
};

export default nextConfig;
