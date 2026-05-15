import type { NextConfig } from "next";

const SITE = "formulaagencia.com";

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  /** www → apex (SEO + una sola URL canónica). Solo aplica si el Host es www. */
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: `www.${SITE}` }],
        destination: `https://${SITE}/:path*`,
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
